import React from 'react'
import Wallet from './wallet'
import SmartContract from './smartcontract'

export default class DAppChainTokens extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      account: '0x',
      ethAccount: '0x',
      allowing: false,
      alertContent: {
          show: false,
          type: 'x',
          message: 'y'
      },
      sCalertContent: {
          show: false,
          type: 'x',
          message: 'y'
      }
    }
  }

  async componentWillMount() {
    this.props.dcGatewayManager.onTokenWithdrawal(async event => {
      alert(`Token ${event.value.toNumber()} ready for withdraw, check Ethereum Gateway`)
      await this.updateUI()
    })

    await this.updateUI()
  }

  async updateUI() {
    const ethAccount = await this.props.ethAccountManager.getCurrentAccountAsync()
    const account = this.props.dcAccountManager.getCurrentAccount()
    const balance = await this.props.dcTokenManager.getBalanceOfUserAsync(account)
    const mapping = await this.props.dcAccountManager.getAddressMappingAsync(ethAccount)

    this.setState({ account, ethAccount, mapping, balance })
  }

  async allowToWithdraw(amount) {
    this.setState({ allowing: true })
    await this.props.dcTokenManager.approveAsync(this.state.account, amount)

    try {
      await this.props.dcGatewayManager.withdrawTokenAsync(
        amount,
        this.props.dcTokenManager.getContractAddress()
      )

      this.setState({alertContent: {show: true, type: 'success', message: 'Processing allowance'}})
    } catch (err) {
      if (err.message.indexOf('pending') > -1) {
        //alert('Pending withdraw exists, check Ethereum Gateway')
        this.setState({alertContent: {show: true, type: 'success', message: 'Pending withdraw exists, check Ethereum Gateway'}})
      } else {
        console.error(err)
      }
    }

    this.setState({ allowing: false })

    await this.updateUI()
  }

  async depostiToContract(amount) {

  }

  async withdrawFromContract() {

  }

  render() {

    const wallet = (
      <Wallet
        alertContent={this.state.alertContent}
        balance={this.state.balance}
        action="Allow Withdraw"
        handleOnClick={(amountToSend) => this.allowToWithdraw(amountToSend)}
        disabled={this.state.sending}
      />
    )
  /*
    const smartcontract = (
        <SmartContract
            alertContent={this.state.sCalertContent}
            balance={this.state.balance}
            handleOnClick={(amountToSend) => this.depostiToContract(amountToSend)}
            disabled={this.state.sending}
        />
    )
*/
    const view = !this.state.mapping ? (
      <p>Please sign your user first</p>
    ) : this.state.balance > 0 ? (
      wallet
    ) : (
      <p>No balance deposited on DAppChain yet</p>
    )

    return (
      <div>
        <h4>DAppChain Available Token</h4>
        <div className="">
          <div>{view}</div>
            {/*<hr/>
          <div>{smartcontract}</div>*/}
        </div>
      </div>
    )
  }
}
