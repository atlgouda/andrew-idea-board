import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class Login extends Component {
  state = {
      users: [],
      newUser: {}
  }
  componentDidMount = async () => {
    const response = await axios.get('/api/users')
    //make it so data returns as users
    this.setState({ users: response.data})
  }

  //
  handleChange = (event) => {
    //take it
    const newUser = { ...this.state.newUser }
    //change it
    newUser[event.target.name] = event.target.value
    //put it back
    this.setState({ newUser })
  }
  //push into API/Database
  handleSubmit = async (event) => {
    //prevent page from reloading
    event.preventDefault()
    const response = await axios.post('/api/users', this.state.newUser)
    //push response.data into array
    const users = [...this.state.users]
    users.push(response.data)
    this.setState({ users })
  }


    render() {
      //get users out of state and map through it
        const usersList = this.state.users.map((user, i) => {
            return (
            <div>
            <Link to={`/users/${user._id}`}
            key={i}
            >Name: {user.userName}
            </Link>
            </div>
            )
        })
    return (
      <div>
        <h1>Login Page</h1>
        {usersList}
        <form onSubmit={this.handleSubmit}>
          <input type='text' 
          name='userName'
          value={this.state.newUser.userName}
          onChange={this.handleChange} />
          <input type='submit'
          value='Create New User' />
        </form>
      </div>
    )
  }
}
