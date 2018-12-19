import Web3 from 'web3'

export default class EthGatewayManager {
  static async createAsync() {
    const browserWeb3 = new Web3(window.web3.currentProvider)
    const networkId = await browserWeb3.eth.net.getId()
    const contract = new browserWeb3.eth.Contract(
      GATEWAY_JSON.abi,
      GATEWAY_JSON.networks[networkId].address
    )

    return new EthGatewayManager(contract)
  }

  constructor(contract) {
    this.contract = contract
  }

  async withdrawTokenAsync(address, amount, sig, contractAddress) {
    return await this.contract.methods
      .withdrawERC20(amount, sig, contractAddress)
      .send({ from: address, gas: '189362' })
  }
}
