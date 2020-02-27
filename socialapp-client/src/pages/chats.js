import React, { Component } from "react"
import ReactLoading from "react-loading"
import PropTypes from "prop-types"
import { myFirestore } from "../MyFirebase"
import ChatBoard from "./../components/chat/ChatBoard"
import WelcomeBoard from "./../components/chat/WelcomeBoard"
import "./chats.css"
import images from "./../Images"
import moment from "moment"

//Redux
import { connect } from "react-redux"

class chats extends Component {
  constructor(props) {
    super(props)

    //console.log(props.user)
    this.state = {
      isLoading: true,
      isOpenDialogConfirmLogout: false,
      currentPeerUser: null
    }

    //this.currentUserId = props.userId
    //this.currentUserAvatar = props.imageUrl
    //this.currentUserNickname = props.handle
    //console.log(props.userId)
    this.listUser = []
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

  renderListUser = currentUserId => {
    if (this.listUser.length > 0) {
      let viewListUser = []
      //console.log(this.currentUserId)
      this.listUser.forEach((item, index) => {
        if (item.data().userId !== currentUserId) {
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
                //console.log(item.data())
              }}
            >
              <div className="img-header">
                <img
                  className="viewAvatarItem"
                  src={item.data().imageUrl}
                  alt="icon avatar"
                />
                {item.data().online ? (
                  <img
                    className="online"
                    src={images.green_circle}
                    alt="online"
                  />
                ) : (
                  <img
                    className="online"
                    src={images.grey_circle}
                    alt="offline"
                  />
                )}
              </div>
              <div className="viewWrapContentItem">
                <span className="textItem">{`${item.data().handle}`}</span>
                <span className="textItem">{`${
                  item.data().online
                    ? "online"
                    : item.data().last_active
                    ? "last seen " + moment(item.data().last_active).fromNow()
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
    const {
      user: {
        credentials: {
          userId
          // handle, imageUrl
        }
      }
    } = this.props
    return (
      <div className="root">
        {/* Body */}
        <div className="body">
          <div className="viewListUser"> {this.renderListUser(userId)}</div>
          <div className="viewBoard">
            {/*{console.log(this.state.user)} */}
            {this.state.currentPeerUser ? (
              <ChatBoard
                currentPeerUser={this.state.currentPeerUser}
                currentUserId={this.userId}
                // currentUserHandle={this.currentUserNickname}
                showToast={this.props.showToast}
              />
            ) : (
              <WelcomeBoard />
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

// const mapStateToProps = state => ({
//   user: state.user
// })

// //const mapActionsToProps = { logoutUser, uploadImage }
// const mapActionsToProps = {}

// chats.propTypes = {
//   user: PropTypes.object.isRequired
// }

// export default connect(mapStateToProps, mapActionsToProps)(chats)

const mapStateToProps = state => ({
  user: state.user
})

//const mapActionsToProps = { logoutUser, uploadImage }
const mapActionsToProps = {}

chats.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(chats)
