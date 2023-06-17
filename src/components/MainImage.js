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
        style={{ width: "300px" }}
      >
        {!isCreating && !isMinting && image ? (
          <div className="thumbnail">
            <img src={image} alt="AI thumbnail" />
            <div className="overlay">
              {powerPoints && (
                <span className="points">
                  <a target="_blank" href={hashLink}>
                    {powerPoints.toUpperCase()}
                  </a>
                </span>
              )}
            </div>
            <div className="title">
              &nbsp;{title}
              <em>"{description}"</em>
            </div>
          </div>
        ) : isCreating || isMinting ? (
          <div className="thumbnail">
            <img
              src={image ? image : placeholder}
              alt="AI thumbnail"
              className="loading"
            />
            <div className="message">
              <Spinner
                animation="border"
                style={{ width: "5rem", height: "5rem", color: "#f8b817" }}
              />
            </div>
            <div className="title">&nbsp;{message}</div>
          </div>
        ) : (
          <div className="thumbnail">
            <img
              src={placeholder}
              alt="AI generated art"
              className="placeholder-image"
            />
            <div className="title">&nbsp;Let's Create Something!</div>
          </div>
        )}
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
                {metaData && title }&nbsp;<em>{metaData && '"' + description + '"'}</em>
              </div>
              <div>
                {metaData && url ? (
                  <>
                    <a target="_blank" href={metaData}>
                      &nbsp;&nbsp; Data
                    </a>

                    <a target="_blank" href={url}>
                      &nbsp;&nbsp;URL 
                    </a>
                  </>
                ) :  "  No image created yet"}

                <a target="_blank" href={hashLink}>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  {transactionHash &&
                    transactionHash.slice(0, 4) +
                      "..." +
                      transactionHash.slice(62, 66)}
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
