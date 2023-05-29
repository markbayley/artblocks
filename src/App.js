import { useState, useEffect } from "react";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import axios from "axios";

// Components
import Spinner from "react-bootstrap/Spinner";
import Navigation from "./components/Navigation";

// ABIs
import NFT from "./abis/NFT.json";

// Config
import config from "./config.json";
import { ToggleButton } from "react-bootstrap";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [thumbs, setThumbs] = useState([]);
  const [meta, setMeta] = useState([]);
  const [url, setURL] = useState(null);

  const [style, setStyle] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [keyword, setKeyword] = useState([]);

  const [count, setCount] = useState(0);

  const [creating, setCreating] = useState(null);
  const [minting, setMinting] = useState(null);

  const [checked, setChecked] = useState(false);
  const [active, setActive] = useState([]);

  const currentYear = new Date().getFullYear();

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setCount(count + 1);

    const imageData = createImage();

    const url = await uploadImage(imageData);

    e.target.reset();
  };

  const clearHandler = async (e) => {
    e.target.reset();
  };

  const createImage = async () => {
    setCreating(true);
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

    meta.push([
      name +
        " " +
        description +
        " " +
        medium +
        " " +
        style +
        " " +
        artist +
        " " +
        keyword,
    ]);
    setMeta(meta);

    // Send the request
    const response = await axios({
      url: URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        inputs:
          keyword +
          " " +
          description +
          " " +
          name +
          " " +
          style +
          " " +
          artist +
          " " +
          medium,
        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data;

    const base64data = Buffer.from(data).toString("base64");
    const img = `data:${type};base64,` + base64data;

    setImage(img);

    thumbs.push([
      img,
      name,
      description,
      style,
      artist,
      medium,
      keyword,
      count,
    ]);
    setThumbs(thumbs);

    setCreating(false);

    return data;
  };

  const uploadImage = async (imageData) => {
    console.log("Uploading Image...");
    setMinting(true);
    // Create instance to NFT.Storage
    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });

    // Send request to store image
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
      style: style,
      artist: artist,
      medium: medium,
      keyword: keyword,
      count: count,
    });

    // Save the URL
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setURL(url);
    setMinting(false);

    return url;
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  const artists = [
    {
      name: "Artist",
    },
    {
      name: "Picasso",
    },
    {
      name: "Dali",
    },
    {
      name: "Van Gogh",
    },
    {
      name: "Rembrandt",
    },
    {
      name: "Cézanne",
    },
    {
      name: "Klimt",
    },
    {
      name: "Matisse",
    },
    {
      name: "Pollock",
    },
    {
      name: "Rothko",
    },
  ];

  const styles = [
    {
      name: "Style",
    },
    {
      name: "Abstract",
    },
    {
      name: "Expressionism",
    },
    {
      name: "Pop Art",
    },
    {
      name: "Surrealism",
    },
    {
      name: "Realism",
    },
    {
      name: "Minimalism",
    },
    {
      name: "Impressionism",
    },
    {
      name: "Cubism",
    },
    {
      name: "Modernism",
    },
  ];

  const mediums = [
    {
      name: "Medium",
    },
    {
      name: "Watercolor",
    },
    {
      name: "Oil",
    },
    {
      name: "Charcoal",
    },
    {
      name: "Ink",
    },
    {
      name: "Gouche",
    },
    {
      name: "Acrylic",
    },
    {
      name: "Pencil",
    },
    {
      name: "Pastels",
    },
  ];

  console.log("thumbs", thumbs);

  const handleChecked = (e) => {
    e.preventDefault();

    // active.push(e.target.value)
    // setActive(active + ", " + e.target.value)
    setActive((prevArr) =>
      prevArr.includes(e.target.value)
        ? [...prevArr.pop()]
        : [...prevArr, " " + e.target.value]
    );

    // setKeyword(keyword + ", " + e.currentTarget.value)

    setKeyword((prevArr) => [...prevArr, " " + e.target.value]);

    // keyword.slice(1)
    // keyword.push(e.target.value)
  };

  console.log("active", active);
  console.log("keyword", keyword);

  console.log("url", url);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <div className="form">
        <form onSubmit={submitHandler}>
          <input
            required
            type="text"
            placeholder="NFT name..."
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>

          <div className="check">
            <select onChange={(e) => setStyle(e.target.value)}>
              {styles.map((style, index) => (
                <option value={style.name} key={index}>
                  {style.name}
                </option>
              ))}
            </select>
          </div>

          <div className="check">
            <select onChange={(e) => setMedium(e.target.value)}>
              {mediums.map((medium, index) => (
                <option value={medium.name} key={index}>
                  {medium.name}
                </option>
              ))}
            </select>
          </div>

          <div className="check">
            <select onChange={(e) => setArtist(e.target.value)}>
              {artists.map((artist, index) => (
                <option value={artist.name} key={index}>
                  {artist.name}
                </option>
              ))}
            </select>

            {/* +
                  " " +
                  keyword +
                  " " +
                  medium +
                  " " +
                  style +
                  " " +
                  artist +
                  " " + "#00" +
                  count  */}
          </div>

          <input
            required
            type="text"
            placeholder="NFT description..."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></input>

          <div>
            <button
              onClick={handleChecked}
              value="bird"
              className={`button ${
                active.includes(" bird") ? "activeButton" : ""
              }`}
            >
              bird
            </button>
            <button
              onClick={handleChecked}
              value="insect"
              className={`button ${
                active.includes(" insect") ? "activeButton" : ""
              }`}
            >
              insect
            </button>
            <button
              onClick={handleChecked}
              value="woman"
              className={`button ${
                active.includes(" woman") ? "activeButton" : ""
              }`}
            >
              woman
            </button>
            <button
              onClick={handleChecked}
              value="beach"
              className={`button ${
                active.includes(" beach") ? "activeButton" : ""
              }`}
            >
              beach
            </button>
          </div>

          <div>
            <button
              onClick={handleChecked}
              value="tree"
              className={`button ${
                active.includes(" tree") ? "activeButton" : ""
              }`}
            >
              tree
            </button>
            <button
              onClick={handleChecked}
              value="fruit"
              className={`button ${
                active.includes(" fruit") ? "activeButton" : ""
              }`}
            >
              fruit
            </button>
            <button
              onClick={handleChecked}
              value="stripes"
              className={`button ${
                active.includes(" stripes") ? "activeButton" : ""
              }`}
            >
              stripes
            </button>
            <button
              onClick={handleChecked}
              value="cyan"
              className={`button ${
                active.includes(" cyan") ? "activeButton" : ""
              }`}
            >
              cyan
            </button>
          </div>

          {image ? (
            <input type="submit" value="Create"></input>
          ) : (
            <div>
              <input
                type="submit"
                value={creating ? "Creating Art..." : "Create"}
              ></input>
              {/* <input onSubmit={clearHandler}
            type="submit"
            value={"Clear"}
          ></input> */}
            </div>
          )}
          {/* {image ? (
            <input
              type="submit"
              value={minting ? "Minting..." : "Mint"}
            ></input>
          ) : (
            ""
          )} */}
          {/* <p>
            View&nbsp;<a href={url}>Metadata</a>
          </p> */}
        </form>

        <div>
          <div className="image">
            {!creating ? (
              <img
                src={
                  image
                    ? image
                    : "https://www.thebeautyemporium.com.au/wp-content/uploads/woocommerce-placeholder-1024x1024.png"
                }
                alt="AI generated art"
              />
            ) : (
              <Spinner />
            )}
          </div>

          {minting ? (
            <div>
              <br />
              <p>"Minting block..."</p>
            </div>
          ) : creating ? (
            <div>
              <br />
              <p>"Your Artblock is almost ready..."</p>
            </div>
          ) : (
            <div>
              <p>
                {name ? <b>{name}&nbsp;</b> : "Title"}{" "}
                <em>
                  &nbsp;"
                  {description ? <b>{description}&nbsp;</b> : "description"}"
                </em>
              </p>
              <p>
                &nbsp;{medium ? <b>{medium}&nbsp;</b> : "Medium, "}{" "}
                {style ? <b>&nbsp;{style}&nbsp;-</b> : "Style - "}{" "}
                {artist ? <b>&nbsp;{artist}&nbsp;</b> : "Artist"}{" "}
              </p>
              <p>
                {" "}
                #{count}/10 &copy; {currentYear}{" "}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="thumbnails">
        {thumbs
          .map((item, index) => (
            <div className="thumbnail" key={index}>
              <img src={item[0]} alt="AI thumbnail" />
              <div>
                <p>
                  {item[1]}
                  <em>"{item[2]}"</em>
                </p>
              </div>

              <p>
                View&nbsp;<a href={url}>Metadata</a>
              </p>
            </div>
          ))
          .reverse()}

{/* <div className="thumbnail" >
              <img src={image} alt="AI thumbnail" />
           

              <p>
                View&nbsp;<a href={url}>Metadata</a>
              </p>
            </div> */}
      </div>
    </div>
  );
}

export default App;
