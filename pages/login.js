import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import { Router } from "../routes";

export default function Login() {
  const onLogin = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(accounts);

    if (accounts.length) {
      console.log("Success login");
      Router.pushRoute("/");
    } else {
      console.log("No account was selected");
    }
  };

  return (
    <div>
      <h3>Please login using Metamask or Universal Profile extension</h3>
      <Button onClick={onLogin}>Connect</Button>
    </div>
  );
}
