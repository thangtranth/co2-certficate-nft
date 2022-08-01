import React, { useState, useEffect } from "react";
import { Button, Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  const [hasMetamask, setHasMetamask] = useState(false);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState();

  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetamask(true);
    }
  });

  async function connect() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAddress(accounts[0]);
        setConnected(ethereum.isConnected());
        console.log("Success connect");
      } catch (e) {
        console.log(e);
      }
    }
  }
  return (
    <Menu style={{ marginTop: "10px" }}>
      <Link route="/">
        <a className="item">CO2 Certificate NFT</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/user">
          <a className="item">User Profile</a>
        </Link>
        {hasMetamask ? (
          !connected ? (
            <Button primary onClick={connect} className="item">
              Connect Wallet
            </Button>
          ) : (
            <Button primary>{address}</Button>
          )
        ) : (
          // )
          <Button primary>Please install Metamask</Button>
        )}
      </Menu.Menu>
    </Menu>
  );
};
