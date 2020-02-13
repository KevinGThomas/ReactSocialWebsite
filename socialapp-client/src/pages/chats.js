import React, { Component } from "react"
import ReactLoading from 'react-loading'
import ChatBoard from './../components/chat/ChatBoard'
import images from "../Images"
export class chats extends Component {
  render() {
    return (
      <div className="root">
        {/* Body */}
        <div className="body">
          <div className="viewListUser"> {this.renderListUser()}</div>
          <div className="viewBoard">
            <ChatBoard
              currentPeerUser={this.state.currentPeerUser}
              showToast={this.props.showToast}
            />
          </div>
        </div>

        {/* Loading */}
        {this.state.isLoading ? (
          <div className="viewLoading">
            <ReactLoading
              type={"spin"}
              color={"#203152"}
              height={"3%"}
              width={"3%"}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default chats
