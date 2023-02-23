import { useEffect, useState } from "react";
import { ethers } from "ethers";
import ethereum from "./ethereum";

export default function Balance() {
	const [ethBalance, setEthBalance] = useState("0 ETH");

	useEffect(() => {
		const getBalance = async () => {
			if (ethereum) {
				const accounts = await window.ethereum.request({
					method: "eth_accounts"
				});
				if (accounts[0] != null) {
					const account = ethers.utils.getAddress(accounts[0]);
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const wei = await provider.getBalance(account);
					const eth = ethers.utils.formatEther(wei);
					setEthBalance(parseFloat(eth).toFixed(5).concat(" ETH"));
				} else {
					setEthBalance("0 ETH");
				}
			}
		};
		getBalance();
	});

	return ethBalance;
}
