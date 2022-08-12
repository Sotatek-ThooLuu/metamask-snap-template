import {
  BIP44Node,
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from '@metamask/key-tree';
import { OnRpcRequestHandler } from '@metamask/snap-types';
import { getBalance, sendToken } from './caverHelper';

let account: BIP44Node;

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  switch (request.method) {
    case 'klay_getAddress':
      const coinNode = (await wallet.request({ method: 'snap_getBip44Entropy_8217' })) as JsonBIP44CoinTypeNode;
      const deriveCoinNode = await getBIP44AddressKeyDeriver(coinNode);
      account = await deriveCoinNode(0);
      return account.address;

    case 'klay_getBalance':
      return await getBalance(account.address);

    case 'klay_sendToken':
      if (!account) return false;

      const to = request.params['to'];
      const value = request.params['value'];
      const confirm = await wallet.request({
        method: 'snap_confirm',
        params: [{
          prompt: 'Confirm transaction',
          description: 'Please confirm transaction',
          textAreaContent: `To: ${to}\nValue: ${value} KLAY`
        }]
      });

      if (confirm) {
        await sendToken(account, to, value);
        return true;
      }
      return false;
    default:
      break;
  }
};
