import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react'
import moment from "moment";
import { DragDropContext } from 'react-beautiful-dnd';
import RecipeCardHolder from './RecipeCardHolder';
import DayCardHolder from "./DayCardHolder";
import initialData from './initialData';

class Agenda extends Component {
 state = {
   mealAgenda: initialData,
   recipes: []
  }

  componentDidMount = () => {
    this.getRecipes()
  }

  getRecipes = () => {
    fetch("http://localhost:3001/api/v1/recipes")
      .then(resp => resp.json())
      .then(data => {
        this.setState({recipes: data})
      })
  }

  onDragEnd = result => {
    console.log(result);

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startDayCard = source.droppableId;
    console.log(startDayCard)
    const finishDayCard = destination.droppableId;


  }

  getClickedRecipe = (recipeName) => {
    console.log(recipeName)
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}>
        <h1>Fridgenda - It's the {moment().format("wo")} Week of {moment().format("YYYY")}</h1>
        <Grid divided='vertically'>
          <Grid.Row columns={3}>
            <Grid.Column>
              <DayCardHolder mealAgenda={this.state.mealAgenda}/>
            </Grid.Column>
            <Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <RecipeCardHolder recipes={this.state.recipes} getClickedRecipe={this.getClickedRecipe}/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </DragDropContext>
    )
  }
}

export default Agenda;
