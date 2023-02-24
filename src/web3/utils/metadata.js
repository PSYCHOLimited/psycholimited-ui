import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import IERC721Metadata from "../abi/IERC721Metadata.json";
import contract from "./address";
import ethereum from "./ethereum";
import base64 from "./base64";
import model from "../../media/PSYCHO.glb";

export default function Metadata() {
	const [avatarId, setAvatarId] = useState("");
	const [idMetadata, setIdMetadata] = useState("");
	const [imageURI, setImageURI] = useState("");
	const [animationURI, setAnimationURI] = useState("");

	useEffect(() => {
		const setMetadata = async () => {
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const ERC721Metadata = new ethers.Contract(
					contract,
					IERC721Metadata.abi,
					provider
				);
				var id;
				var metadata;
				if (avatarId === "") {
					id = 1;
				} else {
					id = avatarId;
				}
				const data = await ERC721Metadata.tokenURI(id);
				async function getData(id) {
					const raw = base64(data);
					const json = JSON.stringify(JSON.parse(raw), null, "\t");
					return json;
				}
				if (avatarId === "") {
					metadata = await getData(1);
					setIdMetadata(metadata);
				} else if (data === "INVALID_ID") {
					metadata = `{ "name": "", "description": "", "image": "", "animation_url": "" }`;
					setIdMetadata(metadata);
				} else {
					metadata = await getData(id);
					setIdMetadata(metadata);
				}
			}
		};
		setMetadata();

		async function getData(id, abi) {
			const data = await abi.tokenURI(id);
			const raw = base64(data);
			if (data === "INVALID_ID") {
				return "INVALID_ID";
			} else {
				const rawJson = JSON.stringify(JSON.parse(raw), null, "\t");
				const json = JSON.parse(rawJson);
				return json;
			}
		}

		const setImage = async () => {
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const ERC721Metadata = new ethers.Contract(
					contract,
					IERC721Metadata.abi,
					provider
				);
				var id;
				if (avatarId === "") {
					id = 1;
				} else {
					id = avatarId;
				}
				var json = await getData(id, ERC721Metadata);
				var image = json["image"];
				var link;
				if (image != null) {
					if (image.startsWith("ipfs")) {
						link = "https://nftstorage.link/ipfs/".concat(image.substring(7));
					} else if (image.startsWith("http")) {
						link = image;
					} else {
						link =
							"https://nftstorage.link/ipfs/bafkreiedsq6thm636ofmsb4hkhzx2jcarnlca6lj6twjxm67ru4ndp4y3u";
					}
				} else {
					link =
						"https://nftstorage.link/ipfs/bafkreiedsq6thm636ofmsb4hkhzx2jcarnlca6lj6twjxm67ru4ndp4y3u";
				}
				setImageURI(link);
			}
		};
		setImage();

		const setAnimation = async () => {
			if (ethereum) {
				const provider = new ethers.providers.Web3Provider(window.ethereum);
				const ERC721Metadata = new ethers.Contract(
					contract,
					IERC721Metadata.abi,
					provider
				);
				var id;
				if (avatarId === "") {
					id = 1;
				} else {
					id = avatarId;
				}
				var json = await getData(id, ERC721Metadata);
				var animation_url = json["animation_url"];
				var link;
				if (animation_url != null) {
					if (animation_url.startsWith("ipfs")) {
						link = "https://nftstorage.link/ipfs/".concat(
							animation_url.substring(7)
						);
					} else if (animation_url.startsWith("http")) {
						link = animation_url;
					} else {
						link = model;
					}
				} else {
					link = model;
				}
				setAnimationURI(link);
			}
		};
		setAnimation();

		const setOfflineData = async () => {
			if (!ethereum) {
				setIdMetadata(
					`{ "name": "", "description": "", "image": "", "animation_url": "" }`
				);
				setImageURI(
					"https://nftstorage.link/ipfs/bafkreiedsq6thm636ofmsb4hkhzx2jcarnlca6lj6twjxm67ru4ndp4y3u"
				);
				setAnimationURI(model);
			}
		};
		setOfflineData();
	});

	return (
		<React.Fragment>
			<button className="input-info">Type an Avatar ID to View Content:</button>
			<input
				className="input-id"
				value={avatarId}
				onChange={(e) => setAvatarId(e.target.value)}
				placeholder="1"
			/>
			<div className="metadata-container">
				<div className="data-wrap">{idMetadata}</div>
				<div>
					<img className="avatar-image" src={imageURI} alt="avatar" />
				</div>
			</div>
			<h2>VR/AR</h2>
			<div className="PSYCHO-info">
				By default each avatar points to the network emblem (482.5 KB) and can
				load into augmented reality. VR/AR models can be set using a glTF
				file format for the "animation" argument of metadata (COMING SOON).
			</div>
			<model-viewer
				src={animationURI}
				ar
				ar-modes="webxr scene-viewer quick-look"
				camera-orbit="0deg 90deg"
				camera-controls
				touch-action="pan-y"
			/>
		</React.Fragment>
	);
}
