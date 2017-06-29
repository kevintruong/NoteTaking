import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import fetch from '../api/Fetch'

import Header from '../components/Header'
import Input from '../components/Input'
import Button from '../components/Button'

class NewNoteBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: ''
    }
    this.changeUsername = e => this._changeUsername(e.target.value)
    this.changePassword = e => this._changePassword(e.target.value)
    this.changeConfirmPassword = e => this._changeConfirmPassword(e.target.value)
    this.handleKeyPress = e => this._handleKeyPress(e.key)
    this.register = e => this._register()
  }
  _changeUsername (value) {
    this.setState({
      username: value
    })
  }
  _changePassword (value) {
    this.setState({
      password: value
    })
  }
  _changeConfirmPassword (value) {
    this.setState({
      confirmPassword: value
    })
  }
  _handleKeyPress (key) {
    if (key === 'Enter') {
      this._register()
    }
  }
  async _register () {
    const { username, password, confirmPassword } = this.state
    if (password !== confirmPassword) return
    if (!username || !password) return
    const res = await fetch.post('/user/register', this.state)
    if (res.status === 201) {
      Router.push({
        pathname: '/login'
      })
    }
  }
  render () {
    const { username, password, confirmPassword } = this.state
    return (
      <div style={styles.login}>
        <Header />
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <Input type="text" value={username} onChange={this.changeUsername} />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <Input type="password" value={password} onChange={this.changePassword} />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Confirm Password:</label>
          <Input
            type="password"
            value={confirmPassword}
            onChange={this.changeConfirmPassword}
            onKeyPress={this.handleKeyPress}
          />
        </div>
        <Button
          style={styles.button}
          onClick={this.register}
          type={Button.TYPE.PRIMARY}
          size={Button.SIZE.LARGE}
        >
          Register
        </Button>
        <Link prefetch href='/login'>
          <Button style={styles.button}>Login</Button>
        </Link>
      </div>
    )
  }
}

const styles = {
  login: {
    width: '50%',
    margin: 'auto',
    marginTop: '20px'
  },
  button: {
    marginTop: '10px',
    marginRight: '10px'
  }
}

export default NewNoteBook
