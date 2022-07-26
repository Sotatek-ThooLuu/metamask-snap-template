// const Caver = require('caver-js');
const { getCaverVersion, getBlockNumber } = require('./caverHelper');

module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'test_caver_js': {
      const caverVersion = await getCaverVersion();
      const blockNumber = await getBlockNumber();
      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Test caver-js`,
            description: 'Get caver version & latest block number:',
            textAreaContent: `+ Caver version: ${caverVersion}\n+ Block number: ${blockNumber}`,
          },
        ],
      });
    }
    default:
      throw new Error('Method not found.');
  }
};
