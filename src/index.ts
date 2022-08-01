import { OnRpcRequestHandler } from '@metamask/snap-types';
import { createAccount, getAccount, sign } from "./caverHelper";

const addr: string = "0xABB70823C20c977302C89197E6A87AC09D184d72";
const privateKey: string = "cfe490ba17d46c5aa7c995249c05ceac71e5bd3c0ca8c0c880b4b7f8ad4fe092";
const data: string = "data to sign";

export const onRpcRequest: OnRpcRequestHandler = async ({ origin, request }) => {
  switch (request.method) {
    case 'hello':
      const res = wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description:
              'This custom confirmation is just for display purposes.',
            textAreaContent:
              'But you can edit the snap source code to make it do something, if you want to!',
          },
        ],
      });

      if (res) {
        try { 
          const resSign = await sign(data, `0x${privateKey}`);
          console.log("27", resSign);
          
        } catch(err) { 
          console.error(err.message);
        };
      }
      
      return res;
    default:
      throw new Error('Method not found.');
  }
};
