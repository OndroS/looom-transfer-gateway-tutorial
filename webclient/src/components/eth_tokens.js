import React from 'react'
import Wallet from './wallet'

export default class EthTokens extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      account: '0x',
      mapping: null,
      sending: false,
      balance: 0,
      alertContent: {
        show: false,
        type: 'x',
        message: 'y'
      }
    }
  }

  async componentWillMount() {
    await this.updateUI()
  }

  async updateUI() {
    const account = await this.props.ethAccountManager.getCurrentAccountAsync()
    const balance = await this.props.ethTokenManager.getBalanceOfUserAsync(account)
    const mapping = await this.props.dcAccountManager.getAddressMappingAsync(account)

    this.setState({ account, balance, mapping })
  }

  async sendToDAppChain(amount) {
    this.setState({ sending: true })

    try {
      await this.props.ethTokenManager.depositTokenOnGateway(this.state.account, amount)
      this.setState({alertContent: {show: true, type: 'success', message: 'The amount will be available on DappChain, check DAppChain '}})
    } catch (err) {
      console.log('Transaction failed or denied by user')
      this.setState({alertContent: {show: true, type: 'error', message: 'Transaction failed or denied by user'}})

    }

    this.setState({ sending: false })
    await this.updateUI()
  }

  render() {
    const wallet = (
      <Wallet
        alertContent={this.state.alertContent}
        balance={this.state.balance}
        action="Send to DAppChain"
        handleOnClick={(amountToSend) => this.sendToDAppChain(amountToSend)}
        disabled={this.state.sending}
      />
    )

    const view = !this.state.mapping ? (
      <p>Please sign your user first</p>
    ) : this.state.balance > 0 ? (
      wallet
    ) : (
      <p>No tokens available</p>
    )

    return (
      <div>
        <h4>Ethereum Network Owned Tokens</h4>
        <div className="">
          <div>{view}</div>
        </div>
      </div>
    )
  }
}
