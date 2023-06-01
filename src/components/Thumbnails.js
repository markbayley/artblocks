import { useState } from "react";

import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";

const Thumbnails = ({ thumbs }) => {
  const [lgShow, setLgShow] = useState(false);
  const [modalData, setModalData] = useState([]);

  return (
    <>
      <div className="heading">My Artblocks</div>
      <div className="thumbnails">
        {thumbs.length === 0  ? <div className="text__placeholder">No Artblocks minted</div> :
          thumbs.map((item, index) => (
            <>
              <div className="" onClick={() => setLgShow(true)}>
                <div className="thumbnail">
                  <img
                   key={index}
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
              </div>
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
