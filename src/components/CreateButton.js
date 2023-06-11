import React from "react";

const CreateButton = ({ isCreating }) => {
  return (
    <input
      type="submit"
      value={isCreating ? "Creating Art..." : "Create"}
      className={ isCreating ? "waitingButton" : ""}
    ></input>
  );
};

export default CreateButton;
