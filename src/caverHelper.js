const Caver = require('caver-js');

const getCaverVersion = async () => {
  const caver = new Caver('https://public-node-api.klaytnapi.com/v1/baobab');
  const caverVersion = await caver.rpc.klay.getClientVersion();
  return caverVersion;
};

const getBlockNumber = async () => {
  const caver = new Caver('https://public-node-api.klaytnapi.com/v1/baobab');
  const blockNumber = await caver.rpc.klay.getBlockNumber();
  return caver.utils.hexToNumber(blockNumber);
};

module.exports = {
  getCaverVersion,
  getBlockNumber,
};
