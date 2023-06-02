import { useState } from 'react'

const Button = (props) => {
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
  
    console.log(color);
    return (
      <button
        className={`button ${color}`}
        onClick={() => handleClickButton(props.name)}
      >
        {props.name}
      </button>
    );
  };
  
  const Toggles = ({words, subject}) => {
    const [names, setNames] = useState([
      "button1",
      "button2",
      "button3",
      "button4",
      "button5",
      "button6"
    ]);
    console.log(names);
    return (
      <div className="">
        {names.map((name, i) => (
          <Button key={i} name={name} />
        ))}
      </div>
    );
  };


export default Toggles