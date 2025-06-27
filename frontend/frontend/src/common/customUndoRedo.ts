interface Stack {
  undoStack: string[];
  redoStack: string[];
  lastSavedContent: string;
}

const noteStacks: Record<string, Stack> = {};
const pushTimeouts: Record<string, NodeJS.Timeout | null> = {};
let isUndoRedoOperation = false;

const normalize = (html: string) =>
  html
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const saveSelection = (editor: any) => editor.selection.getBookmark(2);
const restoreSelection = (editor: any, bookmark: any) =>
  editor.selection.moveToBookmark(bookmark);

export const initUndoRedo = (noteId: string, initialContent: string) => {
  const content = initialContent || "";

  if (pushTimeouts[noteId]) {
    clearTimeout(pushTimeouts[noteId]!);
    pushTimeouts[noteId] = null;
  }

  if (!noteStacks[noteId]) {
    noteStacks[noteId] = {
      undoStack: [content],
      redoStack: [],
      lastSavedContent: content,
    };
    console.log(`[${noteId}] New stack created`);
  } else {
    const normalized = normalize(content);
    const existingTop = normalize(
      noteStacks[noteId].undoStack[noteStacks[noteId].undoStack.length - 1] ||
        ""
    );

    if (normalized !== existingTop) {
      noteStacks[noteId] = {
        undoStack: [content],
        redoStack: [],
        lastSavedContent: content,
      };
      console.log(`[${noteId}] Stack reset due to content change`);
    } else {
      noteStacks[noteId].lastSavedContent = content;
      console.log(`[${noteId}] Stack maintained, content unchanged`);
    }
  }
};

export const pushSnapshot = (noteId: string, content: string) => {
  if (isUndoRedoOperation) {
    console.log(`[${noteId}] Skipping snapshot - undo/redo operation`);
    return;
  }

  if (pushTimeouts[noteId]) clearTimeout(pushTimeouts[noteId]!);

  pushTimeouts[noteId] = setTimeout(() => {
    const stack = noteStacks[noteId];
    if (!stack) {
      console.log(`[${noteId}] No stack found for snapshot`);
      return;
    }

    const normalizedCurrent = normalize(content);
    const normalizedLast = normalize(stack.lastSavedContent);

    if (normalizedCurrent !== normalizedLast && normalizedCurrent !== "") {
      stack.undoStack.push(content);
      stack.lastSavedContent = content;

      if (stack.undoStack.length > 50) stack.undoStack.shift();

      stack.redoStack = [];

      console.log(
        `[${noteId}] Snapshot pushed (stack size: ${stack.undoStack.length})`
      );
    } else {
      console.log(`[${noteId}] No meaningful change, skip snapshot`);
    }
  }, 1000);
};

export const customUndo = (noteId: string, editor: any) => {
  const stack = noteStacks[noteId];
  if (!stack || stack.undoStack.length <= 1) {
    console.log(`[${noteId}] Cannot undo - insufficient history`);
    return false;
  }

  isUndoRedoOperation = true;
  const bookmark = saveSelection(editor);

  const current = stack.undoStack.pop();
  if (current) stack.redoStack.push(current);

  const previous = stack.undoStack[stack.undoStack.length - 1];
  if (previous !== undefined) {
    editor.setContent(previous);
    stack.lastSavedContent = previous;
    setTimeout(() => restoreSelection(editor, bookmark), 0);
    console.log(`[${noteId}] Undo executed`);
  }

  setTimeout(() => (isUndoRedoOperation = false), 100);
  return true;
};

export const customRedo = (noteId: string, editor: any) => {
  const stack = noteStacks[noteId];
  if (!stack || stack.redoStack.length === 0) {
    console.log(`[${noteId}] Cannot redo - no redo history`);
    return false;
  }

  isUndoRedoOperation = true;

  const redoContent = stack.redoStack.pop();
  if (redoContent) {
    stack.undoStack.push(redoContent);
    editor.setContent(redoContent);
    stack.lastSavedContent = redoContent;

    setTimeout(() => {
      editor.selection.select(editor.getBody(), true);
      editor.selection.collapse(false);
    }, 0);
    console.log(`[${noteId}] Redo executed`);
  }

  setTimeout(() => (isUndoRedoOperation = false), 100);
  return true;
};

export const clearUndoRedo = (noteId: string) => {
  delete noteStacks[noteId];
  if (pushTimeouts[noteId]) {
    clearTimeout(pushTimeouts[noteId]!);
    delete pushTimeouts[noteId];
  }
  console.log(`[${noteId}] Stack cleared`);
};
