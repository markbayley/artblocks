import React, { createContext, useContext, useEffect, useState } from "react";

const initTeam = {
  // ...other team data
  thumbs: [],
};

export const Context = createContext();

const getInitialState = () => {
  const thumbs = localStorage.getItem("thumbs");
  return thumbs ? JSON.parse(thumbs) : initTeam;
};

const ContextProvider = (props) => {
  const [thumbs, setThumbs] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("thumbs", JSON.stringify(thumbs));
  }, [thumbs]);

  const addPlayer = (player) =>
    setThumbs((prev) => ({
      ...prev,
      thumbs: [...prev.thumbs, player],
    }));

  const removePlayer = (playerId) =>
    setThumbs((prev) => ({
      ...prev,
      thumbs: prev.thumbs.filter((p) => p.index !== playerId),
    }));

  return (
    <Context.Provider value={{ addPlayer, removePlayer, ...thumbs }}>
      {props.children}
    </Context.Provider>
  );
};

export const useThumbs = () => useContext(Context);

export default ContextProvider;