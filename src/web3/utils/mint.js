import React, { useState } from "react";
import { ethers } from "ethers";
import IPSYCHOLimited from "../abi/IPSYCHOLimited.json";
import Owner from "../abi/Owner.json";
import contract from "./address";
import ethereum from "./ethereum";
import info from "./connect/info";

export default function Mint() {
  const [message, setMessage] = useState("Generate");
  var buttonInfo = info();

  if (ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setMessage("Generate");
    });
  }

  async function mint() {
    try {
      if (ethereum && buttonInfo !== "Connect Wallet") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const PSYCHOLimited = new ethers.Contract(
          contract,
          IPSYCHOLimited.abi,
          signer
        );
        const Auth = new ethers.Contract(contract, Owner.abi, signer);
        if (message === "Generate") {
          const stock = await PSYCHOLimited.stock();
          const stockString = stock.toString();
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          const account = ethers.utils.getAddress(accounts[0]);
          const approved = await Auth.getApprovedOwner();
          const ownership = await Auth.owner();
          if (
            stockString !== "0" ||
            approved === account ||
            ownership === account
          ) {
            var fee;
            if (approved === account || ownership === account) {
              fee = 0;
            } else {
              fee = await PSYCHOLimited.fee(1);
            }
            const transaction = await PSYCHOLimited.mint(1, {
              value: fee.toString(),
            });
            setMessage("Generating...");
            await transaction.wait();
            setMessage("Generated");
          } else {
            setMessage("Come Back Later");
          }
        }
      } else {
        setMessage("Wallet Not Connected");
      }
    } catch (e) {
      setMessage("Cannot Generate");
      return;
    }
  }

  return (
    <React.Fragment>
      <button className="button-generate" onClick={mint}>
        {message}
      </button>
    </React.Fragment>
  );
}
