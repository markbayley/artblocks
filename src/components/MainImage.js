import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import placeholder from "./../placer.png"


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
  transactionHash
}) => {
  const [lgShow, setLgShow] = useState(false);

  console.log("transactionHashE:", transactionHash);


  const hashLink = `https://etherscan.io/tx/${transactionHash}`

  const renderImage = () => {
    if (!isCreating && !isMinting && image) {
      return <img src={image} alt="AI generated image" />;
    } else if (isCreating || isMinting) {
      return (
        <div style={{ position: "relative", width: "350px", height: "350px" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "350px",
              height: "350px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              backgroundImage: `url(${image})`,
              backgroundSize: "350px 350px",
              filter: "greyscale(50%)",
               justifyContent: "center",
            }}
          >
            <Spinner
              animation="border"
              style={{ width: "5rem", height: "5rem", color: "#f8b817" }}
            />
            <span style={{background: "#4c46b6", color: "#fff", padding: "10px", borderRadius: "5px", boxShadow: "1px 1px gray", marginTop: "15px"}}>{message}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="">
          <img
            src={placeholder}
            alt="AI generated art"
            width="350px"
          />
        </div>
      );
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg" >
            <div style={{display: "flex", justifyContent: "space-between" }}>
         <div>
            {title}&nbsp;<em>"{description}"</em>,
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
            { transactionHash && (transactionHash).slice(0, 4) + "..." + transactionHash.slice(62, 66)}
            </a>
            </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-image-container">{renderImage()}</div>
        </Modal.Body>
      </Modal>

      <div className="image">
        <button className="icon" onClick={() => setLgShow(true)}>
          {renderImage()}
        </button>
      </div>

      <div className="main-image-text">
        <p className="title">
          {isCreating ? (
            "Your Artblock is being created..."
          ) : isMinting ? (
            "Your Artblock is being minted..."
          ) : !image ? (
            "Let's Create Something!"
          ) : (
            <>
              {title + ", " + "'" + description + "'"}
         
              { metaData &&
                <div>
                  <a target="_blank" href={hashLink}>
                  &nbsp;&nbsp;&nbsp;Hash
                  </a>
                 
                  <a target="_blank" href={metaData}>
                    &nbsp;&nbsp;&nbsp;Data
                  </a>
                  <a target="_blank" href={url}>
                    &nbsp;&nbsp;&nbsp;URL
                  </a>
                
              
                </div>
            }
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default MainImage;

