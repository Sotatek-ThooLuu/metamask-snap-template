import Caver from "caver-js";

export const caver = new Caver("https://public-node-api.klaytnapi.com/v1/baobab");

export const sign = async (message: string, address: string) => await caver.klay.sign(message, address);