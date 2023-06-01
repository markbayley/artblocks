import { useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Thumbnails = ({ thumbs }) => {
  const [lgShow, setLgShow] = useState(false);
  const [modalData, setModalData] = useState(null);

  return (
    <>
      <div className="heading">My Artblocks</div>
      <div className="thumbnails">
        {thumbs
          .map((item, index) => (
            <>
              <button className="icon" onClick={() => setLgShow(true)}>
                <div className="thumbnail" key={index}>
                  <img
                    src={item[0]}
                    alt="AI thumbnail"
                    onClick={() => {
                      setModalData(item);
                      // setLgShow(true);
                    }}
                  />
                  <>
                    &nbsp;{item[1]}
                    <em>"{item[2]}"</em>
                  </>
                </div>
              </button>
            </>
          ))
          .reverse()}
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {modalData[1]}&nbsp;<em>"{modalData[2]}"</em> - {modalData[5]}&nbsp;{" "}
            {modalData[10]} - {modalData[3]}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalData[0]} alt="AI thumbnail" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Thumbnails;
