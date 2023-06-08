
import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

const MainImage = ({
  isWaiting,
  title,
  description,
  style,
  medium,
  image,
  minting,
  creating,
  url,
  message,
}) => {
  const [lgShow, setLgShow] = useState(false);

  const renderImage = () => {
    if (!isWaiting && image) {
      return <img src={image} alt="AI generated image" />;
    } else if (isWaiting) {
      return (
        <div style={{ position: "relative", width: "350px", height: "350px" }}>
  <img src={image} alt="AI generated image" style={{ width: "100%", height: "100%" }} />
  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
    <Spinner animation="border" />
    <span>{message}</span>
  </div>
</div>
      );
    } else {
      return (
        <div className="">
          <img
            src="https://www.thebeautyemporium.com.au/wp-content/uploads/woocommerce-placeholder-1024x1024.png"
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
            {title}&nbsp;<em>"{description}"</em> - {medium}, {style}
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
        {!isWaiting && url && ""}
        {minting ? (
          <p className="status-message">Minting block...</p>
        ) : creating ? (
          <p className="status-message">Your Artblock is being created...</p>
        ) : (
          <p className="title">
            {title ? title : "Title"}&nbsp;"{description ? description : "description"}"
          </p>
        )}
      </div>
    </div>
  );
};

export default MainImage;
