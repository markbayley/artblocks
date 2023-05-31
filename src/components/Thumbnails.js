import React from "react";

const Thumbnails = ({ thumbs, items, url }) => {
  return (
    <>
     <div className="heading">My Artblocks</div>
      <div className="thumbnails">
       
        {thumbs
          .map((item, index) => (
            <div className="thumbnail" key={index}>
              <img src={item[0]} alt="AI thumbnail" />
              <div>
                <p>{item[1]}
            
                  <em>"{item[2]}"</em>
                </p>
              </div>

              {/* <p>
            View&nbsp;<a href={url}>Metadata</a>
          </p> */}
            </div>
          ))
          .reverse()}

        {/* <div className="thumbnail" >
          <img src={image} alt="AI thumbnail" />
       

          <p>
            View&nbsp;<a href={url}>Metadata</a>
          </p>
        </div> */}
      </div>

      {/* Local Storage */}
      {/* <div className="thumbnails">
        {items
          .map((item, index) => (
            <div className="thumbnail" key={index}>
              <img src={item[0]} alt="AI thumbnail" />
              <p>
                View&nbsp;<a href={url}>Item</a>
              </p>
            </div>
          ))
          .reverse()}
      </div> */}
    </>
  );
};

export default Thumbnails;
