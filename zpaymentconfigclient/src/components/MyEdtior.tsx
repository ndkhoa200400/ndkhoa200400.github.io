import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import React, { FC } from "react";

export const MyEditor: FC<{
  state: EditorState;
  setState: React.Dispatch<React.SetStateAction<EditorState>>;
}> = ({ state, setState }) => {
  return (
    <Editor
      toolbarStyle={{}}
      editorClassName="px-3"
      editorState={state}
      editorStyle={{
        height: "6rem",
      }}
      defaultEditorState={state}
      onEditorStateChange={(editorState) => {
        try {
          setState(editorState);
        } catch (error) {
          console.log("WYSIWYG error", error);
        }
      }}
    />
  );
};
