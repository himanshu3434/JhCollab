import React from "react";
type outputBoxType = {
  output: string;
};
function OutputBox({ output }: outputBoxType) {
  return (
    <div>
      {output.length > 0 && (
        <textarea
          value={output}
          disabled
          className="h-[30vh] w-[30vw] bg-gray-700 text-white"
        />
      )}
    </div>
  );
}

export default OutputBox;
