const Caver = require('caver-js');

const getCaverVersion = async () => {
  const caver = new Caver('https://public-node-api.klaytnapi.com/v1/baobab');
  const caverVersion = await caver.rpc.klay.getClientVersion();
  console.log(`---caver version:`, caverVersion);
  return caverVersion;
};

const getBlockNumber = async () => {
  const caver = new Caver('https://public-node-api.klaytnapi.com/v1/baobab');
  const blockNumber = await caver.rpc.klay.getBlockNumber();
  console.log(`-----blockNumber`, blockNumber.toString());
  return blockNumber;
};

module.exports = {
  getCaverVersion,
  getBlockNumber,
};
