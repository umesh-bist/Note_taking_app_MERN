export const editorInitConfig = {
  menubar: false,
  statusbar: false,
  plugins: [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "help",
    "wordcount",
    "emoticons",
    "directionality",
    "pagebreak",
    "nonbreaking",
    "save",
    "codesample",
  ],
  toolbar:
    "undo redo | styleselect | bold italic underline strikethrough | " +
    "alignleft aligncenter alignright alignjustify | " +
    "bullist numlist outdent indent | " +
    "forecolor backcolor emoticons | " +
    "pagebreak nonbreaking | fullscreen help",
  
  height: "100%",
    mobile: {
      plugins: ["autosave", "lists", "autolink"],
      toolbar: "undo redo | bold italic | bullist numlist",
    },
  branding: false,

  content_style: ` 
    html, body, .mce-content-body {
      font-family: Helvetica, Arial, sans-serif;
      font-size: 14px;
      color: black;
      background-color: white;
      margin: 10px;
      border: none !important;
      outline: none !important;
      box-shadow: none !important;
      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    html::-webkit-scrollbar,
    body::-webkit-scrollbar,
    .mce-content-body::-webkit-scrollbar {
      display: none;
    }
     *:focus {
      outline: none !important;
      box-shadow: none !important;
      border: none !important;
    }

    body[contenteditable="true"]:focus,
    [contenteditable="true"]:focus,
    [contenteditable]:focus {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
      -moz-box-shadow: none !important;
    }

    body {
      -webkit-user-select: text;
      -moz-user-select: text;
      -ms-user-select: text;
      user-select: text;
    }

    body#tinymce,
    body[data-id*="tiny-react"],
    body[data-id*="tiny-react"]:focus {
      outline: none !important;
      border: none !important;
      box-shadow: none !important;
      -webkit-appearance: none !important;
      -moz-appearance: none !important;
    }
  `,

};
 
    
   
    
  