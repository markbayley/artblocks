import React from "react";

const InputFields = ({
  setTitle,
  setDescription,
  setSubject,
  setMedium,
  setStyle,
  setColour,
  setArtist,
  setPattern,
  subjects,
  styles,
  mediums,
  patterns,
  artists,
  colours,
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
          required
          type="text"
          placeholder="NFT description..."
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
      </div>

      <div className="check">
        <select onChange={(e) => setSubject(e.target.value)}>
          {subjects.map((subject, index) => (
            <option value={subject.name} key={index}>
              {subject.name}
            </option>
          ))}
        </select>

        <select onChange={(e) => setColour(e.target.value)}>
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
        <select onChange={(e) => setStyle(e.target.value)}>
          {styles.map((style, index) => (
            <option value={style.name} key={index}>
              {style.name}
            </option>
          ))}
        </select>
      </div>

      <div className="check">
        <select onChange={(e) => setArtist(e.target.value)}>
          {artists.map((artist, index) => (
            <option value={artist.name} key={index}>
              {artist.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setPattern(e.target.value)}>
          {patterns.map((pattern, index) => (
            <option value={pattern.name} key={index}>
              {pattern.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default InputFields;
