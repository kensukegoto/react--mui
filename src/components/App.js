import React,{ Component } from "react"
import { Header, Footer } from "./Layouts"
import Exercises from "./Exercises"
import {
  muscles,
  exercises
} from "../store"

export default class extends Component {

  state = {
    exercises,
    category: "",
    exercise : {}
  }

  getExercisesByMuscles(){
  
    return Object.entries(this.state.exercises.reduce((exercises,exercise) => {
        const { muscles } = exercise
        exercises[muscles] = exercises[muscles]
          ? [...exercises[muscles],exercise]
          : [exercise]
        return exercises
      },{})
    )
  }

  handleCategorySelected = category => {
    this.setState({
      category
    })
  }
  handleExerciseSelected = id => {
    this.setState(({exercises})=>({
      exercise: exercises.find(ex => ex.id === id)
    }))

  }

  handleExerciseCreate = exercise => {
    this.setState(({exercises})=>({
      exercises: [
        ...exercises,
        exercise
      ]
    }))
  }

  handleExerciseDelete = id => {
    this.setState(({ exercises }) => ({
      exercises: exercises.filter(ex => ex.id !== id)
    }))
  }

  render(){

    const exercises = this.getExercisesByMuscles(),
      { category,exercise } = this.state

    return <>
      <Header 
        muscles={muscles}
        onExerciseCreate={this.handleExerciseCreate}
      />

      <Exercises 
        category={category}
        exercise={exercise}
        exercises={exercises}
        onSelect={this.handleExerciseSelected}
        onDelete={this.handleExerciseDelete}
      />

      <Footer 
        category={category}
        muscles={muscles}
        onSelect={this.handleCategorySelected}
      />
    </>
  }

}