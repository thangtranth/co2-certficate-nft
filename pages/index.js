import { LSPFactory } from "@lukso/lsp-factory.js";
import React, { useState } from "react";
import Web3 from "web3";
import Layout from "../components/Layout";
import { Link } from "../routes";

export default function Home() {
  const chainID = 2828;

  const [UPaddress, setUPAddress] = useState();
  const [manangerAddress, setManangerAddress] = useState();

  async function createUniversalProfile() {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const lspFactory = new LSPFactory(window.ethereum, { chainID });
    try {
      const deployedContracts = await lspFactory.UniversalProfile.deploy({
        controllerAddresses: [address],
        lsp3Profile: {
          name: "My Universal Profile",
          description: "My Cool Universal Profile",
          tags: ["Public Profile"],
          links: [
            {
              title: "My Website",
              url: "https://my-website.com",
            },
          ],
        },
      });
      const myUPAddress = deployedContracts.LSP0ERC725Account.address;
      const managerAddress = deployedContracts.LSP6KeyManager.address;
      console.log("UP deploy contract: ", deployedContracts);
      console.log("my Universal Profile address: ", myUPAddress);
      setUPAddress(myUPAddress);
      setManangerAddress(managerAddress);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout>
      <p>
        Please use Metamask and config to LP16, the product has not yet
        supported Universal Profile.
      </p>
      <h3>1. Please create an C02 Certificate NFT Collection</h3>
      <Link route="/collections/new">
        <button>Create Collection</button>
      </Link>
      <h3>2. You can mint the C02 Certificate NFTs now</h3>
      <Link route="/collections/mint">
        <button>Mint</button>
      </Link>
      <h3>You could create an Unniversal Profile Account</h3>
      <button onClick={() => createUniversalProfile()}>
        Create UP Account
      </button>
      <h3>UP Account: {UPaddress}</h3>
    </Layout>
  );
}
