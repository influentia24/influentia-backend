import { useState } from "react";

export const Admin = () => {
  const [logobg, setLogobg] = useState("");
  const [logotextcolor, setLogotextcolor] = useState("");
  const [bgcolor, setBgcolor] = useState("");

  return (
    <div className="w-full flex">
      <div className="w-3/5 overflow-auto">
        {/* Add content here */}
        <div className="text-center">{/* Content goes here */}</div>
      </div>
      <div className="phone-section w-2/5 flex justify-center items-center">
        <div className="border-8 border-black rounded-3xl w-1/2 h-3/4 flex flex-col items-center bg-gray-300">
          <div className="admin-logo p-4 bg-black text-white mt-4">
            <p className="text-3xl font-bold">A</p>
          </div>
          <div>
            <h1 className="font-bold">@username</h1>
          </div>
          <div className="link-section w-3/4 flex flex-col flex-grow items-center my-4">
            <div className="w-full rounded-lg text-center my-2 py-2 border-2 border-black font-bold">
              <a href="">Link - 1</a>
            </div>
            <div className="w-full rounded-lg text-center my-2 py-2 border-2 border-black font-bold">
              <a href="">Link - 2</a>
            </div>
            <div className="w-full rounded-lg text-center my-2 py-2 border-2 border-black font-bold">
              <a href="">Link - 3</a>
            </div>
          </div>

          <div className="mb-2">
            <p>Linkers</p>
          </div>
        </div>
      </div>
    </div>
  );
};
