import { useState } from 'react';

const subjects = [
  {
    name: "Subject",
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
    name: "Pattern",
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
];

const Keywords = ({setPattern, subject, setSubject, active, setActive, setKeyword}) => {

  const wordGroup = words.find((word, index) => subjects[index]?.name === subject) || [];

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
        <select  onChange={(e) => setPattern(e.target.value)}>
          {patterns.map((pattern, index) => (
            <option key={index} value={pattern.name}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="title">Keywords</div> */}
      <div className="check tabs">
        {uniqueKeywords.slice(0, 6).map((item, index) => (
          <button
            key={index}
            onClick={handleChecked}
            value={item}
            className={`button ${active.includes(item) ? 'activeButton' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
};

export default Keywords;