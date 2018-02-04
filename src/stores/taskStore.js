import {observable, action} from 'mobx';
import {database, storage} from '../database/database';
import _ from 'partial-js';

export class TaskStore {
  @observable
  taskState = {
    data: []
  };
  databaseRef = database.ref();
  storageRef = storage.ref();

  initTaskState() {
    this.databaseRef.child('tasks')
      .on('value', action((snapshot) => {
        if (snapshot) {
          const tasks = _.go(
            snapshot.val(),
            _.mapObject((val, key) => { return {...val,key}}),
            _.values
          )
          const state = {
            ...this.taskState,
            data: tasks
          }
          this.taskState = state;
        }
      }));
  }

  addTask = (val) => {
    if (val.length === 0) {
      return;
    }

    const task = {
      text: val
    }
    
    this.databaseRef.child('tasks').push().set(task)
  }
  
  removeTask = (task) => {
    this.databaseRef.child('tasks').child(task.key).remove()
  }
}

export default new TaskStore();