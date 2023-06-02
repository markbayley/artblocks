import React from 'react'

const Keywords = ({words, subject, active, handleChecked}) => {

  // merge two arrays
  let arr0 = [...active, ...words[0]];
  let arr1 = [...active, ...words[1]];
  let arr2 = [...active, ...words[2]];
  let arr3 = [...active, ...words[3]];
  let arr4 = [...active, ...words[4]];
  let arr5 = [...active, ...words[5]];

  // removing duplicate
  let keywords0 = [...new Set(arr0.slice(0, 6))];
  let keywords1 = [...new Set(arr1.slice(0, 6))];
  let keywords2 = [...new Set(arr2.slice(0, 6))];
  let keywords3 = [...new Set(arr3.slice(0, 6))];
  let keywords4 = [...new Set(arr4.slice(0, 6))];
  let keywords5 = [...new Set(arr5.slice(0, 6))];


  return (
    <>
    {/* <div className='title'>Keywords</div> */}
     {/* Tab Inputs */}
     <div className='title'>Keywords</div>
     {subject === "Landscape" ? (
        <div className="tabs">
      
          {keywords0.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Portrait" ? (
        <div className="tabs">
          {keywords1.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Seascape" ? (
        <div className="tabs">
          {keywords2.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Figure" ? (
        <div className="tabs">
          {keywords3.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Fruit Bowl" ? (
        <div className="tabs">
          {keywords4.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : (
        <div className="tabs">
          {keywords5.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      )}
      </>
  )
}

export default Keywords
