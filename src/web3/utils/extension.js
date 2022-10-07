import React, { useState } from "react";
import { ethers } from "ethers";
import IPSYCHOLimited from "../abi/IPSYCHOLimited.json";
import Owner from "../abi/Owner.json";
import Fee from "./fee";
import contract from "./address";
import ethereum from "./ethereum";
import info from "./connect/info";

export default function Extension() {
  const [avatarId, setAvatarId] = useState("");
  const [jsonMessage, setJsonMessage] = useState("Set Avatar Metadata");
  const [resetMessage, setResetMessage] = useState("Reset");
  const [jsonContent, setJsonContent] = useState("");
  var buttonInfo = info();

  if (ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setJsonMessage("Set Avatar Metadata");
      setResetMessage("Reset");
    });
  }

  async function setExtension() {
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
        if (jsonMessage === "Set Avatar Metadata") {
          var fee;
          const approved = await Auth.getApprovedOwner();
          const ownership = await Auth.owner();
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          const account = ethers.utils.getAddress(accounts[0]);
          if (approved === account || ownership === account) {
            fee = 0;
          } else {
            fee = await PSYCHOLimited.fee(1);
          }
          const transaction = await PSYCHOLimited.metadata(
            avatarId,
            jsonContent,
            { value: fee.toString() }
          );
          setJsonMessage("Setting Metadata...");
          await transaction.wait();
          setJsonMessage("Avatar Metadata Set");
        }
      } else {
        setJsonMessage("Connect To Interact");
      }
    } catch (e) {
      setJsonMessage("Cannot Set Metadata");
      return;
    }
  }

  async function reset() {
    try {
      if (ethereum && buttonInfo !== "Connect Wallet") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const PSYCHOLimited = new ethers.Contract(
          contract,
          IPSYCHOLimited.abi,
          signer
        );
        if (resetMessage === "Reset") {
          const fee = await PSYCHOLimited.fee(1);
          const transaction = await PSYCHOLimited.metadata(avatarId, "", {
            value: fee.toString(),
          });
          setResetMessage("Resetting...");
          await transaction.wait();
          setResetMessage("Avatar Has Reset");
        }
      } else {
        setResetMessage("Connect To Interact");
      }
    } catch (e) {
      setResetMessage("Cannot Reset");
      return;
    }
  }

  return (
    <React.Fragment>
      <button className="input-info input-info-extensions inner-subtract">
        Type an Avatar ID to Set Extension ({Fee()} ETH):
      </button>
      <input
        className="input-id"
        value={avatarId}
        onChange={(e) => setAvatarId(e.target.value)}
        placeholder="0"
      />
      <div className="extensions-container">
        <input
          className="input-extension"
          value={jsonContent}
          onChange={(e) => setJsonContent(e.target.value)}
          placeholder="Paste JSON Here"
        />
        <button className="button-set" onClick={setExtension}>
          {jsonMessage}
        </button>
        <button className="button-set no-margin" onClick={reset}>
          {resetMessage}
        </button>
      </div>
    </React.Fragment>
  );
}
