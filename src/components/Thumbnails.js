import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

const Thumbnails = ({
  thumbs,
  isCreating,
  mintingIndex,
  account,
  isMinting,
}) => {
  const [lgShow, setLgShow] = useState(false);
  const [modalData, setModalData] = useState([]);

  console.log("thumbs", thumbs);
  
  return (
    <>
      <div className="heading">Minted Artblocks</div>
      <div className="thumbnails">
        {thumbs.length === 0 ? (
          <div className="text__placeholder">No Artblocks minted</div>
        ) : (
          thumbs
            .map((item, index) => (
              <>
            
                { item.account === account && ((!isCreating && !isMinting) ||
                isCreating ||
                (isMinting && index !== mintingIndex)) ? (
                  <div className="" onClick={() => setLgShow(true)} key={index}>
                    <div className="thumbnail"  key={index}>
                      <img
                        key={index}
                        src={item.url}
                        alt="AI thumbnail"
                        onClick={() => {
                          setModalData(item);
                          // setLgShow(true);
                        }}
                      />
                      <div style={{ textTransform: "capitalize" }}>
                        &nbsp;{item.title}
                        <em>"{item.description}"</em>
                        {/* <a target="_blank" href={item.url}>
                          &nbsp;&nbsp;&nbsp;URL
                        </a> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  item.account === account &&
                  <div  key={index}>
                    <div className="thumbnail loading"  key={index}>
                      <img
                        key={index}
                        src={item.url}
                        alt="AI thumbnail"
                        onClick={() => {
                          setModalData(item);
                        }}
                      />
                      <>
                        &nbsp;{item.title}
                        <em>"{item.description}"</em>
                        {/* <a target="_blank" href={item.url}>
                          &nbsp;&nbsp;&nbsp;URL
                        </a> */}
                      </>
                    </div>
                  </div>
                )}
              </>
            ))
            .reverse()
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
          <div style={{display: "flex", justifyContent: "space-between" }}>
         <div>
         {modalData.title},&nbsp;<em>"{modalData.description}"</em>,
            </div>
            <div>
            &nbsp;&nbsp;{" "}
            <a target="_blank" href={modalData.metaData}>
              Data
            </a>{" "}
            &nbsp;&nbsp;
            <a target="_blank" href={modalData.url}>
              URL
            </a>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a target="_blank" href={`https://etherscan.io/tx/${modalData.hash}`}>
            { modalData.hash && (modalData.hash).slice(0, 4) + "..." + (modalData.hash).slice(62, 66)}
            </a>
            </div>
            </div>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalData.url} alt="AI thumbnail" width="100%"/>
        </Modal.Body>
      </Modal>
      
    </>
  );
};

export default Thumbnails;

