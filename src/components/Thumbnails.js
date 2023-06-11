import { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";

const Thumbnails = ({
  thumbs,
  isCreating,
  image,
  mintingIndex,
  url,
  account,
  storedThumbs,
  isMinting,
  transaction,
}) => {
  const [lgShow, setLgShow] = useState(false);
  const [modalData, setModalData] = useState([]);
  // console.log("storedThumbsT", storedThumbs);
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="heading">Minted Artblocks</div>
      <div className="thumbnails">
        {thumbs.length === 0 ? (
          <div className="text__placeholder">No Artblocks minted</div>
        ) : (
          thumbs.map((item, index) => (
            <>
              {/* && image && index !== mintingIndex */}
              {!isCreating && !isMinting   ? (
                <div className="" onClick={() => setLgShow(true)} key={index}>
                
                  <div className="thumbnail">
                    <img
                      key={index}
                      onLoad={() => setLoaded(true)}
                      style={loaded ? {} : { display: 'none' }}
                      src={item[10]}
                      alt="AI thumbnail"
                      onClick={() => {
                        setModalData(item);
                        // setLgShow(true);
                      }}
                    />
                    <>
                      &nbsp;{item[1]}
                      <em>"{item[2]}"</em>
                      <a
                        target="_blank"
                  
                        href={item[10]}
                      >
                        &nbsp;&nbsp;&nbsp;URL
                      </a>
                    </>
                  </div>
                </div>
              ) : isCreating || isMinting && (index + 1) !== mintingIndex ? (
                <div className="" onClick={() => setLgShow(true)} key={index}>
                  {item[10] ? (
                    <div className="thumbnail">
                      2 
                      <img
                        key={index}
                        src={item[10]}
                        alt="AI thumbnail"
                        onClick={() => {
                          setModalData(item);
                          // setLgShow(true);
                        }}
                      />
                      <>
                        &nbsp;{item[1]}
                        <em>"{item[2]}"</em>
                        <a
                          target="_blank"
                        
                          href={item[10]}
                        >
                          &nbsp;&nbsp;&nbsp;URL
                        </a>
                      </>
                    </div>
                  ) 
          
                    : ( "3"
                  )}
                </div>
              ) : "4"}
  
            </>
          ))
          // .reverse()
        )}
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {modalData[1]}&nbsp;<em>"{modalData[2]}"</em> - &nbsp;{" "}
            {/* {modalData[11].slice(0, 6) + "..." + modalData[11].slice(38, 42)} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalData[10]} alt="AI thumbnail" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Thumbnails;
