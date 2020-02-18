import React, { Component } from "react"
import PropTypes from "prop-types"
import "./WelcomeBoard.css"

//Redux
import { connect } from "react-redux"

class WelcomeBoard extends Component {
  render() {
    const {
      user: {
        credentials: {
          //userId,
          handle,
          imageUrl
        }
      }
    } = this.props
    console.log(this.props.user)

    return (
      <div className="viewWelcomeBoard">
        <span className="textTitleWelcome">{`Welcome, ${handle}`}</span>
        <img className="avatarWelcome" src={imageUrl} alt="icon avatar" />
        <span className="textDesciptionWelcome">Let's start talking.</span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = {}

WelcomeBoard.propTypes = {
  user: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(WelcomeBoard)
