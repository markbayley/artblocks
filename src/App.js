import { useState, useEffect } from "react";
import { NFTStorage, File } from "nft.storage";
import { Buffer } from "buffer";
import { ethers } from "ethers";
import axios from "axios";

// Components
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

  const [image, setImage] = useState("");
  const [url, setURL] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [pattern, setPattern] = useState("");

  const [keyword, setKeyword] = useState("");

  const [message, setMessage] = useState("");
  // const [isWaiting, setIsWaiting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [mintingIndex, setMintingIndex] = useState(0);

  const [selectedStyle, setSelectedStyle] = useState("Expressionism");
  const [selectedColors, setSelectedColors] = useState([]);
  const [active, setActive] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Landscape");

  const [thumbs, setThumbs] = useState([]);

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
  };

  // Form Request
  const submitHandler = async (e) => {
    e.preventDefault();

    const imageData = createImage();

    const url = await uploadImage(imageData);

    await mintImage(url);

    setMintingIndex(thumbs.length);

    setMessage("");

    // e.target.reset();
    setKeyword([]);
    setActive([]);
  };

  const createImage = async () => {
    setIsCreating(true);
    setMessage("Generating Image...");

    const URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2`;

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
          selectedSubject +
          " " +
          title +
          " " +
          selectedStyle +
          " " +
          artist +
          " " +
          medium +
          " " +
          selectedColors +
          " " +
          pattern,

        options: { wait_for_model: true },
      }),
      responseType: "arraybuffer",
    });

    const type = response.headers["content-type"];
    const data = response.data;

    const base64data = Buffer.from(data).toString("base64");
    const img = `data:${type};base64,` + base64data;

    setImage(img);

    setMessage("Image Created...");
    setIsCreating(false);

    thumbs.push([
      img,
      title,
      description,
      artist,
      medium,
      keyword,
      pattern,
      selectedSubject,
      selectedColors,
      selectedStyle,
      url,
    ]);

    console.log("thumbs", thumbs);

    return data;
  };

  const uploadImage = async (imageData) => {
    setMessage("Creating Image...");
    // Create instance to NFT.Storage

    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });

    const blob = await (await fetch(image)).blob();
    const imageHash = await nftstorage.storeBlob(blob);
    console.log("blob:", blob);
    console.log("Image Hash:", imageHash);

    // Send request to store image
    setMessage("Sending request...");
    const { ipnft } = await nftstorage.store({
      // image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      image: blob,
      name: name,
      description: description,
      artist: artist,
      medium: medium,
      keyword: keyword,
      selectedSubject: selectedSubject,
      pattern: pattern,
      selectedColors: selectedColors,
      selectedStyle: selectedStyle,
    });

    // Save the URL
    setMessage("Saving the URL");

    const url = `https://ipfs.io/ipfs/${imageHash}/`;
    setURL(url);

    return url;
  };

  const mintImage = async (tokenURI) => {
    setMessage("Click 'Confirm' in Metamask...");

    const signer = await provider.getSigner();
    const transaction = await nft
      .connect(signer)
      .mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") });
    await transaction.wait();

    console.log("signer:", signer);
    console.log("transaction:", transaction);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation
        account={account}
        setAccount={setAccount}
        provider={provider}
      />
      <div className="provider">
        {" "}
        {provider ? "" : "Install MetaMask to Connect"}
      </div>

      <div className="form">
        <form onSubmit={submitHandler}>
          <InputFields
            setTitle={setTitle}
            setDescription={setDescription}
            setMedium={setMedium}
            setArtist={setArtist}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
          />

          <Keywords
            active={active}
            setActive={setActive}
            setPattern={setPattern}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            setKeyword={setKeyword}
          />

          <CreateButton setIsCreating={setIsCreating} isCreating={isCreating} />
        </form>

        <MainImage
          isCreating={isCreating}
          image={image}
          message={message}
          medium={medium}
          description={description}
          url={url}
          title={title}
        />
      </div>

      <Thumbnails
        url={url}
        thumbs={thumbs}
        isCreating={isCreating}
        image={image}
        mintingIndex={mintingIndex}
      />
    </div>
  );
}

export default App;
