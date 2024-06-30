import { useState } from "react";
import { FaCamera } from "react-icons/fa6";

export const BasicSetUp = () => {
    const [links, setLinks] = useState([{ name: "", url: "" }]);
    const [userinfo, setuserInfo] = useState({});

  const handleAddLink = () => {
    setLinks([...links, { name: "", url: "" }]);
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newLinks = [...links];
    newLinks[index][name] = value;
    setLinks(newLinks);
    };

    const handleChamgeuserInfo = (e) => {
        setuserInfo(prevUserInfo => ({
            ...prevUserInfo,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = () => {
        console.log(links);
        console.log(userinfo);
  }

  return (
    <div className="basicsetupcomp py-6 w-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <h1 className="font-bold text-2xl">Setup Your Page</h1>
        <span>Let’s setup bio.link/</span>
      </div>

      <div className="w-2/5 bg-white rounded-xl shadow-xl p-4 my-4">
        <div className="flex px-4">
          <div className="w-1/3 p-2 flex justify-center items-center">
            <div className="border-2 border-gray-400 cursor-pointer p-8 border-dashed rounded-full flex justify-center items-center">
              {/* <input className="" type="file" /> */}
              <FaCamera />
            </div>
          </div>
          <div className="w-2/3 flex flex-col items-center">
            <input
              className="p-2 w-full rounded-md my-2 bg-gray-100"
              type="text"
              placeholder="Your Good Name"
                          name="name"
              onChange={handleChamgeuserInfo}            
            />
            <input
              className="p-2 w-full rounded-md bg-gray-100"
              type="text"
            placeholder="Bio"
            name="bio"
              onChange={handleChamgeuserInfo}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl px-4 my-4">Add Your First Link</h1>
        </div>
        {links.map((link, index) => (
          <div className="link-section flex flex-col px-4" key={index}>
            <input
              className="p-2 rounded-md my-2 border-2 border-gray-100"
              type="text"
              name="name"
              placeholder="Link Name (Ex Instagram)"
              value={link.name}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              className="p-2 rounded-md border-2 border-gray-100"
              type="text"
              name="url"
              placeholder="URL (Ex https://instagram.com/username"
              value={link.url}
              onChange={(e) => handleInputChange(index, e)}
            />
            {links.length-1 != index ? <hr className="mt-2 border-2 border-gray-100 rounded-lg" /> : ''}
          </div>
        ))}
        <div className="px-4 my-4">
          <button className="font-bold" onClick={handleAddLink}>
            Add Another Link +
          </button>
        </div>
        <div className="px-4">
          <div className="button-75 rounded-lg w-full flex items-center">
            <button type="submit" className=" w-full p-4 rounded-md" onClick={handleSubmit}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
