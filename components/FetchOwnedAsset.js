// Imports
import Web3 from "web3";
import { ERC725 } from "@erc725/erc725.js";
import erc725schema from "@erc725/erc725.js/schemas/LSP3UniversalProfileMetadata.json";
import LSP8 from "@lukso/lsp-smart-contracts/artifacts/LSP8IdentifiableDigitalAsset.json";
import { useEffect, useState } from "react";

export default function FetchOwnedAssets() {
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    console.log("111111");
    fetchOwnedAssets().then((ownedAssets) => {
      console.log(ownedAssets);
      setAssets(ownedAssets);
    });
    console.log(assets);
  });
  // Sample Addresses
  //   const SAMPLE_PROFILE_ADDRESS = "0xa907c1904c22DFd37FF56c1f3c3d795682539196";
  const SAMPLE_PROFILE_ADDRESS = "0xa9f2DbD516049D6f49123251841D55dB4e633cDb";

  // Setup Web3
  const web3 = new Web3("https://rpc.l14.lukso.network");

  /*
   * Fetch the @param's Universal Profile's
   * LSP5 data for received assets
   *
   * @param address of Universal Profile
   * @return string JSON or custom error
   */
  async function fetchReceivedAssets() {
    try {
      const address = "0xa9f2DbD516049D6f49123251841D55dB4e633cDb";
      // Network & Storage
      const RPC_ENDPOINT = "https://rpc.l14.lukso.network";
      const IPFS_GATEWAY = "https://cloudflare-ipfs.com/ipfs/";

      // Parameters for ERC725 Instance
      const provider = new Web3.providers.HttpProvider(RPC_ENDPOINT);
      const config = { ipfsGateway: IPFS_GATEWAY };

      const profile = new ERC725(erc725schema, address, provider, config);
      console.log("111112");
      const result = await profile.fetchData("LSP5ReceivedAssets[]");
      console.log("111113");
      return result.value;
    } catch (error) {
      console.log("ERRRRR");
      console.log(error);
      return console.log("This is not an ERC725 Contract");
    }
  }

  /*
   * Return an array of assets
   * that are owned by the
   * Universal Profile.
   *
   * @param owner of the Universal Profile
   * @return address[] of owned assets
   */
  async function fetchOwnedAssets(owner) {
    const digitalAssets = await fetchReceivedAssets(owner);
    const ownedAssets = [];

    for (let i = 0; i < digitalAssets.length; i++) {
      // Create instance of the asset to check owner balance
      const LSP8Contract = new web3.eth.Contract(LSP8.abi, digitalAssets[i]);

      const isCurrentOwner = await LSP8Contract.methods.balanceOf(owner).call();
      if (isCurrentOwner > 0) {
        ownedAssets[ownedAssets.length] = digitalAssets[i];
      }
    }
    return ownedAssets;
  }

  return <h3>{assets}</h3>;
}
