import { useState } from "react";

const Button = ({ name }) => {
  const [color, setColors] = useState("");
  const [active, setActive] = useState(false);
  const handleClickButton = (name) => {
    setActive(true);
    setColors(name);
    if (active === true) {
      setActive(false);
      setColors("button");
    }
  };

  console.log("color", color);
  return (
    <button
      className={`button ${color}`}
      onClick={() => handleClickButton(name)}
    >
      {name}
    </button>
  );
};

const Toggles = ({ words, subject }) => {
  const words0 = [...words[0].key];
  const words1 = [...words[1].key];
  const words2 = [...words[2].key];
  const words3 = [...words[3].key];
  const words4 = [...words[4].key];
  const words5 = [...words[5].key];

  const [names, setNames] = useState([words0]);
  console.log("names", names);

  return (
    <>
      <div className="title">Keywords</div>
      {subject === "Landscape" ? (
        <div className="">
          {words0.map((name, i) => (
            <Button key={i} name={name} />
          ))}
        </div>
      ) : subject === "Portrait" ? (
        <div className="">
          {words1.map((name, i) => (
            <Button key={i} name={name} />
          ))}
        </div>
      ) : subject === "Seascape" ? (
        <div className="">
          {words2.map((name, i) => (
            <Button key={i} name={name} />
          ))}
        </div>
      ) : subject === "Figure" ? (
        <div className="">
          {words3.map((name, i) => (
            <Button key={i} name={name} />
          ))}
        </div>
      ) : subject === "Fruit Bowl" ? (
        <div className="">
          {words4.map((name, i) => (
            <Button key={i} name={name} />
          ))}
        </div>
      ) : (
        <div className="">
          {words5.map((name, i) => (
            <Button key={i} name={name} />
          ))}
        </div>
      )}
    </>
  );
};

export default Toggles;
