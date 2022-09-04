import { contractABI, contractAddress } from './constants'

const moonBirdsContract = web3Instance => {
  console.log(contractAddress)
  return new web3Instance.eth.Contract(contractABI, contractAddress)
}

export default moonBirdsContract
