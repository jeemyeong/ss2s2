import React from 'react';
import './TaskApp.css'

// Create component for app header composed of input and button
const AppHead = ({addTask}) => {
  // Input Tracker
  let input;
  let handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(input.value);
      input.value = '';
    }
  }
  // Return AppHead component
  return (
    <div className='input-group'>
      <input ref={node => {
        input = node;
      }} className='form-control' type='text' onKeyPress={handleKeyPress}/>

      <button onClick={() => {
        addTask(input.value);
        input.value = '';
      }} className='input-group-addon'>
        Add task
      </button>
    </div>
  );
};

// Create component for new task composed of list item, text and icon
const Task = ({task, remove, id}) => {
  // For each task create list item with specific text and icon to remove the task
  return (
    <li className='task-item'>{task.text} <span className='fa fa-trash-o task-remover pull-right' onClick={() => {remove(id)}}></span></li>
  );
}

// Create component for list of tasks
const AppList = ({tasks,remove}) => {
  // Create new node for each task
  const taskNode = tasks.map((task, index) => {
    return (<Task task={task} key={index} remove={remove} id={index}/>)
  });

  // Return the list component with all tasks
  return (<ul className='task-list'>{taskNode}</ul>);
}

// Create global variable for task id

// Create main task app component
export default class TaskApp extends React.Component {
  constructor(prop) {
    // Provide parent class with prop
    super(prop);

    // Set initial state as empty
    this.state = {
      data: []
    }
  }

  // Add task handler
  addTask(val) {
    // Get the data for tasks such as text and id
    const task = {
      text: val
    }
    
    // Update data if input contains some text
    if (val.length > 0) this.state.data.push(task);
    
    // Update state with newest data - append new task
    this.setState({
      data: this.state.data
    });
  }
  
  // Handle remove
  removeTask(id) {
    // Filter all tasks except the one to be removed
    const taskCollection = this.state.data.filter((task, index) => {
      if (index !== id) return task;
    });

    // Update state with filtered results
    this.setState({
      data: taskCollection
    });
  }

  render() {
    // Render whole App component
    // use AppHead and AppList components
    return (
      <div className="app-container">
        <AppHead addTask={this.addTask.bind(this)}/>

        <AppList 
          tasks={this.state.data}
          remove={this.removeTask.bind(this)}
        />
      </div>
    );
  }
}