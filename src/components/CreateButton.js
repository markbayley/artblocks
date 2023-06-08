import React from "react";

const CreateButton = ({ isCreating, setIsCreating }) => {
  return (
    <input
      type="submit"
      value={isCreating ? "Creating Art..." : "Create"}
    ></input>
  );
};

export default CreateButton;
