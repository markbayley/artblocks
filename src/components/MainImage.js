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
}) => {
  const [lgShow, setLgShow] = useState(false);

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
              width: "320px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              //  justifyContent: "space-evenly",
            }}
          >
            <Spinner
              animation="border"
              style={{ width: "5rem", height: "5rem", color: "orange" }}
            />
            <span>{message}</span>
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
          <Modal.Title id="example-modal-sizes-title-lg">
            {title}&nbsp;<em>"{description}"</em> - {medium},
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
                <>
                  <a target="_blank" href={metaData}>
                    &nbsp;&nbsp;&nbsp;Data
                  </a>
                  <a target="_blank" href={url}>
                    &nbsp;&nbsp;&nbsp;URL
                  </a>
                </>
            }
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default MainImage;
