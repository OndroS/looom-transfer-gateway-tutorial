import React from 'react'

export default class SmartContract extends React.Component {
  render() {

      const view = (
          <div>
              {this.props && this.props.alertContent.show == true &&
              <div className={this.props.alertContent.type == 'error' ? "alert alert-danger alert-dismissible fade show" : "alert alert-success alert-dismissible fade show"} role="alert">
                  {this.props.alertContent.message}
                  <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              }
          </div>
      )

    return (
      <div className="card">
        <div className="card-body">
            {view}
            <h5 className="">Timelock Smart Contract</h5>
            <p className=""><strong>Deposited amount: </strong> 0 GTK</p>
            <p className=""><strong>Release time: </strong> 00:00</p>

            <div className="row">
                <div className="col-3">
                    <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Deposit</a>
                        <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Withdraw</a>
                    </div>
                </div>
                <div className="col-9">
                    <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                            TokenTimelock is a token holder contract that will allow a beneficiary to extract the tokens after a given release time.
                            <div className="input-group mb-3" style={{width: 350}}>
                                <input ref={(amountToSend) => this.amountToSend = amountToSend} type="text" className="form-control" placeholder="Deposit amount" aria-label="" aria-describedby="button-addon2"/>
                                <div className="input-group-append">
                                    <button
                                        disabled={this.props.disabled}
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => this.props.handleOnClick(this.amountToSend.value)}>
                                        Submit Deposit
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                            If time is up, you are allowed to withdraw your deposited tokens.
                            <div className="input-group mb-3" style={{width: 350}}>
                                <input ref={(amountToSend) => this.amountToSend = amountToSend} type="text" className="form-control" placeholder="Amount to withdraw" aria-label="" aria-describedby="button-addon2"/>
                                <div className="input-group-append">
                                    <button
                                        disabled={this.props.disabled}
                                        type="button"
                                        className="btn btn-outline-primary"
                                        onClick={() => this.props.handleOnClick(this.amountToSend.value)}>
                                        Submit Withdrawal
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
