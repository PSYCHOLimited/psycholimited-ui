import React, { useState } from "react";
import { ethers } from "ethers";
import IPSYCHOLimited from "../abi/IPSYCHOLimited.json";
import Owner from "../abi/Operator.json";
import Fee from "./fee";
import contract from "./address";
import ethereum from "./ethereum";
import info from "./connect/info";

export default function Extension() {
	const [avatarId, setAvatarId] = useState("");
	const [urlMessage, setUrlMessage] = useState("Set Avatar Image");
	const [resetMessage, setResetMessage] = useState("Reset");
	const [urlContent, setUrlContent] = useState("");
	var buttonInfo = info();

	if (ethereum) {
		window.ethereum.on("accountsChanged", function (accounts) {
			setUrlMessage("Set Avatar Image");
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
				if (urlMessage === "Set Avatar Image") {
					var fee;
					const operator = await Auth.operator();
					const ownership = await Auth.owner();
					const accounts = await window.ethereum.request({
						method: "eth_accounts"
					});
					const account = ethers.utils.getAddress(accounts[0]);
					if (operator === account || ownership === account) {
						fee = 0;
					} else {
						fee = await PSYCHOLimited.fee(1);
					}
					const transaction = await PSYCHOLimited.metadata(
						avatarId,
						`"${urlContent}"`,
						"",
						{ value: fee.toString() }
					);
					setUrlMessage("Setting Image...");
					await transaction.wait();
					setUrlMessage("Avatar Image Has Been Set");
				}
			} else {
				setUrlMessage("Connect To Interact");
			}
		} catch (e) {
			setUrlMessage("Cannot Set Image");
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
					const transaction = await PSYCHOLimited.metadata(avatarId, "", "", {
						value: fee.toString()
					});
					setResetMessage("Resetting...");
					await transaction.wait();
					setResetMessage("Avatar Has Been Reset");
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
					value={urlContent}
					onChange={(e) => setUrlContent(e.target.value)}
					placeholder="Paste Image URL Here"
				/>
				<button className="button-small" onClick={setExtension}>
					{urlMessage}
				</button>
				<button className="button-small no-margin" onClick={reset}>
					{resetMessage}
				</button>
			</div>
		</React.Fragment>
	);
}
