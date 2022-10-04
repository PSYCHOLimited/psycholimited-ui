import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ethereum from "../ethereum";

export default function Info() {
  const [buttonInfo, setButtonInfo] = useState();

  useEffect(() => {
    const getAccount = async () => {
      if (ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts[0] == null) {
          setButtonInfo("Connect Wallet");
        } else {
          var fullAccount = ethers.utils.getAddress(accounts[0]);
          var beginAccount = fullAccount.substring(0, 5); // => 0x000
          var endAccount = fullAccount.substring(fullAccount.length - 4); // => 0000
          beginAccount = beginAccount.concat("..."); // => 0x000...
          var account = beginAccount.concat(endAccount); // => 0x000...0000
          setButtonInfo(account);
        }
      }
    };
    getAccount();
  });

  if (ethereum) {
    window.ethereum.on("accountsChanged", function (accounts) {
      setButtonInfo(accounts[0]);
    });
  }

  return buttonInfo;
}
