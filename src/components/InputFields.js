import React, { useEffect } from "react";

const colours = [
  {
    name: "Colours",
  },
  {
    name: "Turquoise",
  },
  {
    name: "Citrine",
  },
  {
    name: "Ochre",
  },
  {
    name: "Apricot",
  },
  {
    name: "Beige",
  },
  {
    name: "Raw Sienna",
  },
  {
    name: "Fushcia",
  },
  {
    name: "Coral",
  },
  {
    name: "Sepia",
  },
  {
    name: "Amber",
  },
  {
    name: "Scarlet",
  },
  {
    name: "Crimson",
  },
  {
    name: "Vermilion",
  },
  {
    name: "Cadmium",
  },
  {
    name: "Mauve",
  },
  {
    name: "Gold",
  },
  {
    name: "Lime",
  },
  {
    name: "Olive",
  },
  {
    name: "Viridian",
  },
  {
    name: "Cobolt",
  },
  {
    name: "Teal",
  },
  {
    name: "Cerulean",
  },
  {
    name: "Indigo",
  },
];

const artists = [
  {
    name: "Artists",
  },
  {
    name: "Banksy",
  },
  {
    name: "Hasui Kawase",
  },
  {
    name: "Makoto Shinkai",
  },
  {
    name: "Greg Rutkowski",
  },
  {
    name: "Alphonse Mucha",
  },
  {
    name: "Pablo Picasso",
  },
  {
    name: "M.C. Escher",
  },
  {
    name: "Claude Monet",
  },
  {
    name: "Salvadore Dali",
  },
  {
    name: "Vincent Van Gogh",
  },
  {
    name: "Rembrandt",
  },
  {
    name: "Paul Cézanne",
  },
  {
    name: "Gustav Klimt",
  },
  {
    name: "Henry Matisse",
  },
  {
    name: "Jackson Pollock",
  },
  {
    name: "Mark Rothko",
  },
  {
    name: "Brett Whiteley",
  },
];

const styles = [
  {
    name: "Styles",
  },
  {
    name: "Hyper Realistic",
  },
  {
    name: "Cyberpunk",
  },
  {
    name: "Artstation",
  },
  {
    name: "Abstract",
  },
  {
    name: "Fantasy Art",
  },
  {
    name: "Anime",
  },
  {
    name: "Digital Illustration",
  },
  {
    name: "Highly Detaailed",
  },
  {
    name: "Comic Book",
  },
  {
    name: "Lithograph",
  },
  {
    name: "Childrens Book",
  },
  {
    name: "Steampunk",
  },
  {
    name: "Pop Art",
  },
  {
    name: "Street Art",
  },
  {
    name: "Print Art",
  },
  {
    name: "Sketch Art",
  },
  {
    name: "Renaissance",
  },
  {
    name: "Expressionism",
  },
  {
    name: "Surrealism",
  },
  {
    name: "Realism",
  },
  {
    name: "Minimalism",
  },
  {
    name: "Impressionism",
  },
  {
    name: "Cubism",
  },
  {
    name: "Modernism",
  },
];

const mediums = [
  {
    name: "Mediums",
  },
  {
    name: "Graphic Novel",
  },
  {
    name: "Cinematic",
  },
  {
    name: "Watercolor",
  },
  {
    name: "Oil",
  },
  {
    name: "Charcoal",
  },
  {
    name: "Ink",
  },
  {
    name: "Gouche",
  },
  {
    name: "Acrylic",
  },
  {
    name: "Pencil Drawing",
  },
  {
    name: "Pastels",
  },
];

const subjects = [
  {
    name: "Subjects",
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

const words = [
  [],
  ["trees", "farm", "sky", "lake", "hills", "clouds"],
  ["face", "smile", "dress", "jewels", "mouth", "family"],
  ["boats", "fish", "beach", "cliffs", "island", "sand"],
  ["man", "woman", "child", "slumped", "arms", "thin"],
  ["apple", "pear", "fresh", "banana", "colorful", "wooden"],
  ["street", "beach", "face", "woman", "colorful", "hills"],
];

const InputFields = ({
  setTitle,
  setDescription,
  setSubject,
  setMedium,
  setStyle,
  setColour,
  setArtist,
  setPattern,
  setFormData,
  formData,
  style,
  description,
  title,
  active,
  medium,
  subject,
  artist,
  pattern,
  colour,
  setActive,
  setKeyword,
  keyword
}) => {
  // useEffect(() => {

  // }, [formData]);

  const wordGroup =
  words.find((word, index) => subjects[index]?.name === subject) || [];

const uniqueKeywords = [...new Set([ active])];

const handleFormChange = (e) => {
  // setActive([...wordGroup]);
  setActive([...active, e.target.value]);
  setKeyword([...keyword, e.target.value]);

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
    <div>
      <div className="select ">
        <input
          required
          type="text"
          placeholder="NFT Title..."
          onChange={(e) => {
            setTitle(e.target.value);
            setFormData({ ...formData, title: e.target.value });
          }}
        ></input>
        <input
          required
          type="text"
          placeholder="NFT Description..."
          onChange={(e) => {
            setDescription(e.target.value);
            setFormData({ ...formData, description: e.target.value });
          }}
        ></input>
      </div>

      <div className="check">
        {/* <select
          onChange={(e) => {
            setSubject(e.target.value);
            setFormData({ ...formData, subject: e.target.value });
          }}
        >
          {subjects.map((subject, index) => (
            <option value={subject.name} key={index}>
              {subject.name}
            </option>
          ))}
        </select>
        <select
          style={{ width: "" }}
          onChange={(e) => {
            setStyle(e.target.value);
            setFormData({ ...formData, style: e.target.value });
          }}
        >
          {styles.map((style, index) => (
            <option value={style.name} key={index}>
              {style.name}
            </option>
          ))}
        </select> */}
  
        <select value={pattern} onChange={handleFormChange}>
      {patterns.map((pattern, index) => (
        <option key={index} value={pattern.name}>
          {pattern.name}
        </option>
      ))}
    </select>
  
      <select value={colour} onChange={handleFormChange}>
      {colours.map((colour, index) => (
        <option key={index} value={colour.name}>
          {colour.name}
        </option>
      ))}
    </select>
      </div>

      <div className="check">
      <select value={artist} onChange={handleFormChange}>
          {artists.map((artist, index) => (
            <option key={index} value={artist.name}>
              {artist.name}
            </option>
          ))}
        </select>

        <select value={style} onChange={handleFormChange}>
          {styles.map((style, index) => (
            <option key={index} value={style.name}>
              {style.name}
            </option>
          ))}
        </select>
      </div>

      <div className="check">
        <select value={subject} onChange={handleFormChange}>
          {subjects.map((subject, index) => (
            <option key={index} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>

        <select value={medium} onChange={handleFormChange}>
          {mediums.map((medium, index) => (
            <option key={index} value={medium.name}>
              {medium.name}
            </option>
          ))}
        </select>
     
      </div>




      {/* <div className="check tabs">
        <button  onClick={handleChecked} value={formData.medium} className={`button ${active.includes(formData.medium) ? "activeButton" : ""}`}>{formData.medium}</button>
        <button  onClick={handleChecked}value ={formData.style} className={`button ${active.includes(formData.style) ? "activeButton" : ""}`}>{formData.style}</button>
        <button  onClick={handleChecked} value={formData.colour} className={`button ${active.includes(formData.colour) ? "activeButton" : ""}`}>{formData.colour}</button>
        <button  onClick={handleChecked} value={formData.artist} className={`button ${active.includes(formData.artist) ? "activeButton" : ""}`}>{formData.artist}</button>
        <button  onClick={handleChecked} value={formData.pattern}className={`button ${active.includes(formData.pattern) ? "activeButton" : ""}`}>{formData.pattern}</button>
        <button  onClick={handleChecked} value={formData.subject} className={`button ${active.includes(formData.subject) ? "activeButton" : ""}`}>{formData.subject}</button>
      </div> */}

      <div className="check tabs">
        {active.slice(0, 12).map((item, index) => (
          <button
            key={index}
            onClick={handleChecked}
            value={item}
            className={`button ${active.includes(item) ? "activeButton" : ""}`}
          >
          {item} 
          {/* <span className="icon">+</span>  */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default InputFields;
