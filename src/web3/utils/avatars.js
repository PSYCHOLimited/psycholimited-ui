import { useEffect, useState } from "react";
import { ethers } from "ethers";
import IERC721 from "../abi/IERC721.json";
import contract from "./address";
import ethereum from "./ethereum";

export default function Avatars() {
	const [avatarBalance, setAvatarBalance] = useState("0 PSYCHO");

	useEffect(() => {
		const getBalance = async () => {
			if (ethereum) {
				const accounts = await window.ethereum.request({
					method: "eth_accounts"
				});
				if (accounts[0] != null) {
					const account = ethers.utils.getAddress(accounts[0]);
					const provider = new ethers.providers.Web3Provider(window.ethereum);
					const PSYCHOLimited = new ethers.Contract(
						contract,
						IERC721.abi,
						provider
					);
					const totalBalance = await PSYCHOLimited.balanceOf(account);
					setAvatarBalance(totalBalance.toString().concat(" PSYCHO"));
				} else {
					setAvatarBalance("0 PSYCHO");
				}
			}
		};
		getBalance();
	});

	return avatarBalance;
}
