import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message } from "semantic-ui-react";
import compiledFactory from "../../contracts/artifacts/LSP8MintableV2.sol/LSP8Mintable.json";
import Web3 from "web3";
import { Router } from "../../routes";

export default function RequestNew() {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMessage, setErrMessage] = useState("");

  async function onSubmit() {
    setLoading(true);
    const web3 = new Web3(window.ethereum);
    const accounts = await new web3.eth.getAccounts();
    const account = accounts[0];
    try {
      const contracts = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({
          data: compiledFactory.bytecode,
          arguments: [tokenName, tokenSymbol, account],
        })
        .send({ gas: "10000000", from: account });
      console.log("NFT contract: ", contracts);
      console.log(contracts._address);

      const LSP12IssuedAssets = [];
      LSP12IssuedAssets.push(contracts._address);
      localStorage.setItem("issuedAssets", JSON.stringify(LSP12IssuedAssets));

      Router.pushRoute("/");
    } catch (err) {
      console.log(err);
      setErrMessage(err);
    }
    setLoading(false);
  }
  return (
    <Layout>
      <h3>Create a project</h3>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <label>Project Name</label>
          <Input
            placeholder="Token Name"
            value={tokenName}
            onChange={(event) => {
              setTokenName(event.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Project Symbol</label>
          <Input
            placeholder="Token Symbol"
            value={tokenSymbol}
            onChange={(event) => {
              setTokenSymbol(event.target.value);
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
