import React from 'react'

export default class Wallet extends React.Component {
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
      <div className="">
        <div className="">
            {view}
          <br/>
            <p className=""><strong>Token balance: </strong> {this.props.balance} GTK</p>
          <div className="input-group mb-3" style={{width: 350}}>
            <input ref={(amountToSend) => this.amountToSend = amountToSend} type="text" className="form-control" placeholder="Token amount" aria-label="" aria-describedby="button-addon2"/>

            <div className="input-group-append">
              <button
                  disabled={this.props.disabled}
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => this.props.handleOnClick(this.amountToSend.value) /*console.log(this.amountToSend.value)*/}>
                  {this.props.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
