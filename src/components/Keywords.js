import { useState } from "react";

const subjects = [
  {
    name: "Subject",
  },
  {
    name: "Cute Animal",
  },
  {
    name: "Landscape",
  },
  {
    name: "Portrait",
  },
  {
    name: "Seascape",
  },
  {
    name: "Figure",
  },
  {
    name: "Fruit Bowl",
  },
  {
    name: "Collection",
  },
];

const words = [
  [],
  ["trees", "farm", "sky", "lake", "hills", "clouds"],
  ["face", "smile", "dress", "jewels", "mouth", "family"],
  ["boats", "fish", "beach", "cliffs", "island", "sand"],
  ["man", "woman", "child", "slumped", "arms", "thin"],
  ["apple", "pear", "fresh", "banana", "colorful", "wooden"],
  ["street", "beach", "face", "woman", "colorful", "hills"],
];

const patterns = [
  {
    name: "Textures",
  },
  {
    name: "Matte",
  },
  {
    name: "Glossy",
  },
  {
    name: "Octane Render",
  },
  {
    name: "Metalic",
  },
  {
    name: "Stripes",
  },
  {
    name: "Checkered",
  },
  {
    name: "Dots",
  },
  {
    name: "Zig Zags",
  },
  {
    name: "Curves",
  },
  {
    name: "Speckled",
  },
  {
    name: "Swirls",
  },
  {
    name: "Spiked",
  },
  {
    name: "Soft",
  },
  {
    name: "Angular",
  },
  {
    name: "Smooth",
  },
  {
    name: "Rough",
  },
  {
    name: "Golden Ratio",
  },
];

const Keywords = ({
  setPattern,
  subject,
  setSubject,
  active,
  setActive,
  setKeyword,
  formData,
  setFormData,
}) => {
  const wordGroup =
    words.find((word, index) => subjects[index]?.name === subject) || [];

  const uniqueKeywords = [...new Set([...active, ...wordGroup])];

  const handleSubjectChange = (e) => {
    // setActive([...wordGroup]);
    setSubject(e.target.value);

    console.log(active);
  };

  const handleChecked = (e) => {
    e.preventDefault();

    if (active.includes(e.target.value)) {
      const newActive = active.filter((item) => item !== e.target.value);
      setActive(newActive);
    } else {
      setActive((prevArr) => [...prevArr, e.target.value]);
      setKeyword((prevArr) => [...prevArr, e.target.value]);
    }
  };

  return (
    <>
 
      <div className="subject-dropdown check">
        <select value={subject} onChange={handleSubjectChange}>
          {subjects.map((subject, index) => (
            <option key={index} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
     
      </div>
    {/* {formData.map((item, index) => ( 
   <button>
   {item[0]}
   </button>
    ))} */}
    <div className="check tabs">
    <button>
 {formData.medium}
 </button>
 <button>
 {formData.style}
 </button>
 <button>
 {formData.colour}
 </button>
 <button>
 {formData.artist}
 </button>
 <button>
 {formData.pattern}
 </button>
 <button>
 {formData.subject}
 </button>
 </div>
      <div className="check tabs">
        {uniqueKeywords.slice(0, 6).map((item, index) => (
          <button
            key={index}
            onClick={handleChecked}
            value={item}
            className={`button ${active.includes(item) ? "activeButton" : ""}`}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default Keywords;
