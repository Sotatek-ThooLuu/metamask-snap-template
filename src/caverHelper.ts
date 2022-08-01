import Caver from "caver-js"

export const caver = new Caver("https://public-node-api.klaytnapi.com/v1/baobab");

export const getAccount = async (addr: string) => await caver.klay.accountCreated(addr);

export const createAccount = (addr: string, key: string) => caver.klay.accounts.createWithAccountKey(addr, key);

export const sign = async (data: string, privateKey: string): Promise<Object> => await caver.klay.accounts.sign(data, privateKey);