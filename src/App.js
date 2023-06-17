import { useState, useEffect } from "react";
import Web3 from "web3";
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
  const [name, setName] = useState("Artblocks AI NFT Contract");
  const [image, setImage] = useState(null);
  const [url, setURL] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [powerPoints, setPowerPoints] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [style, setStyle] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [colour, setColour] = useState("");
  const [pattern, setPattern] = useState("");
  const [subject, setSubject] = useState("");
  const [keyword, setKeyword] = useState([]);

  const [formData, setFormData] = useState([]);
  const [message, setMessage] = useState("");

  const [isCreating, setIsCreating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mintingIndex, setMintingIndex] = useState(0);
  const [active, setActive] = useState([]);
  const [transactionHash, setTransactionHash] = useState();
  const [thumbs, setThumbs] = useState([]);

  //  localStorage.clear();
  useEffect(() => {
    if (thumbs.length > 0) {
      localStorage.setItem("thumbs", JSON.stringify(thumbs));
    }
    if (formData.title !== "") {
      localStorage.setItem("formData", JSON.stringify(formData));
    }
  }, [thumbs, formData]);

  useEffect(() => {
    const thumbs = JSON.parse(localStorage.getItem("thumbs"));

    if (thumbs) {
      setThumbs(thumbs);
    }

    const formData = JSON.parse(localStorage.getItem("formData", "style"));
    if (formData.style !== "") {
      setFormData({
        ...formData,
        style: formData.style,
        title: formData.title,
        description: formData.description,
        artist: formData.artist,
        medium: formData.medium,
        colour: formData.colour,
        pattern: formData.pattern,
        subject: formData.subject,
      });
    }
  }, []);

  // Load NFT Contract
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

  // Create Image Button
  const submitHandler = async (e) => {
    e.preventDefault();

    createImage();

    setPowerPoints(null);
    setURL(null);
    setMetaData(null);
  };

  // Upload & Mint NFT Button
  const mintHandler = async (e, imageData) => {
    e.preventDefault();

    await uploadImage(imageData);
    // await mintImage(url);
    // setIsMinting(false);
    setKeyword([]);
    setActive([]);
  };

  // Create Image Function
  const createImage = async () => {
    setIsCreating(true);
    setMessage("Generating AI Image...");
    // getURL(nft);
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
          mintingIndex +
          " " +
          account,
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
    return data;
  };

  // Upload Function
  const uploadImage = async (imageData, tokenURI) => {
    setIsMinting(true);
    setMintingIndex(thumbs.length + 1);
    setMessage("Requesting remote storage..");
    // Create instance to NFT.Storage

    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });

    const blob = await (await fetch(image)).blob();
    const imageHash = await nftstorage.storeBlob(blob);

    const url = `https://ipfs.io/ipfs/${imageHash}/`;

    setMessage("Click 'Confirm' in Metamask...");

    const signer = await provider.getSigner();

    const transaction = await nft
      .connect(signer)
      .mint(url, { value: ethers.utils.parseUnits("0.01", "ether") });
    setMessage("Minting " + `${"'" + description + "'"}` + "...");
    await transaction.wait();

    // setIsLoading(true);
    setMessage("Minted! Storing Data...");

    const hash = transaction.hash;
    setTransactionHash(hash);
    const powerPoints = hash.slice(64, 66);
    setPowerPoints(powerPoints);

    const date = `${new Date().getDate()}/${
      new Date().getMonth() + 1
    }/${new Date().getFullYear()}`;

    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      blob: blob,
      creator: account,
      name: name,
      description: description,
      contract: nft.address,
      hash: hash,
      owner: account,
      date: date,
      powerPoints: powerPoints,
      inputData: [
        title,
        description,
        artist,
        medium,
        keyword,
        pattern,
        subject,
        colour,
        style,
      ],
      imageURL: url,
    });

    setURL(url);
    const metaData = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setMetaData(metaData);

    const newItem = [
      {
        account: account,
        title: title,
        description: description,
        data: [
          title,
          description,
          artist,
          medium,
          keyword,
          pattern,
          subject,
          colour,
          style,
          powerPoints,
        ],
        url: url,
        hash: hash,
        contract: nft.address,
        metaData: metaData,
        date: date,
      },
    ];
    setMintingIndex(thumbs.length);
    setThumbs([...thumbs, ...newItem]);
    setIsMinting(false);
    setIsLoading(true);

    // setItems((prevArr) => ([...prevArr, newItem]));
    return url;
  };

  console.log("localStorage", localStorage);
  console.log("formData", formData);
  console.log("points", powerPoints);
  console.log("thumbs", thumbs);
  console.log("active", active);

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
            setSubject={setSubject}
            setMedium={setMedium}
            setStyle={setStyle}
            setColour={setColour}
            setArtist={setArtist}
            setPattern={setPattern}
            setFormData={setFormData}
            formData={formData}
            style={style}
            pattern={pattern}
            colour={colour}
            description={description}
            title={title}
            subject={subject}
            artist={artist}
            medium={medium}
            active={active}
            setActive={setActive}
            setKeyword={setKeyword}
            keyword={keyword}
          />

          {/* <Keywords
            subject={subject}
            active={active}
            setPattern={setPattern}
            setSubject={setSubject}
            setActive={setActive}
            setKeyword={setKeyword}
            formData={formData}
            setFormData={setFormData}
          /> */}

          <CreateButton
            isCreating={isCreating}
            isMinting={isMinting}
            image={image}
            mintHandler={mintHandler}
            url={url}
          />
        </form>

        <MainImage
          image={image}
          message={message}
          medium={medium}
          subject={subject}
          description={description}
          isMinting={isMinting}
          isCreating={isCreating}
          url={url}
          title={title}
          metaData={metaData}
          transactionHash={transactionHash}
          powerPoints={powerPoints}
        />
      </div>

      {account ? (
        <Thumbnails
          url={url}
          thumbs={thumbs}
          isCreating={isCreating}
          image={image}
          mintingIndex={mintingIndex}
          account={account}
          isMinting={isMinting}
          transactionHash={transactionHash}
          message={message}
          isLoading={isLoading}
        />
      ) : (
        <div className="heading">
          Connect to account to view minted Artblocks
        </div>
      )}
    </div>
  );
}

export default App;
