import React, { Component } from "react"

import withStyles from "@material-ui/core/styles/withStyles"
import PropTypes from "prop-types"
import AppIcon from "../images/site_logo.png"

import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

//Redux
import { connect } from "react-redux"
import { forgotPassword } from "../redux/actions/userActions"

const styles = theme => ({
  ...theme.content
})

class forgot extends Component {
  constructor() {
    super()
    this.state = {
      email: "",
      errors: {}
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
  }
  handleSubmit = event => {
    event.preventDefault()
    const userData = {
      email: this.state.email
    }
    this.props.forgotPassword(userData, this.props.history)
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props
    const { errors } = this.state
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="logo" className={classes.image} />
          <Typography variant="h3" className={classes.pageTitle}>
            Forgot Password
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Send password reset link
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    )
  }
}

forgot.propTypes = {
  classes: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  forgotPassword
}

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(forgot))
