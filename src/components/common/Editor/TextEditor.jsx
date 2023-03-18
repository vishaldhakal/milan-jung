import React, { useState, useEffect } from "react";
import ClassicExtended from "ckeditor5-build-classic-extended";
import { CKEditor } from "@ckeditor/ckeditor5-react";

function TextEditor({ handleEditorText, des }) {
  const [text, setText] = useState("");
  const handleText = (editor) => {
    const data = editor.getData();
    setText(data);
    handleEditorText(data);
  };

  useEffect(() => {
    des ? setText(`${des}`) : setText("");
    // eslint-disable-next-line
  }, [des]);

  return (
    <>
      <div className="w-full">
        <CKEditor
          editor={ClassicExtended}
          data={text}
          config={{
            toolbar: [
              "heading",
              "|",
              "alignment",
              "|",
              "bold",
              "italic",
              "strikethrough",
              "underline",
              "subscript",
              "superscript",
              "|",
              "link",
              "|",
              "bulletedList",
              // "numberedList",
              "todoList",
              "-", // break point
              "fontfamily",
              "fontsize",
              "fontColor",
              "fontBackgroundColor",
              "imageUpload",
              "mediaEmbed",
              "|",
              "code",
              "codeBlock",
              "|",
              "insertTable",
              "|",
              "outdent",
              "indent",
              "|",
              "uploadImage",
              "blockQuote",
              "|",
              "undo",
              "redo",
            ],
            mediaEmbed: {
              previewsInData: true,
            },
            // removePlugins: ["MediaEmbedToolbar"]
          }}
          style={{ width: "100%", zIndex: -1 }}
          onChange={(event, editor) => {
            handleText(editor);
          }}
        />
      </div>
    </>
  );
}

export default React.memo(TextEditor);
