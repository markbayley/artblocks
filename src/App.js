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
import Thumbnails from "./components/Thumbnails";
import CreateButton from "./components/CreateButton";
import Keywords from "./components/Keywords";
import MainImage from "./components/MainImage";
import InputFields from "./components/InputFields";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState(null);

  const [name, setName] = useState("");

  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [colour, setColour] = useState("");
  const [pattern, setPattern] = useState("");
  const [subject, setSubject] = useState("");
  const [keyword, setKeyword] = useState([]);
  const [count, setCount] = useState(0);

  const [message, setMessage] = useState("");
  const [isWaiting, setIsWaiting] = useState(false);

  const [creating, setCreating] = useState(false);
  const [minting, setMinting] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const [active, setActive] = useState([]);
  const [thumbs, setThumbs] = useState([]);

  // Local Storage
  const storedItems = JSON.parse(localStorage.getItem("items"));
  const [items, setItems] = useState(storedItems);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();

    const nft = new ethers.Contract(
      config[network.chainId].nft.address,
      NFT,
      provider
    );
    setNFT(nft);

    const name = await nft.name();
    console.log("name", name);
  };

  // Form Request
  const submitHandler = async (e) => {
    e.preventDefault();

    setIsWaiting(true);

    const imageData = createImage();
    const url = await uploadImage(imageData);

    await mintImage(url);

    setMessage("");
    setMessage("success!");
    setCount(count + 1);
    // e.target.reset();
    setKeyword([]);
    setActive([]);
    setIsWaiting(false);
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
          title +
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
      title,
      description,
      style,
      artist,
      medium,
      colour,
      keyword,
      pattern,
      count,
      subject,
    ]);

    setThumbs(thumbs);
    console.log("thumbs", thumbs);

    setItems(thumbs);
    console.log("items", items);

    setCreating(false);

    console.log(localStorage);

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
    setMessage("Sending request...");
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
      pattern: pattern,
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
    setMessage("Click 'Confirm' in Metamask...");

    const signer = await provider.getSigner();
    const transaction = await nft
      .connect(signer)
      .mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") });
    await transaction.wait();

    console.log("transaction", transaction);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

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
      name: "Figure",
    },
    {
      name: "Fruit Bowl",
    },
  ];

  const words = [
    { key: ["trees", "farm", "sky", "lake", "hills", "clouds"] },
    { key: ["face", "smile", "dress", "jewels", "mouth", "family"] },
    { key: ["boats", "fish", "beach", "cliffs", "island", "sand"] },
    { key: ["man", "woman", "child", "slumped", "arms", "thin"] },
    { key: ["apple", "pear", "fresh", "banana", "colorful", "wooden"] },
    { key: ["street", "beach", "face", "woman", "colorful", "hills"] },
  ];

  // Toggle Buttons
  const handleChecked = (e) => {
    e.preventDefault();

    setActive((prevArr) =>
      prevArr.includes(e.target.value)
        ? [...prevArr.pop()]
        : [...prevArr, " " + e.target.value]
    );

    setKeyword((prevArr) => [...prevArr, " " + e.target.value]);

  };

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />

      <div className="form">
        <form onSubmit={submitHandler}>
          <InputFields
            setTitle={setTitle}
            setDescription={setDescription}
            setSubject={setSubject}
            setMedium={setMedium}
            setStyle={setStyle}
            setColour={setColour}
            setArtist={setArtist}
            setPattern={setPattern}
            subjects={subjects}
            styles={styles}
            mediums={mediums}
            patterns={patterns}
            artists={artists}
            colours={colours}
          />

          <Keywords
            words={words}
            subject={subject}
            active={active}
            handleChecked={handleChecked}
          />

          <CreateButton
            image={image}
            creating={creating}
            isWaitng={isWaiting}
          />
        </form>

        <MainImage
          isWaiting={isWaiting}
          image={image}
          message={message}
          style={style}
          medium={medium}
          artist={artist}
          subject={subject}
          description={description}
          minting={minting}
          creating={creating}
          url={url}
          title={title}
        />
      </div>

      <Thumbnails
        url={url}
        items={items}
        thumbs={thumbs}
        isWaiting={isWaiting}
        image={image}
        message={message}
        style={style}
        medium={medium}
        artist={artist}
        subject={subject}
        description={description}
        minting={minting}
        creating={creating}
        title={title}
      />
    </div>
  );
}

export default App;
