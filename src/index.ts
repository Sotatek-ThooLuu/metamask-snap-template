import { OnRpcRequestHandler } from '@metamask/snap-types';
import { send } from './caverHelper';

const from: string = '0x4cE51d78E0Afe5baccb64C30Bd0A8651bF36e8BB';      // acc1
const to: string = '0xc7ec3eC37437eb4474F19B4f2F2f52d577Ab6ec5';        // acc2
const key: string = '0xc5309be41d382917f9fb5f1f075cd062409acf7c6b97357b5db9bca82ae18331';

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'send':      
      const sendValue = send(from, to, key, 1);
      return sendValue;
    default:
      throw new Error('Method not found.');
  }
};
