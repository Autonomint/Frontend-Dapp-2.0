import { useState } from "react";

const RadioButtonGroup = () => {
  const [selectedOption, setSelectedOption] = useState("renew");

  return (
    <div className="flex space-x-4">
      {/* Renew Option */}
      <label className="flex items-center cursor-pointer px-4 py-2 border border-gray-500 rounded-lg">
        <input
          type="radio"
          name="option"
          value="renew"
          checked={selectedOption === "renew"}
          onChange={() => setSelectedOption("renew")}
          className="hidden peer"
        />
        <span className="w-6 h-6 inline-block border-4 border-white rounded-full flex justify-center items-center peer-checked:bg-white peer-checked:border-black">
          <span className="block w-3 h-3 bg-black rounded-full peer-checked:bg-black"></span>
        </span>
        <span className="ml-2 text-white text-lg peer-checked:text-black">
          Renew
        </span>
      </label>

      {/* Repay Option */}
      <label className="flex items-center cursor-pointer px-4 py-2 border border-gray-500 rounded-lg">
        <input
          type="radio"
          name="option"
          value="repay"
          checked={selectedOption === "repay"}
          onChange={() => setSelectedOption("repay")}
          className="hidden peer"
        />
        <span className="w-6 h-6 inline-block border-4 border-white rounded-full flex justify-center items-center peer-checked:bg-white peer-checked:border-black">
          <span className="block w-3 h-3 bg-black rounded-full peer-checked:bg-black"></span>
        </span>
        <span className="ml-2 text-white text-lg peer-checked:text-black">
          Repay
        </span>
      </label>
    </div>
  );
};

export default RadioButtonGroup;
