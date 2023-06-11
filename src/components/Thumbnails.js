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
                  
                  <div className="thumbnail" >
                    <img
                      key={index}
                      src={item.url}
                      alt="AI thumbnail"
                      onClick={() => {
                        setModalData(item);
                        // setLgShow(true);
                      }}
                    />
                  <div style={{textTransform: "capitalize"}}>
                      &nbsp;{item.title}
                      <em>"{item.description}"</em>
                      <a
                        target="_blank"
                  
                        href={item.url}
                      >
                        &nbsp;&nbsp;&nbsp;URL
                      </a>
                    </div>
                  </div>
                </div>
              ) : isCreating || isMinting && (index) !== mintingIndex ? (
                <div className="" onClick={() => setLgShow(true)} key={index}>
                  {item.url ? (
                    <div className="thumbnail"  >
                      {/* {index} ,{mintingIndex} */}
                     
                      <img
                        key={index}
                        src={item.url}
                        alt="AI thumbnail"
                        onClick={() => {
                          setModalData(item);
                          // setLgShow(true);
                        }}
                      />
                      <>
                        &nbsp;{item.title}
                        <em>"{item.description}"</em>
                        <a
                          target="_blank"
                        
                          href={item.url}
                        >
                          &nbsp;&nbsp;&nbsp;URL
                        </a>
                      </>
                    </div>
                  ) 
          
                    : ( "3"
                  )}
                </div>
              ) :  
              <div  >
                {/* n/a {index} ,{mintingIndex} */}
              <div
             className="thumbnail loading"
            
              >
                  <img
                        key={index}
                        src={item.url}
                        alt="AI thumbnail"
                        onClick={() => {
                          setModalData(item);
                          // setLgShow(true);
                        }}
                      />
                {/* <Spinner
                  animation="border"
                  style={{ width: "5rem", height: "5rem", color: "orange" }}
                /> */}
                {/* <span>loading...</span> */}
                <>
                        &nbsp;{item.title}
                        <em>"{item.description}"</em>
                        <a
                          target="_blank"
                        
                          href={item.url}
                        >
                          &nbsp;&nbsp;&nbsp;URL
                        </a>
                      </>
              </div>
            </div>
               
              
              
              
              
              }
  
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
            {modalData.title},&nbsp;<em>"{modalData.description}"</em>&nbsp;&nbsp;{" "} <a  target="_blank" href={modalData.metaData}>Data</a> &nbsp;&nbsp;<a  target="_blank" href={modalData.url}>URL</a>
            {/* {modalData[11].slice(0, 6) + "..." + modalData[11].slice(38, 42)} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={modalData.url} alt="AI thumbnail" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Thumbnails;
