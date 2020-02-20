import React, { Component } from "react"
import Grid from "@material-ui/core/Grid"
import PropTypes from "prop-types"

import Scream from "../components/scream/Scream"
import Profile from "../components/profile/Profile"
import Chat from "../components/chat/Chat"
import PushNotification from "../components/notif/PushNotification"
import ScreamSkeleton from "../util/ScreamSkeleton"

//Redux
import { connect } from "react-redux"
import { getScreams } from "../redux/actions/dataActions"



class home extends Component {
  componentDidMount() {
    this.props.getScreams()
  }
  render() {
    const { screams, loading } = this.props.data
    let recentScreamsMarkup = !loading ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    )
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
          <br />
          <br />
          <Chat />
          <br />
          <br />
          <PushNotification/>
        </Grid>
        <Grid item sm={8} xs={12}></Grid>
      </Grid>
    )
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  data: state.data
})

export default connect(mapStateToProps, { getScreams })(home)
