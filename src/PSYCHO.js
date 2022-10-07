import React, { Fragment } from "react";
import Fee from "./web3/utils/fee";
import Account from "./web3/utils/account";
import Generate from "./web3/utils/mint";
import Extension from "./web3/utils/extension";
import Metadata from "./web3/utils/metadata";
import logo from "./media/PSYCHO.gif";
import audio from "./media/audio.mp3";
import "./css/PSYCHO.css";

function PSYCHO() {
  return (
    <Fragment>
      <div className="PSYCHO-center">
        <header className="PSYCHO-header">
          <div className="PSYCHO-header-font">
            Ethereum (Block #15672124)
            0xBabcD60567D66E7C1e443C0F7a0426381908787f
          </div>
          <img src={logo} className="PSYCHO-logo" alt="logo" />
          <div className="PSYCHO-header-logo-font">Limited</div>
        </header>
        <div className="PSYCHO-content">
          <audio
            controls
            autoPlay
            className="PSYCHO-music-player"
            src={audio}
            type="audio/mpeg"
          >
            Your browser does not support the audio element.
          </audio>
          <h1>Abstract</h1>
          <div className="PSYCHO-info">
            PSYCHO Limited is a network of 1101 fashionable avatars. Owners are
            considered part of the PSYCHO net and can set unique json for their
            avatars. Compared to minting on the OpenSea Shared Storefront
            contract, there are only 1101 ERC721 tokens with an emphasis on art
            and fashion. The project is made for collaboration between the
            owners and program.
          </div>
          <div className="PSYCHO-divider" />
          <h1>Attributes</h1>
          <div className="PSYCHO-info">
            Avatars have one attribute, the block number. The more bottleneck
            there is during minting, the less potential there is for rare
            avatars to be created. The rarest avatars are distributed the
            farthest from any blocks.
          </div>
          <div className="PSYCHO-divider" />
          <h1>Account</h1>
          <div className="PSYCHO-account">{Account()}</div>
          <div className="PSYCHO-divider" />
          <h1>Create Avatar</h1>
          <div className="PSYCHO-info">
            Connect your wallet and generate to mint an avatar. Limited to a
            total supply of 1101 for {Fee()} ETH per avatar.
          </div>
          <div className="PSYCHO-info">{Generate()}</div>
          <div className="PSYCHO-divider" />
          <h1>Metadata</h1>
          <div className="PSYCHO-info">
            Use this tool to read and view avatar media. Type an ID to load
            content.
          </div>
          {Metadata()}
          <div className="PSYCHO-divider" />
          <h1>Set Avatar Metadata</h1>
          <div className="PSYCHO-info">
            Paste the json snippet into the input field below to set the image,
            animation_url, and more. You cannot set the properties for the name,
            description, or attributes because they are perminent. Check desired
            marketplaces and social media for supported file types.
            <br />
            <br />
            <div className="margin-bottom-5px">
              Example JSON input for an image on IPFS looks like:
            </div>
            <code>
              "image":"ipfs://bafybeidob7iaynjg6h6c3igqnac2qnprlzsfatybuqkxhcizcgpfowwgm4"
            </code>
            <br />
            <br />
            <div className="margin-bottom-5px">
              Click to copy the image metadata template:
            </div>
            <code
              className="cursor"
              onClick={() => {
                navigator.clipboard.writeText(
                  '"image":"add_direct_link_to_image_here"'
                );
              }}
            >
              "image":"add_direct_link_to_image_here"
            </code>
            <br />
            <br />
            You may use any hosting, including IPFS, Dropbox, Drive, or others.
          </div>
          <div className="PSYCHO-info">{Extension()}</div>
          <div className="PSYCHO-divider" />
          <h1>Developer</h1>
          <div className="PSYCHO-info">
            This web3 app cannot be tampered with and exists on IPFS. Pin the
            content identifier to support this UI. The smart contract ABI for UI
            building and the contract source code are provided below.
          </div>
          <h2>Source Code</h2>
          <div className="PSYCHO-info">
            <div className="margin-bottom-3px">Smart Contract:</div>
            <a
              className="margin-bottom"
              href="https://etherscan.io/address/0xBabcD60567D66E7C1e443C0F7a0426381908787f"
              target="_blank"
              rel="noreferrer"
            >
              0xBabcD60567D66E7C1e443C0F7a0426381908787f
            </a>
            <br />
            <br />
            <div className="margin-bottom-3px">User Interface:</div>
            <div
              className="copy"
              onClick={() => {
                navigator.clipboard.writeText(
                  "git clone git@github.com:psycholimited/psycholimited-ui"
                );
              }}
            >
              git clone git@github.com:psycholimited/psycholimited-ui
            </div>
            <br />
            <div className="margin-bottom-3px">Network GIF Image: </div>
            <a
              href="https://nftstorage.link/ipfs/bafybeidob7iaynjg6h6c3igqnac2qnprlzsfatybuqkxhcizcgpfowwgm4"
              target="_blank"
              rel="noreferrer"
            >
              bafybeidob7iaynjg6h6c3igqnac2qnprlzsfatybuqkxhcizcgpfowwgm4
            </a>
            <br />
            <br />
            <div className="margin-bottom-3px">Network glTF Model: </div>
            <a
              href="https://nftstorage.link/ipfs/bafybeiavfdgoywozugwlbafrorlmgxz4degqbuifiqycmiz5twiftbmsnu"
              target="_blank"
              rel="noreferrer"
            >
              bafybeiavfdgoywozugwlbafrorlmgxz4degqbuifiqycmiz5twiftbmsnu
            </a>
          </div>
          <div className="PSYCHO-divider" />
          <div className="PSYCHO-info footer">AGPL-3.0-only</div>
        </div>
      </div>
    </Fragment>
  );
}

export default PSYCHO;
