import React, { useEffect } from "react";


const colours = [
  {
    name: "Colour",
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
    name: "Artist",
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
    name: "Style",
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
    name: "Medium",
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
  title
}) => {

  // useEffect(() => {

  // }, [formData]);

  return (
    <div >
      <div className="select "  >
        <input
          required
          type="text"
          placeholder="NFT Title..."
          onChange={(e) => {
            setTitle(e.target.value);
            setFormData({...formData, title: e.target.value })
          
          }}
        ></input>
        <input
          required
          type="text"
          placeholder="NFT Description..."
          onChange={(e) => {
            setDescription(e.target.value);
            setFormData({...formData, description: e.target.value })
           
          }}
        ></input>
      </div>

      <div className="check">
        {/* <select onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((subject, index) => (
            <option value={subject.name} key={index}>
              {subject.name}
            </option>
          ))}
        </select> */}
           <select style={{ width: "" }}
           onChange={(e) => {
            setStyle(e.target.value)
            setFormData({...formData, style: e.target.value })
           }} >
          {styles.map((style, index) => (
            <option value={style.name} key={index}>
              {style.name}
            </option>
          ))}
        </select>
   

      
        <select style={{ width: "" }} onChange={(e) => setColour(e.target.value)}>
          {colours.map((colour, index) => (
            <option value={colour.name} key={index}>
              {colour.name}
            </option>
          ))}
        </select>
      </div>

      <div className="check">
        <select onChange={(e) => setMedium(e.target.value)}>
          {mediums.map((medium, index) => (
            <option value={medium.name} key={index}>
              {medium.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setArtist(e.target.value)}>
          {artists.map((artist, index) => (
            <option value={artist.name} key={index}>
              {artist.name}
            </option>
          ))}
        </select>
     
      </div>

 
    </div>
  );
};

export default InputFields;
