import React, { Component } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import { Link } from "react-router-dom"
import ChatSkeleton from "../../util/ChatSkeleton"

// MUI stuff
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import Paper from "@material-ui/core/Paper"

//Redux
import { connect } from "react-redux"
import { logoutUser, uploadImage } from "../../redux/actions/userActions"

import {
  askForPermissionToReceiveNotifications,
  sendNotifications
} from "./../../push-notification"

const styles = theme => ({
  ...theme.content
})

export class PushNotification extends Component {
  render() {
    const {
      classes,
      user: {
        //credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              onClick={askForPermissionToReceiveNotifications}
              //onClick={sendNotifications}
            >
              Receive Notifications
            </Button>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            Login to request for notifications
          </Typography>
        </Paper>
      )
    ) : (
      <ChatSkeleton />
    )

    return profileMarkup
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapActionsToProps = { logoutUser, uploadImage }

PushNotification.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PushNotification))
