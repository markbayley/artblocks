import React, { useState } from 'react';

const styles = [
    {
      name: "Style",
    },
    {
      name: "Abstract",
      colors: ['#FF5722', '#2196F3', '#FFC107', '#4CAF50', '#9C27B0', '#FF9800'],
    },
    {
      name: "Expressionism",
      colors: ['#E91E63', '#FFEB3B', '#FF5722', '#8BC34A', '#673AB7', '#FFC107'],
    },
    {
      name: "Pop Art",
      colors: ['#F44336', '#FFEB3B', '#FF9800', '#9C27B0', '#2196F3', '#FF4081'],
    },
    {
      name: "Surrealism",
      colors: ['#9C27B0', '#FFEB3B', '#03A9F4', '#FF9800', '#E91E63', '#8BC34A'],
    },
    {
      name: "Realism",
      colors: ['#607D8B', '#FFEB3B', '#795548', '#4CAF50', '#9E9E9E', '#FF5722'],
    },
    {
      name: "Minimalism",
      colors: ['#FFFFFF', '#212121', '#F5F5F5', '#616161', '#EEEEEE', '#424242'],
    },
    {
      name: "Impressionism",
      colors: ['#2196F3', '#FFEB3B', '#8BC34A', '#FF5722', '#03A9F4', '#FF9800'],
    },
    {
      name: "Cubism",
      colors: ['#673AB7', '#FFEB3B', '#9C27B0', '#FF9800', '#03A9F4', '#FF5722'],
    },
    {
      name: "Modernism",
      colors: ['#9E9E9E', '#FFEB3B', '#607D8B', '#4CAF50', '#795548', '#FF9800'],
    },
  ];
  

const ColorPalettes = ({selectedColors, setSelectedColors, selectedStyle, setSelectedStyle}) => {
  
    const handleStyleChange = (e) => {
      const styleName = e.target.value;
      setSelectedStyle(styleName);
  
      // Reset selected colors when style changes
      setSelectedColors([]);
    };
  
    const handleColorClick = (e , color) => {
        e.preventDefault();
      if (selectedColors.includes(color)) {
        setSelectedColors((prevColors) => prevColors.filter((c) => c !== color));
      } else {
        setSelectedColors((prevColors) => [...prevColors, color]);
      }
    };
  
    const styleOptions = styles.map((style) => (
      <option key={style.name} value={style.name}>
        {style.name}
      </option>
    ));
  
    const selectedStyleColors = styles.find((style) => style.name === selectedStyle)?.colors || [];

    const colorButtons = selectedStyleColors.map((color) => (
      <button
        key={color}
        className={`color ${selectedColors.includes(color) ? 'selected' : ''}`}
        style={{ backgroundColor: color }}
        onClick={(e) => handleColorClick(e, color)}
      >
        {color}
      </button>
    ));
  
  
    return (
        <div className="style-dropdown check">
        <div style={{width: "49%"}}>
          <select value={selectedStyle} onChange={handleStyleChange}>
            {styleOptions}
          </select>
        </div>
        <div className="color-palette" >{colorButtons}</div>
      </div>
    //   <div className="color-palette check">
    //     <div style={{width: "350px"}}>
    //       <select value={selectedStyle} onChange={handleStyleChange}>
    //         {styles.map((style, index) => (
    //           <option key={index} value={style.name}>
    //             {style.name}
    //           </option>
    //         ))}
    //       </select>
    //     </div>
   
    //   <div className="color-palette">{colorButtons}</div>
    //     <div className="colors">
    //       {colors.map((color, index) => (
    //         <button
    //           key={index}
    //           className={`color ${selectedColors.includes(color) ? 'selected' : ''}`}
    //           style={{ backgroundColor: color }}
    //           onClick={(e) => handleColorSelect(e, color)}
    //         ></button>
    //       ))}
    //     </div>
    //   </div>
    );
  };
  
  export default ColorPalettes;

  
  
  
  
  
  
  


