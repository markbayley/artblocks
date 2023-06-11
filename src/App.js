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
  const [metaData, setMetaData] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [artist, setArtist] = useState("");
  const [medium, setMedium] = useState("");
  const [pattern, setPattern] = useState("");
  const [keyword, setKeyword] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("Expressionism");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("Landscape");

  const [message, setMessage] = useState("");
  // const [isWaiting, setIsWaiting] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [mintingIndex, setMintingIndex] = useState(0);

  const [active, setActive] = useState([]);
  const [transaction, setTransaction] = useState();
  const [thumbs, setThumbs] = useState([]);


  useEffect(() => {
    if (thumbs.length > 0) {
    localStorage.setItem('thumbs', JSON.stringify(thumbs));
    }
    setMintingIndex(thumbs.length);
  }, [thumbs]);

  useEffect(() => {
    const thumbs = JSON.parse(localStorage.getItem('thumbs'));
    if (thumbs) {
     setThumbs(thumbs);
    }
}, []);



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
    console.log(nft.address);
  };


  // Form Request
  const submitHandler = async (e) => {
    e.preventDefault();
    setURL(null);
    setMetaData(null);
    const imageData = createImage();
  
 
  };


  const mintHandler = async (e, imageData) => {
    e.preventDefault();


    const url = await uploadImage(imageData);
   
    await mintImage(url);

 
    setIsMinting(false);
 
    setMessage("");

    // e.target.reset();
    setKeyword([]);
    setActive([]);
  };

  const createImage = async () => {
    setIsCreating(true);
    setMessage("Generating Image...");
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
    return data;
   
  };


  const uploadImage = async (imageData) => {
    setIsMinting(true);
    console.log("isMinting", isMinting);
    setMessage("Saving Image Remotely...");
    // Create instance to NFT.Storage

    const nftstorage = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_API_KEY,
    });

    const blob = await (await fetch(image)).blob();
    const imageHash = await nftstorage.storeBlob(blob);
    console.log("blob:", blob);
    console.log("Image Hash:", imageHash);

    const url = `https://ipfs.io/ipfs/${imageHash}/`;

    // Send request to store image
    setMessage("Storing Image Details...");
    const { ipnft } = await nftstorage.store({
      image: new File([imageData], "image.jpeg", { type: "image/jpeg" }),
      blob: blob,
      account: account,
      name: name,
      description: description,
      artist: artist,
      medium: medium,
      keyword: keyword,
      pattern: pattern,
      selectedSubject: selectedSubject,
      selectedColors: selectedColors,
      selectedStyle: selectedStyle,
      url: url,
      transaction: transaction,
      contract: nft.address,
    });
     console.log("nft.address", nft.address);
    // const status = await nftstorage.check('bafyreihzgvzbwi7hklznod44nu36kfl4a2fymgwah5rxwnvnq4ydx7mwb4')
    // console.log("status", status);

    // Save the URL
    setMessage("Saving the URL");

    // await createImage(url); // Pass the URL to createImage
    setURL(url);
    const metaData = `https://ipfs.io/ipfs/${ipnft}/metadata.json`;
    setMetaData(metaData);

    const newThumb = ([
      account,
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
      transaction,
      metaData,
    ]);

    const newItem = [
      {
      account: account,
      name: name,
      description: description,
      artist: artist,
      medium: medium,
      keyword: keyword,
      pattern: pattern,
      selectedSubject: selectedSubject,
      selectedColors: selectedColors,
      selectedStyle: selectedStyle,
      url: url,
      }
    ];


    
    setThumbs([...thumbs, newThumb]);
   
    // setItems((prevArr) => ([...prevArr, newItem]));

    


    return url;

  };

  

  const mintImage = async (tokenURI) => {

    console.log("tokenURI:", tokenURI);
    setMessage("Click 'Confirm' in Metamask to Mint...");

    const signer = await provider.getSigner();
    const transaction = await nft
      .connect(signer)
      .mint(tokenURI, { value: ethers.utils.parseUnits("1", "ether") });
    await transaction.wait();
   
    
  
    console.log("signer:", signer);
    // console.log("transaction:", transaction);
    console.log("transaction.hash:", transaction.hash); 
    const hash = transaction.hash;
    setTransaction(hash)
    uploadImage(transaction);
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
<div style={{display: "flex", width: "100%", justifyContent: "space-between"}}>
          <CreateButton isCreating={isCreating} />

          <input onClick={mintHandler}
      type="submit"

      value={isMinting ? "Minting Art..." : "Mint"}
      className={ isMinting ? "waitingButton" : !image || url ? "disabledButton" : ""}
    ></input>
    </div>
       
        </form>
        <MainImage
          isCreating={isCreating}
          isMinting={isMinting}
          image={image}
          message={message}
          medium={medium}
          description={description}
          url={url}
          title={title}
          metaData={metaData}
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
          transaction={transaction}

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
