import React from 'react';
import './TaskApp.css'

const AppHead = ({addTask}) => {
  let input;
  let handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask(input.value);
      input.value = '';
    }
  }
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

const Task = ({task, remove}) => {
  return (
    <li className='task-item'>{task.text} <span className='fa fa-trash-o task-remover pull-right' onClick={() => {remove(task)}}></span></li>
  );
}

// Create component for list of tasks
const AppList = ({tasks,remove}) => {
  // Create new node for each task
  const taskNode = tasks.map((task, index) => {
    return (<Task task={task} key={index} remove={remove}/>)
  });

  // Return the list component with all tasks
  return (<ul className='task-list'>{taskNode}</ul>);
}

// Create global variable for task id

export default class TaskApp extends React.Component {
  render() {
    return (
      <div className="app-container">
        <AppHead addTask={this.props.addTask}/>

        <AppList 
          tasks={this.props.taskState.data}
          remove={this.props.removeTask}
        />
      </div>
    );
  }
}