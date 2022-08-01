import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";

export default function User() {
  const [issuedAsset, setIssuedAsset] = useState([]);
  const [NFTs, setNFTs] = useState([]);

  useEffect(() => {
    console.log(localStorage);
    const listAssets = JSON.parse(localStorage["issuedAssets"]);
    setIssuedAsset(listAssets);
    const listNFT = JSON.parse(localStorage.getItem(issuedAsset));
    setNFTs(listNFT);
  }, []);

  useEffect(() => {
    const listNFT = JSON.parse(localStorage.getItem(issuedAsset));
    setNFTs(listNFT);
  }, [issuedAsset]);

  return (
    <Layout>
      <h3>Project Created</h3>
      <h4>{issuedAsset}</h4>
      {/* <h3>{JSON.parse(localStorage.getItem("issuedAssets"))}</h3> */}
      <h3>NFT Owned/Received</h3>
      <h4>{NFTs}</h4>
      <h4>Note: To improve - separate the list of NFT Ids to list</h4>
    </Layout>
  );
}
