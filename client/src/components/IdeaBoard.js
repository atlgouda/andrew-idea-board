import React, { Component } from 'react'
import axios from 'axios'
//npm i styled-components under client
import styled from 'styled-components'

//MAKE SURE TO USE BACKTICKS
const StyledIdea = styled.div`
  background-color: rgb(255, 255, 136);
  border: 1px solid black;
  width: 30vw;
  min-width: 100px;
  max-width: 200px;
  padding: 5%;
  margin: 10vh;
  min-height: 26vh;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  `
const StyledTitle = styled.div`
  text-align: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  font-weight: bold;
`
const StyledIdeaTitle = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 5vh;
  `
const StyledDescription = styled.div`
  border: 1px double blue;
  padding: 6px;
`
const StyledNewIdea = styled.div`
  background-color: blue;`

export default class IdeaBoard extends Component {
  state = {
    user: {},
    ideas: [],

  }


  getUser = async () => {
    const userId = this.props.match.params.userId
    const response = await axios.get(`/api/users/${userId}`)
    this.setState({
      user: response.data,
      ideas: response.data.ideas.reverse()
    })
  }

  componentDidMount = () => {
    this.getUser()
  }
  //new idea button
  handleNew = async () => {
    const userId = this.props.match.params.userId
    const newIdea = await axios.post(`/api/users/${userId}/ideas`)
    //new idea pop up
    await this.getUser()
  }
  //delete idea
  handleDelete = async (ideaId) => {
    const userId = this.props.match.params.userId
    await axios.delete(`/api/users/${userId}/ideas/${ideaId}`)
    await this.getUser()
  }

  //submit info put into new Idea
  handleChange = (event, i) => {
    //take it out
    const ideas = [...this.state.ideas]
    //change it
    ideas[i][event.target.name] = event.target.value
    //put it back
    this.setState({ ideas })
  }
  //updateidea when focus changes
  updateIdea = async (i) => {
    const userId = this.props.match.params.userId
    const updatedIdea = this.state.ideas[i]
    await axios.put(`/api/users/${userId}/ideas/${updatedIdea._id}`, updatedIdea)
  }

  render() {
    const ideasList = this.state.ideas.map((idea, i) => {
      return (
        //CHANGE DIVS TO STYLED DIVS FOR WHERE YOU WANT TO STYLE
        <StyledIdea key={i}>
          {/* //button to delete idea */}
          <div onClick={() => this.handleDelete(idea._id)}>X</div>
          <StyledIdeaTitle>
            <input type='text' name='title' value={idea.title}
              onChange={(event) => this.handleChange(event, i)}
              // update when focus leaves
              onBlur={() => this.updateIdea(i)} />
          </StyledIdeaTitle>
          <StyledDescription>
            <input type='text' name='description' value={idea.description}
              onChange={(event) => this.handleChange(event, i)}
              onBlur={() => this.updateIdea(i)} />
          </StyledDescription>
        </StyledIdea>
      )
    })
    return (
      <StyledTitle>
        <h1>Idea Board for {this.state.user.userName}</h1>
        <StyledNewIdea onClick={this.handleNew}>New Idea</StyledNewIdea>
        {ideasList}

      </StyledTitle>
    )
  }
}
