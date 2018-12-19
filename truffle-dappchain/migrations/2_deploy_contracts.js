const { writeFileSync, readFileSync } = require('fs')

const GameTokenDappChain = artifacts.require('GameTokenDappChain')
//const TokenTimelock = artifacts.require('TokenTimelockDappChain')

module.exports = (deployer, network, accounts) => {
  const gatewayAddress = readFileSync('../gateway_dappchain_address', 'utf-8')

  deployer.deploy(GameTokenDappChain, gatewayAddress).then(async () => {
    const GameTokenDappChainInstance = await GameTokenDappChain.deployed()
    console.log(`GameTokenDappChain deployed at address: ${GameTokenDappChainInstance.address}`)

    //const TokenTimelockContract = await deployer.deploy(TokenTimelock, GameTokenDappChainInstance.address)
    //const TokenTimelockInstance = await TokenTimelockContract.deployed()

    //console.log(`TokenTimelock deployed at address: ${TokenTimelockInstance.address}`)
    //console.log(`TokenTimelock transaction at hash: ${TokenTimelockContract.transactionHash}`)

    writeFileSync('../game_token_dappchain_address', GameTokenDappChainInstance.address)
    //writeFileSync('../token_timelock_dappchain_address', TokenTimelockInstance.address)
  })
}
