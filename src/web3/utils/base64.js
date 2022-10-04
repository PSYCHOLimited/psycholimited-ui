import { Buffer } from "buffer";

export default function base64(tokenURI) {
  var data = Buffer.from(tokenURI.substring(29), "base64").toString();
  return data;
}
