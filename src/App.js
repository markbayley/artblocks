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

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState(null)

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);

  const [message, setMessage] = useState("")
  const [isWaiting, setIsWaiting] = useState(false)

  const [style, setStyle] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [colour, setColour] = useState("");
  const [pattern, setPattern] = useState("");
  const [subject, setSubject] = useState("");
  const [keyword, setKeyword] = useState([]);
  const [count, setCount] = useState(0);

  const [creating, setCreating] = useState(null);
  const [minting, setMinting] = useState(null);
  const [active, setActive] = useState([]);
  const currentYear = new Date().getFullYear();

  const [thumbs, setThumbs] = useState([]);

  // Local Storage
  const storedItems = JSON.parse(localStorage.getItem("items"));
  const [items, setItems] = useState(storedItems);
  // console.log(localStorage);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);


  const loadBlockchainData = async () => {
    console.log("Loading blockchain data...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork()

    const nft = new ethers.Contract(config[network.chainId].nft.address, NFT, provider)
    setNFT(nft)

    const name = await nft.name()
    console.log("name", name)
  };


    // Form Request
    const submitHandler = async (e) => {
      e.preventDefault();

      if (name === "" || description === "") {
        window.alert("Please provide a name and description")
        return
      }

      setIsWaiting(true)
    
      const imageData = createImage();
  
      const url = await uploadImage(imageData);

      await mintImage(url)

      setIsWaiting(false)
      setMessage("")

      setMessage("success!")
  
      setCount(count + 1);
      e.target.reset();
      setKeyword([]);
      setActive([]);
    };
  

  const createImage = async () => {
    setMessage("Generating Image...");
    setCreating(true);
    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

    // Send the request
    setMessage("Sending the request...");
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
          subject +
          " " +
          name +
          " " +
          style +
          " " +
          artist +
          " " +
          medium +
          " " +
          colour + 
          " " +
          pattern +
          " " + 
          count,
        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data;

    const base64data = Buffer.from(data).toString("base64");
    const img = `data:${type};base64,` + base64data;

    setImage(img);

    console.log("Creating Thumbnail data...");
    thumbs.push([
      img,
      name,
      description,
      style,
      artist,
      medium,
      colour,
      keyword,
      pattern,
      count,
      subject
    ]);

    setThumbs(thumbs);
    console.log("thumbs", thumbs);

    setItems(thumbs)
    console.log("items", items)

    setCreating(false);

    return data;
  };

  const uploadImage = async (imageData) => {
    setMessage("Uploading Image...");
    // Create instance to NFT.Storage
    console.log("Creating instance to NFT.Storage");
    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });

    // Send request to store image
    setMessage("Sending request to store image");
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      name: name,
      description: description,
      style: style,
      artist: artist,
      medium: medium,
      colour: colour,
      keyword: keyword,
      count: count,
      subject: subject,
      pattern: pattern
    });

    // Save the URL
    setMessage("Saving the URL");
    const url = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setURL(url);
    setMinting(false);

    console.log("active", active);
    console.log("keyword", keyword);
    console.log("url", url);

    return url;
  };

  const mintImage = async (tokenURI) => {
    setMessage("Waiting for Mint...")

    const signer = await provider.getSigner()
    const transaction = await nft.connect(signer).mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") })
    await transaction.wait()
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])



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

  const colours = [
    {
      name: "Colour",
    },
    {
      name: "Turquoise",
    },
    {
      name: "Lime Green",
    },
    {
      name: "Yellow Ochre",
    },
    {
      name: "Raw Sienna",
    },
    {
      name: "Fushcia",
    },
    {
      name: "Coral Pink",
    },
    {
      name: "Crimson",
    },
    {
      name: "Mauve",
    },
    {
      name: "Goldenrod",
    },
  ];

  const patterns = [
    {
      name: "Pattern",
    },
    {
      name: "Stripes",
    },
    {
      name: "Checkered",
    },
    {
      name: "Dots",
    },
    {
      name: "Zig Zags",
    },
    {
      name: "Curves",
    },
    {
      name: "Speckled",
    },
    {
      name: "Swirls",
    },
    {
      name: "Spiked",
    },
    {
      name: "Soft",
    },
    {
      name: "Angular",
    },
  ];

  const subjects = [
    {
      name: "Subject",
    },
    {
      name: "Landscape",
    },
    {
      name: "Portrait",
    },
    {
      name: "Seascape",
    },
    {
      name: "Human Figure",
    },
    {
      name: "Fruit Bowl",
    },

    // {
    //   name: "turtle",
    // },
    // {
    //   name: "dots",
    // },
  ];


  // Toggle Buttons
  const handleChecked = (e) => {
    e.preventDefault();

    // setDescription((prevArr) => [...prevArr, " " + e.target.value]);

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

  // const clearHandler = async (e) => {
  //   e.target.reset();
  // };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <div className="form">
        <form onSubmit={submitHandler}>
          {/* <input items={items} setItems={setItems} /> */}

          {/* Text Inputs */}
          <div className="tabs">
            <input
              required
              type="text"
              placeholder="NFT name..."
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <input
              required
              type="text"
              placeholder="NFT description..."
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></input>
          </div>

          {/* Select inputs */}
          <div className="check">
            <select onChange={(e) => setStyle(e.target.value)}>
              {styles.map((style, index) => (
                <option value={style.name} key={index}>
                  {style.name}
                </option>
              ))}
            </select>
            <select onChange={(e) => setColour(e.target.value)}>
              {colours.map((colour, index) => (
                <option value={colour.name} key={index}>
                  {colour.name}
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
            <select onChange={(e) => setSubject(e.target.value)}>
              {subjects.map((subject, index) => (
                <option value={subject.name} key={index}>
                  {subject.name}
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
            <select onChange={(e) => setPattern(e.target.value)}>
              {patterns.map((pattern, index) => (
                <option value={pattern.name} key={index}>
                  {pattern.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tab Inputs */}
          <div className="tabs">
            {subjects.map((subject, index) => (
              <button
                key={index}
                onClick={handleChecked}
                value={subject.name}
                className={`button ${
                  active.includes(" " + subject.name) ? "activeButton" : ""
                }`}
              >
                {subject.name}
              </button>
            ))}
          </div>

          {/* Create Button */}
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

        {/* Main Image */}
        <div>
          {/* <div className="image">
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
          </div> */}

<div className="image">
          {!isWaiting && image ? (
            <img src={image} alt="AI generated image" />
          ) : isWaiting ? (
            <div className="image__placeholder">
              <Spinner animation="border" />
              <p>{message}</p>
            </div>
          ) : (
            <></>
          )}
        </div>

        {!isWaiting && url && (
        <p>
          {/* View&nbsp;<a href={url} target="_blank" rel="noreferrer">Metadata</a> */}
        </p>
      )}





          {/* Main Text */}
          {minting ? (
            <div>
              <br />
              <p>Minting block...</p>
            </div>
          ) : creating ? (
            <div>
              <br />
              <p>Your Artblock is almost ready...</p>
            </div>
          ) : (
            <div>
              <p>
                {name ? <>{name}&nbsp;</> : "Title"}{" "}
                <em>
                  &nbsp;"
                  {description ? <>{description}&nbsp;</> : "description"}"
                </em>
              </p>
              <p>
                &nbsp;{medium ? <>{medium}&nbsp;</> : "Medium, "}{" "}
                {style ? <>&nbsp;{style}&nbsp;-</> : "Style - "}{" "}
                {artist ? <>&nbsp;{artist}&nbsp;</> : "Artist"}{" "}
              </p>
              {/* <p>
                {" "}
                #{count}/10 &copy; {currentYear}{" "}
              </p> */}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail History */}
      <div className="thumbnails">
        {thumbs
          .map((item, index) => (
            <div className="thumbnail" key={index}>
              <img src={item[0]} alt="AI thumbnail" />
              <div>
                <p>
                  {item[1]}
                  
                </p>
                <p><em>"{item[2]}"</em></p>
              </div>

              {/* <p>
                View&nbsp;<a href={url}>Metadata</a>
              </p> */}
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

      {/* Local Storage */}
      <div className="thumbnails">
        {items
          .map((item, index) => (
            <div className="thumbnail" key={index}>
              <img src={item[0]} alt="AI thumbnail" />
              <p>
                View&nbsp;<a href={url}>Item</a>
              </p>
            </div>
          ))
          .reverse()}
      </div>
    </div>
  );
}

export default App;
