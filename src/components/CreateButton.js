import React from 'react'

const CreateButton = ({ isCreating, mintHandler, isMinting, image, url }) => {
  return (
    <div
    style={{
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      margin: "15px 0px",
    }}
  >
    <input
      type="submit"
      value={isCreating ? "Creating Art..." : "Create"}
      className={ isCreating ? "waitingButton" : ""}
    ></input>
    <input
    onClick={mintHandler}
    type="submit"
    value={isMinting ? "Minting Art..." : "Mint"}
    className={
      isMinting
        ? "waitingButton"
        : !image || url
        ? "disabledButton"
        : ""
    }
  ></input>
  </div>
  );
};

export default CreateButton;