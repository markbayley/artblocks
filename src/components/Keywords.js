import React from 'react'

const Keywords = ({words, subject, active, handleChecked}) => {
  return (
    <>
    {/* <div className='title'>Keywords</div> */}
     {/* Tab Inputs */}
     {subject === "Landscape" ? (
        <div className="tabs">
          {words[0].key.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(" " + item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Portrait" ? (
        <div className="tabs">
          {words[1].key.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(" " + item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Seascape" ? (
        <div className="tabs">
          {words[2].key.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(" " + item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Figure" ? (
        <div className="tabs">
          {words[3].key.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(" " + item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : subject === "Fruit Bowl" ? (
        <div className="tabs">
          {words[4].key.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(" " + item) ? "activeButton" : ""
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : (
        <div className="tabs">
          {words[5].key.map((item, index) => (
            <button
              key={index}
              onClick={handleChecked}
              value={item}
              className={`button ${
                active.includes(" " + item) ? "activeButton" : ""
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
