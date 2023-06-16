import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import placeholder from "./../placer.png";

const MainImage = ({
  isCreating,
  isMinting,
  title,
  description,
  medium,
  image,
  url,
  message,
  metaData,
  transactionHash,
  powerPoints,
}) => {
  const [lgShow, setLgShow] = useState(false);

  const hashLink = `https://sepolia.etherscan.io/tx/${transactionHash}`;

  return (
    <>
      <div
        className="thumbnails"
        onClick={() => {
          setLgShow(true);
        }}

        // style={{width: "350px"}}
      
      >
        {!isCreating && !isMinting && image ? (
          <div className="thumbnail"  >
            <img src={image} alt="AI thumbnail" />
            <div className="overlay">
            {powerPoints && <span className="points">
             
                <a target="_blank" href={hashLink}>
                  {powerPoints.toUpperCase()}
                </a>
              </span>}
            </div>
            <div className="title">
            &nbsp;{title}
            <em>"{description}"</em>
            </div>
          </div>
        ) : isCreating || isMinting ? (
          <div className="thumbnail">
            <img src={image ? image : placeholder} alt="AI thumbnail" className="loading"/>
            <div className="message">
              <Spinner
                animation="border"
                style={{ width: "5rem", height: "5rem", color: "#f8b817" }}
              />
              {/* <span
                style={{
                  background: "#4c46b6",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "5px",
                  boxShadow: "1px 1px gray",
                  marginTop: "15px",
          
                }}
              >
                {message}
              </span> */}
            </div>
            <div className="title">
            &nbsp;{message}
            {/* <em>"{description}"</em> */}
            </div>
          </div>
        ) : (
          <div className="thumbnail" >
            <img src={placeholder} alt="AI generated art" className="placeholder-image"/>
            <div className="title">
            &nbsp;Let's Create Something!
            </div>
          </div>
        )}

        {/* 
<div className="title">
       {isCreating ? (
          "Your Artblock is being created..."
         ) : isMinting ? (
           "Your Artblock is being minted..."
       ) : !image ? (
        "Let's Create Something!"
        ) : (
        <p className="title"> 
           {title + ", " + "'" + description + "'"}

           {metaData && (
           <>
                <a target="_blank" href={hashLink}>
                &nbsp;&nbsp;&nbsp;Hash
            </a>

                <a target="_blank" href={metaData}>
                &nbsp;&nbsp;&nbsp;Data
                </a>
               <a target="_blank" href={url}>
                   &nbsp;&nbsp;&nbsp;URL
                </a>
              </>
            )}
         </p>
      )}
    </div> */}
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" className="title">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {title},&nbsp;<em>"{description}"</em>,
              </div>
              <div>
                &nbsp;&nbsp;{" "}
                <a target="_blank" href={metaData}>
                  Data
                </a>{" "}
                &nbsp;&nbsp;
                <a target="_blank" href={url}>
                  URL
                </a>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <a target="_blank" href={hashLink}>
                  {powerPoints}
                </a>
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img
            src={image ? image : placeholder}
            alt="AI thumbnail"
            width="100%"
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MainImage;
