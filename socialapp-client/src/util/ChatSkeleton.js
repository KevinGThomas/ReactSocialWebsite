import React from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"

// MUI
import Paper from "@material-ui/core/Paper"

const styles = theme => ({
  ...theme.content,
  handle: {
    height: 20,
    backgroundColor: theme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px auto"
  },
  fullLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10
  },
  halfLine: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10
  }
})

const ChatSkeleton = props => {
  const { classes } = props
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
      <div className={classes.handle} />
        <hr />
      </div>
    </Paper>
  )
}

ChatSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ChatSkeleton)
