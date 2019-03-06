import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


// functional component, because it doesnt have it's own state 
const Title = ({count}) => {
  return(
    <h1>My TodoList ({count})</h1>
  );
}

const TodoForm = ({addTodo, reverse}) => {
  let input;
  let date;

  return(

    <div>
      <input ref={node => {
      input = node;
    }} />

    <span style={{cursor: 'pointer'}} onClick={() => input.priority = 2}> ! </span>
    <span style={{cursor: 'pointer'}} onClick={() => input.priority = 0}> - </span>
    <span onClick={()=> reverse()}>reverse</span>

    <button onClick={() => {
      if(!input.value){ 
        alert('no value');
        return;
      }
      date = new Date();

      addTodo(input.value, input.priority, date);
      input.value = '';                       // cleaning input field
      delete input.property;                  // remove property from input object 
      }}>+</button>
    
    </div>
  )
}


class Sort extends Component {
  constructor(props){
    super(props);
    this.state = {value: null};
  }

  handleChange(event){
    this.props.sort(event.target.value);
    console.log(event.target.value);
    this.setState({value: event.target.value});

  }

  handleSubmit(event){
    this.props.sort(this.state.value);
    event.preventDefault();
  }

  render(){
    const options = [
      {value: '', disabled: true, selected: true, label: "Sort by..."},
      {value: 'priority', label: "Priority"},
      {value: 'date', label: "Date"},
    ]
    return(
      <div>
        <select options={options}></select>
      </div>
    )
  }
  
}

const Todo = ({todo, remove, complete}) =>{
  return(
    // checking whether todo is completed or not 
    <li className={todo.completed? 'completed': null}>
      <b style={{cursor:'pointer'}} onClick={() => {complete(todo)}}>V </b>
      <span className={todo.completed? "completed": null }>{todo.title}</span>
      <span>{` ${todo.priority}`}</span>
      <span>{`${todo.date.getDate()}.${todo.date.getMonth() + 1}.${todo.date.getFullYear()} | ${todo.date.getHours()}:${todo.date.getMinutes()}`}</span>

      <b style={{cursor:'pointer'}} onClick={() => {remove(todo)}}> X</b>
    </li>
  );
}

const Todos = ({todoList, remove, complete}) =>{
  // loop through all available todos
  let todoListItems = todoList.map(todo => {
    return <Todo todo={todo} remove={remove} complete={complete} />
  });

  return (<ul>{todoListItems}</ul>);
}

class TodoList extends Component{
  constructor(props){
    super(props);
    this.indexOfElement = this.indexOfElement.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleComplete = this.handleComplete.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.handleReverse = this.handleReverse.bind(this);
    this.state = {
      data: [
        {title: "say hello", completed: false, priority: 1, date: new Date,},
        {title: "call mum", completed: false, priority: 0, date: new Date,},
        {title: "kiss wife", completed: false , priority: 2, date: new Date,},
        {title: "anything else?", completed: false, priority: 1, date: new Date,}, 
      ]
    }
  }

  indexOfElement(todo){
    let data = this.state.data;
    let indexOfElem = -1; 
    data.forEach((item, index) => {
      if(item.title === todo.title){
        indexOfElem = index;
      }
    })
    return indexOfElem;
  }

  handleRemove(todo){
    let data = this.state.data;
    let indexOfElement = this.indexOfElement(todo);
    data.splice(indexOfElement, 1);
    this.setState({data:data});
  }

  handleComplete(todo){
    let data = this.state.data;
    let indexOfElement = this.indexOfElement(todo);
    data.splice(indexOfElement, 1, {title: todo.title, completed: !todo.completed, priority: todo.priority, date: todo.date}); 
    // data.splice(indexOfElement, 1); 
    // data.push({title: todo.title, completed: !todo.completed, priority: todo.priority, date: todo.date});

    console.log(data);
    this.setState({data: data});
  }

  handleAdd(title, priority, date){
    let data = this.state.data;
    // adding additonal logic to test priority
  
    data.push({title: title,
               completed: false, 
               priority: !priority? 1: priority,
               date: date,
              });
    
    console.log(data);
    this.setState({data: data});
  }

  handleReverse(sortBy){
    let data = this.state.data;
    data.reverse();
    this.setState({data: data});
  }

  // handleSort(sortBy){
  //   let data = this.state.data;
  //   data.sort(function(a, b){
  //     return a.priority - b.priority;
  //   });
  //   this.setState({data:data});
  // }

  handleSort(sortBy){
    let data = this.state.data;
    data.sort(function(a, b){
      return b[sortBy] - a[sortBy];
    });
    this.setState({data:data});
  }



  render(){
    return(
      <div>
        <Title count={this.state.data.length} />
        <TodoForm addTodo={this.handleAdd} reverse={this.handleReverse}/>
        <Sort sort={this.handleSort}/>
        <Todos todoList={this.state.data} remove={this.handleRemove} complete={this.handleComplete} />
      {/* <h1>App works: todos left ({this.state.data.length})</h1> */}
      </div>
    )
  }
}


export default TodoList;
