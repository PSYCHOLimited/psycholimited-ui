import React from "react";
import ethereum from "../ethereum";
import info from "./info";

export default function Button() {
  async function connect() {
    const chainId = 1;
    const idString = chainId.toString();
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x".concat(idString) }],
    });
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  return (
    <React.Fragment>
      {ethereum && (
        <button className="button-connect" onClick={connect}>
          {info()}
        </button>
      )}
      {!ethereum && (
        <a
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
          href="https://metamask.io/download.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          <button className="button-connect">Connect Wallet</button>
        </a>
      )}
    </React.Fragment>
  );
}
