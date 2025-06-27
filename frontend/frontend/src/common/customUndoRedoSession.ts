const UNDO_KEY = "undoStack";
const REDO_KEY = "redoStack";
const LAST_KEY = "lastSavedContent";
let isUndoRedoOperation = false;


const EXPIRATION_KEY = "undoRedoTimestamp"; 
const EXPIRATION_MS = 2 * 60 * 60 * 1000;


const setStack = (key: string, stack: string[]) => {
  sessionStorage.setItem(key, JSON.stringify(stack));
  sessionStorage.setItem(EXPIRATION_KEY, Date.now().toString());
};

const getStack = (key: string): string[] => {
  const timestampStr = sessionStorage.getItem(EXPIRATION_KEY);
  if (timestampStr) {
    const timestamp = parseInt(timestampStr, 10);
    if (Date.now() - timestamp > EXPIRATION_MS) {
      sessionStorage.removeItem(UNDO_KEY);
      sessionStorage.removeItem(REDO_KEY);
      sessionStorage.removeItem(LAST_KEY);
      sessionStorage.removeItem(EXPIRATION_KEY);
      return [];
    }
  }
  return JSON.parse(sessionStorage.getItem(key) || "[]");
};



const getLast = (): string =>
  sessionStorage.getItem(LAST_KEY) || "";

const setLast = (content: string) =>
  sessionStorage.setItem(LAST_KEY, content);

const saveSelection = (editor: any) => editor.selection.getBookmark(2);
const restoreSelection = (editor: any, bookmark: any) =>
  editor.selection.moveToBookmark(bookmark);


export const initUndoRedo = (initialContent: string) => {
  const content = initialContent || "";
  const undoStack = getStack(UNDO_KEY);

  if (undoStack.length === 0 || undoStack[0] !== content) {
    setStack(UNDO_KEY, [content]);
    setStack(REDO_KEY, []);
    setLast(content);
  }
};


let pushTimeout: NodeJS.Timeout | null = null;

export const pushSnapshot = (content: string) => {
  if (isUndoRedoOperation) return;

  if (pushTimeout) clearTimeout(pushTimeout);

  pushTimeout = setTimeout(() => {
    const normalize = (html: string) =>
      html.replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();

    const current = normalize(content);
    const last = normalize(getLast());

   
    if (current !== last && Math.abs(current.length - last.length) > 3) {
      const undoStack = getStack(UNDO_KEY);
      undoStack.push(content);
      if (undoStack.length > 20) undoStack.shift();

      setStack(UNDO_KEY, undoStack);
      setStack(REDO_KEY, []);
      setLast(content);
    } 
  }, 500); 
};

export const customUndo = (editor: any) => {
  const undoStack = getStack(UNDO_KEY);
  const redoStack = getStack(REDO_KEY);

  if (undoStack.length > 1) {
    isUndoRedoOperation = true;
    const bookmark = saveSelection(editor);

    const current = undoStack.pop();
    if (current) redoStack.push(current);

    const previous = undoStack[undoStack.length - 1];
    if (previous) {
      editor.setContent(previous);
      setLast(previous);
      setTimeout(() => restoreSelection(editor, bookmark), 0);
    }

    setStack(UNDO_KEY, undoStack);
    setStack(REDO_KEY, redoStack);

    setTimeout(() => (isUndoRedoOperation = false), 100);
  }
};


export const customRedo = (editor: any) => {
  const undoStack = getStack(UNDO_KEY);
  const redoStack = getStack(REDO_KEY);

  if (redoStack.length > 0) {
    isUndoRedoOperation = true;

    const redoContent = redoStack.pop();
    if (redoContent) {
      undoStack.push(redoContent);
      editor.setContent(redoContent);
      setLast(redoContent);

      setTimeout(() => {
        editor.selection.select(editor.getBody(), true);
        editor.selection.collapse(false);
      }, 0);
    }

    setStack(UNDO_KEY, undoStack);
    setStack(REDO_KEY, redoStack);

    setTimeout(() => (isUndoRedoOperation = false), 100);
  }
};