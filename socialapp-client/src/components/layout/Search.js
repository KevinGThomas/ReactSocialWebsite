import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import PropTypes from "prop-types"
import { fade, makeStyles } from "@material-ui/core/styles"

// MUI

import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"

// Redux
import { connect } from "react-redux"
import { markNotificationsRead } from "../../redux/actions/userActions"
import axios from "axios"

const useStyles = makeStyles(theme => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}))

const Search = () => {
  const getUsers = request => {
    const value = {
      user: request
    }
    axios
      .post("/users", value)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.log("Failed: " + err)
        return err
      })
  }

  const classes = useStyles()

  const Change = event => {
    const { name, value, type, checked } = event.target
    const user = getUsers(value)
    //this.props.getUsers(value, this.props.history)
    console.log(value)
    console.log(user)
  }
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        onChange={Change}
        inputProps={{ "aria-label": "search" }}
      />
    </div>
  )
}
export default Search
