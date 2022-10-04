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
  const [jsonMessage, setJsonMessage] = useState("Set JSON For Avatar ");
  const [resetMessage, setResetMessage] = useState("Reset Avatar ");
  const [jsonContent, setJsonContent] = useState("");
  var buttonInfo = info();

  function avatar(id) {
    if (id === "") {
      return 0;
    } else {
      return id;
    }
  }

  if (ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setJsonMessage("Set JSON For Avatar ");
      setResetMessage("Reset Avatar ");
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
        if (jsonMessage === "Set JSON For Avatar ") {
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
          setJsonMessage("Configuring Avatar ");
          await transaction.wait();
          setJsonMessage("Configured Avatar ");
        }
      } else {
        setJsonMessage("Connect To Interact With Avatar ");
      }
    } catch (e) {
      setJsonMessage("Cannot Set JSON For Avatar ");
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
        if (resetMessage === "Reset Avatar ") {
          const fee = await PSYCHOLimited.fee(1);
          const transaction = await PSYCHOLimited.metadata(avatarId, "", {
            value: fee.toString(),
          });
          setResetMessage("Configuring Avatar ");
          await transaction.wait();
          setResetMessage("Configured Avatar ");
        }
      } else {
        setResetMessage("Connect To Interact With Avatar ");
      }
    } catch (e) {
      setResetMessage("Cannot Reset Avatar ");
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
          placeholder="Paste JSON Extension Here"
        />
        <button className="button-set" onClick={setExtension}>
          {jsonMessage.concat(avatar(avatarId))}
        </button>
        <button className="button-set no-margin" onClick={reset}>
          {resetMessage.concat(avatar(avatarId))}
        </button>
      </div>
    </React.Fragment>
  );
}
