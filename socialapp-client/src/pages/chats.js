import React, { Component } from "react"
import ReactLoading from "react-loading"
import PropTypes from "prop-types"
import { myFirestore } from "../MyFirebase"
import ChatBoard from "./../components/chat/ChatBoard"
import WelcomeBoard from "./../components/chat/WelcomeBoard"
import "./chats.css"

//Redux
import { connect } from "react-redux"

class chats extends Component {
  constructor(props) {
    super(props)
    this.listUser = []
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null
    }
    const {
      user: {
        credentials: { userId, handle, imageUrl }
      }
    } = this.props
    this.currentUserId = userId
    this.currentUserAvatar = imageUrl
    this.currentUserNickname = handle
  }

  componentDidMount() {
    this.getListUser()
  }

  getListUser = async () => {
    const result = await myFirestore.collection("users").get()
    if (result.docs.length > 0) {
      this.listUser = [...result.docs]
      this.setState({ isLoading: false })
    }
  }

  renderListUser = () => {
    if (this.listUser.length > 0) {
      let viewListUser = []
      this.listUser.forEach((item, index) => {
        if (item.data().userId !== this.currentUserId) {
          viewListUser.push(
            <button
              key={index}
              className={
                this.state.currentPeerUser &&
                this.state.currentPeerUser.id === item.data().userId
                  ? "viewWrapItemFocused"
                  : "viewWrapItem"
              }
              onClick={() => {
                this.setState({ currentPeerUser: item.data() })
                console.log(item.data())
              }}
            >
              <img
                className="viewAvatarItem"
                src={item.data().imageUrl}
                alt="icon avatar"
              />
              <div className="viewWrapContentItem">
                <span className="textItem">{`${item.data().handle}`}</span>
                <span className="textItem">{`${
                  item.data().bio
                    ? item.data().bio
                    : "Hello there! I am using SocialApp."
                }`}</span>
              </div>
            </button>
          )
        }
      })
      return viewListUser
    } else {
      return null
    }
  }

  render() {
    return (
      <div className="root">
        {/* Body */}
        <div className="body">
          <div className="viewListUser"> {this.renderListUser()}</div>
          <div className="viewBoard">
            {this.state.currentPeerUser ? (
              <ChatBoard
                currentPeerUser={this.state.currentPeerUser}
                showToast={this.props.showToast}
              />
            ) : (
              <WelcomeBoard
                currentUserNickname={this.currentUserHandle}
                currentUserAvatar={this.currentUserAvatar}
              />
            )}
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

const mapStateToProps = state => ({
  user: state.user
})

//const mapActionsToProps = { logoutUser, uploadImage }
const mapActionsToProps = {}

chats.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(chats)
