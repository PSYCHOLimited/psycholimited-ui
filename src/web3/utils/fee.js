import { useState, useEffect } from "react";
import { ethers } from "ethers";
import IPSYCHOLimited from "../abi/IPSYCHOLimited.json";
import contract from "./address";
import ethereum from "./ethereum";

export default function Fee() {
	const [fee, setFee] = useState("0");

	useEffect(() => {
		const getFee = async () => {
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const PSYCHOLimited = new ethers.Contract(
					contract,
					IPSYCHOLimited.abi,
					provider
				);
				const fee = await PSYCHOLimited.fee(1);
				const ethFee = ethers.utils.formatEther(fee.toString());
				setFee(~~ethFee);
			}
		};
		getFee();
	});

	return fee;
}
