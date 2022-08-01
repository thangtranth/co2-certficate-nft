import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Web3 from "web3";
import compiledFactory from "../../contracts/artifacts/LSP8MintableV2.sol/LSP8Mintable.json";
import { Router } from "../../routes";

export default function BatchMint() {
  const [collectionAddress, setCollectionAddress] = useState("");
  const [numberNFTs, setNumberNFTs] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  async function onSubmit() {
    setLoading(true);
    console.log(collectionAddress, numberNFTs);
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];

    const lsp8IdentifiableDigitalAssetContract = new web3.eth.Contract(
      compiledFactory.abi,
      collectionAddress
    );

    let listTokenIds = [];
    let paddedTokenId;
    for (let i = 0; i < numberNFTs; i++) {
      paddedTokenId = web3.utils.padRight(
        web3.utils.stringToHex(i.toString()),
        64
      );
      listTokenIds.push(paddedTokenId);
    }

    console.log("list Token Ids: ", listTokenIds);

    console.log(lsp8IdentifiableDigitalAssetContract);
    localStorage.setItem(collectionAddress, JSON.stringify(listTokenIds));
    try {
      const receipt = await lsp8IdentifiableDigitalAssetContract.methods
        .mintBatch(account, listTokenIds, true, "0x")
        .send({ from: account });
      console.log(receipt);
      console.log("Successfully mint");
    } catch (err) {
      console.log(err);
      setErrMessage(err);
    }

    const tokenIds = await lsp8IdentifiableDigitalAssetContract.methods
      .tokenIdsOf(account)
      .call();

    console.log("List of token Ids: ", tokenIds);
    Router.pushRoute("/");
    setLoading(false);
  }
  return (
    <Layout>
      <h3>Mint the C02 Certificate</h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>
            Collection Address (Please paste the collection address you created
            in Step 1)
          </label>
          <Input
            placeholder="Collection Address"
            value={collectionAddress}
            onChange={(event) => {
              setCollectionAddress(event.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Number of CO2 Certificate NFTs</label>
          <Input
            placeholder="Number of NFTs"
            value={numberNFTs}
            onChange={(event) => {
              setNumberNFTs(event.target.value);
            }}
          />
        </Form.Field>
        <Message error header="Oops" content={errMessage} />
        <Button loading={loading} primary type="submit">
          Submit
        </Button>
      </Form>
    </Layout>
  );
}
