import React from "react";
import ColorPalettes from "./ColorPalettes";

const artists = [
  {
    name: "Artist",
  },
  {
    name: "Picasso",
  },
  {
    name: "Dali",
  },
  {
    name: "Van Gogh",
  },
  {
    name: "Rembrandt",
  },
  {
    name: "Cézanne",
  },
  {
    name: "Klimt",
  },
  {
    name: "Matisse",
  },
  {
    name: "Pollock",
  },
  {
    name: "Rothko",
  },
];

const mediums = [
  {
    name: "Medium",
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
    name: "Pencil",
  },
  {
    name: "Pastels",
  },
];

const colours = [
  {
    name: "Colour",
  },
  {
    name: "Turquoise",
  },
  {
    name: "Lime Green",
  },
  {
    name: "Yellow Ochre",
  },
  {
    name: "Raw Sienna",
  },
  {
    name: "Fushcia",
  },
  {
    name: "Coral Pink",
  },
  {
    name: "Crimson",
  },
  {
    name: "Mauve",
  },
  {
    name: "Goldenrod",
  },
];

const InputFields = ({
  setTitle,
  setDescription,
  setMedium,
  setArtist,
  selectedColors,
  setSelectedColors,
  selectedStyle,
  setSelectedStyle,
}) => {
  return (
    <>
      <div className="tabs">
        <input
          required
          type="text"
          placeholder="NFT name..."
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <input
          // required
          type="text"
          placeholder="NFT description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
      </div>

      <ColorPalettes
        selectedColors={selectedColors}
        setSelectedColors={setSelectedColors}
        selectedStyle={selectedStyle}
        setSelectedStyle={setSelectedStyle}
      />

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
    </>
  );
};

export default InputFields;
