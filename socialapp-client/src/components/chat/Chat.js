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

const styles = theme => ({
  ...theme.content
})

export class Chat extends Component {
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
              component={Link}
              to="/chats"
            >
              Chat
            </Button>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="body2" align="center">
            Login to Chat
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

Chat.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Chat))
