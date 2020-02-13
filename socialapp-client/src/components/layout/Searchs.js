import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types"

// MUI
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import IconButton from "@material-ui/core/IconButton"
import Tooltip from "@material-ui/core/Tooltip"
import Typography from "@material-ui/core/Typography"
import Badge from "@material-ui/core/Badge"

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications"
import FavoriteIcon from "@material-ui/icons/Favorite"
import ChatIcon from "@material-ui/icons/Chat"

// Redux
import { connect } from "react-redux"
import { getUsers } from "../../redux/actions/dataActions"

class Searchs extends Component {
  state = {
    anchorEl: null,
    text: ""
  }
  handleOpen = event => {
    this.setState({ anchorEl: event.target })
  }
  handleClose = () => {
    this.setState({ anchorEl: null })
  }
  handleChange = event => {
    this.setState({ text: event.value })
  }
  onMenuOpened = event => {
    let users = event.value //this.props.users
    //let unreadNotificationsIds = this.props.notifications
    //  .map(not => not.notificationId)
    this.props.getUsers(users)
  }
  render() {
    //const notifications = this.props.notifications
    //console.log(notifications)
    const anchorEl = this.state.anchorEl
    const users = this.props.users

    //dayjs.extend(relativeTime)
    const {} = this.props

    let notificationsIcon
    if (1 == 1) {
      1 == 1
        ? (notificationsIcon = <NotificationsIcon />)
        : (notificationsIcon = <NotificationsIcon />)
    } else {
      notificationsIcon = <NotificationsIcon />
    }

    let notificationsMarkup =
      1 == 1 ? (
        users.map(not => {
          const iconColor = "primary"

          return (
            <MenuItem key={not.createdAt} onClick={this.handleClose}>
              <Typography
                component={Link}
                color="default"
                variant="body1"
                to={`/users/${not.handle}`}
              ></Typography>
            </MenuItem>
          )
        })
      ) : (
        <MenuItem onClick={this.handleClose}>No users found</MenuItem>
      )
    return (
      <Fragment>
        <Tooltip placement="top" title="Notifications">
          <IconButton
            aria-owns={anchorEl ? "simple-menu" : undefined}
            aria-haspopup="true"
            onClick={this.handleOpen}
          >
            {notificationsIcon}
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          onEntered={this.onMenuOpened}
        >
          {notificationsMarkup}
        </Menu>
      </Fragment>
    )
  }
}

Searchs.propTypes = {
  getUsers: PropTypes.func.isRequired
  //notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  //searchs: state.user.searchs
})

export default connect(mapStateToProps, { getUsers })(Searchs)
