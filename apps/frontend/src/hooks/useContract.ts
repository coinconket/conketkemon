import { useWeb3React } from '@web3-react/core';
import { notification } from 'antd';
import Web3 from 'web3';
import { AbiItem, toBN, toWei } from 'web3-utils';
import contractABI from '../configurations/contracts/TokenContractABI';

const conKetContractAddress = '0xD461B07e3d3040D9eD4E77837d6De87538F9b32f';
const receiverAddress = '0x45d8253c7980d5718C5Fa3626d446886Fd857CfE';

export default function useConKetContract() {
  const { library, account } = useWeb3React();

  const sendToken = async function (amount: string) {
    try {
      const web3 = library as unknown as Web3;

      //TODO: Cache contract instance creation.
      const contractInstance = new web3.eth.Contract(
        contractABI as unknown as AbiItem,
        conKetContractAddress,
        {
          from: account || '',
        }
      );
      const weiBalance = await contractInstance.methods
        .balanceOf(account)
        .call();
      // Dont use toWei if your token decimals is different than 18.
      const weiAmount = toWei(amount);
      if (toBN(weiBalance).lt(toBN(weiAmount))) {
        notification.warn({
          placement: 'bottomRight',
          message: 'Not enough CONKET',
          description: 'You can buy more CONKET here',
          onClick: () => {
            console.log('Notification Clicked!');
          },
        });
        return;
      }
      await contractInstance.methods
        .transfer(receiverAddress, weiAmount)
        .send();
    } catch (error) {
      notification.error({
        placement: 'bottomRight',
        message: 'Error',
        description: (error as any).message,
        onClick: () => {
          console.log('Notification Clicked!');
        },
      });
      console.log(error);
    }
  };

  const getBalance = async function (account: string) {
    try {
      const web3 = library as unknown as Web3;
      const instance = new web3.eth.Contract(
        contractABI as unknown as AbiItem,
        conKetContractAddress
      );
      return await instance.methods.balanceOf(account).call();
    } catch (error) {
      console.log(error);
    }
  };

  return { sendToken, getBalance };
}
