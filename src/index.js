// const Caver = require('caver-js');
const { getCaverVersion } = require('./caverHelper');

module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello': {
      const fees = JSON.parse(await getFees());
      const baseFee = parseFloat(fees.currentBaseFee);
      const safeLow = Math.ceil(baseFee + parseFloat(fees.safeLow));
      const standard = Math.ceil(baseFee + parseFloat(fees.standard));
      const fastest = Math.ceil(baseFee + parseFloat(fees.fastest));
      const caverVersion = await getCaverVersion();

      return wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Gas Fees`,
            description: 'Current Gas Fees from etherchain.org:',
            textAreaContent: `Low: ${safeLow}\nAverage: ${standard}\nHigh: ${fastest}\nCaver version: ${caverVersion}`,
          },
        ],
      });
      // return wallet.request({
      //   method: 'snap_confirm',
      //   params: [
      //     {
      //       prompt: `Hello, ${origin}!`,
      //       description:
      //         'This custom confirmation is just for display purposes.',
      //       textAreaContent:
      //         'But you can edit the snap source code to make it do something, if you want to!',
      //     },
      //   ],
      // });
    }
    default:
      throw new Error('Method not found.');
  }
};

async function getFees() {
  const response = await fetch('https://www.etherchain.org/api/gasPriceOracle');
  const caverVersion = await getCaverVersion();
  console.log(caverVersion);
  return response.text();
}
