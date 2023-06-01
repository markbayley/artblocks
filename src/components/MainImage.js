import { useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const MainImage = ({
  isWaiting,
  title,
  description,
  style,
  medium,
  artist,
  subject,
  image,
  minting,
  creating,
  url,
  message,
}) => {
  const [lgShow, setLgShow] = useState(false);
  return (
    <div >

      
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {title}&nbsp;<em>"{description}"</em> - {medium}, {style}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            {!isWaiting && image ? (
              <img src={image} alt="AI generated image" />
            ) : isWaiting ? (
              <div className="image__placeholder">
                <Spinner animation="border" />
                <p>{message}</p>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  src={
                    "https://www.thebeautyemporium.com.au/wp-content/uploads/woocommerce-placeholder-1024x1024.png"
                  }
                  alt="AI generated art"
                  width="350px"
                />
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>

      <div className="image">
        <button
          className="icon"
          onClick={() => setLgShow(true)}
        >
          {!isWaiting && image ? (
            <img src={image} alt="AI generated image"/>
          ) : isWaiting ? (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "350px", height: "350px"}}>
              <Spinner animation="border" />&nbsp;
              <>{message}</>
            </div>
          ) : (
        
              <img
                src={
                  "https://www.thebeautyemporium.com.au/wp-content/uploads/woocommerce-placeholder-1024x1024.png"
                }
                alt="AI generated art"
              />
        
          )}
        </button>
      </div>

<div style={{ textAlign: "center"}}>
      {!isWaiting && url && (
        // <button className="icon" onClick={() => setLgShow(true)}></button>
        ""
      )}

      {/* Main Text */}
      {minting ? (
     
          <>Minting block...</>
    
      ) : creating ? (
       
          <>Your Artblock is being created...</>
      
      ) : (
      
        <p className="title">{title ? title : "Title"}&nbsp;"{description ? description : "description"}"</p>
  
      )}

</div>
    </div>
  );
};

export default MainImage;
