import { OnRpcRequestHandler } from '@metamask/snap-types';
import { send } from './caverHelper';

const from: string = '0x4cE51d78E0Afe5baccb64C30Bd0A8651bF36e8BB';                        // acc1
const key: string = '0xc5309be41d382917f9fb5f1f075cd062409acf7c6b97357b5db9bca82ae18331'; // klaytn private key
// const to: string = '0xc7ec3eC37437eb4474F19B4f2F2f52d577Ab6ec5';                          // acc2

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'send':
      const to = request['to'];
      const value = request['value'];

      const confirm = await wallet.request({
        method: 'snap_confirm',
        params: [{
          prompt: `Hello, ${origin}`,
          description: 'Please confirm transaction',
          textAreaContent: `To: ${to}\nValue: ${value} KLAY`
        }]
      });

      if (confirm) {
        const sendValue = send(from, to, key, value);
        return sendValue;
      }

      return confirm;
    default:
      throw new Error('Method not found.');
  }
};
