import Caver, { SingleKeyring, ValueTransfer } from "caver-js";

// let keyring: SingleKeyring;
// export const initKeyring = (address: string, key: string) => {

// }

export const caver = new Caver("https://public-node-api.klaytnapi.com/v1/baobab");

export const send = async (_from: string, _to: string, _key: string, _value: number) => {
    const keyring: SingleKeyring = caver.wallet.keyring.create(_from, _key);
    caver.wallet.add(keyring);

    const value = caver.utils.toHex(caver.utils.convertToPeb(_value, "KLAY"));
    const gas = caver.utils.toHex(caver.utils.convertToPeb(30000, "peb"));

    const valueTransfer: ValueTransfer = caver.transaction.valueTransfer.create({
        from: _from,
        to: _to,
        value, gas
    });
    await valueTransfer.fillTransaction();
    await caver.wallet.sign(keyring.address, valueTransfer);
    
    const rlpEncoded = valueTransfer.getRLPEncoding();
    const receipt = await caver.rpc.klay.sendRawTransaction(rlpEncoded);
    
    console.log("26", receipt);
    

    return receipt;
}