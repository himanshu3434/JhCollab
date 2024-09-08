import React from "react";
type codeEditorType = {
  code: string;
  handleCodeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};
function CodeEditor({ code, handleCodeChange }: codeEditorType) {
  return (
    <div className="flex justify-center">
      <textarea
        value={code}
        onChange={handleCodeChange}
        className="h-[50vh] w-[70vw] bg-gray-900 text-white"
        placeholder="Write  You Code here ....."
      />
    </div>
  );
}

export default CodeEditor;
