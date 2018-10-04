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
    ideas: response.data.ideas
   })
  }

  componentDidMount = () => {
    this.getUser()
  }

  render() {
    const ideasList = this.state.ideas.map( idea => {
      return (
    //CHANGE DIVS TO STYLED DIVS FOR WHERE YOU WANT TO STYLE
        <StyledIdea key={idea._id}>
      <StyledIdeaTitle>{idea.title}</StyledIdeaTitle>
      <StyledDescription>{idea.description}</StyledDescription>
      </StyledIdea>
      )
    })
    return (
      <StyledTitle>
        <h1>Idea Board for {this.state.user.userName}</h1>
      {ideasList}
      </StyledTitle>
    )
  }
}
