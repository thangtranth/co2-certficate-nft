import Head from "next/head";
import React from "react";
import { Container } from "semantic-ui-react";
import Header from "./Header";
export default (props) => {
  return (
    <Container>
      <Head>
        <link
          async
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        <title>CO2 NFT Certificate GENERATOR</title>
        <meta
          name="CO2 NFT Certificate GENERATOR"
          content="CO2 NFT Certificate GENERATOR"
        />
      </Head>
      <Header />
      {props.children}
    </Container>
  );
};
