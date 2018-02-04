import {observable, action} from 'mobx';
import {database, storage} from '../database/database';

export class TaskStore {
  @observable
  taskState = {
    data: [],
    hello: "world"
  };
  databaseRef = database.ref();
  storageRef = storage.ref();

  constructor(props) {
    // console.log(this);
    this.taskState = {
      data: []
    }
  }
  // initPostsState() {
  //   this
  //     .databaseRef
  //     .child('posts')
  //     .on('value', action((snapshot) => {
  //       if (snapshot) {
  //         const posts = snapshot.val();
  //         const state = {
  //           ...this.taskState,
  //           postedDays: [],
  //           postsByDate: {}
  //         }
  //         if (posts !== null) {
  //           for (const year of Object.keys(posts)) {
  //             for (const month of Object.keys(posts[year])) {
  //               for (const date of Object.keys(posts[year][month])) {
  //                 const dateObj = new Date(year, month - 1, date);
  //                 state
  //                   .postedDays
  //                   .push(dateObj)
  //                 const postsByDate = posts[year][month][date]
  //                 const stringDate = year + "/" + month + "/" + date;
  //                 state.postsByDate[stringDate] = []
  //                 for (const key of Object.keys(postsByDate)) {
  //                   state
  //                     .postsByDate[stringDate]
  //                     .push({id: key, date: dateObj, text: postsByDate[key].text, photoUrls: postsByDate[key].photoUrls, userInfo: postsByDate[key].userInfo});
  //                 }
  //               }
  //             }
  //           }
  //         }
  //         this.taskState = state;
  //       }
  //     }));
  // }

  @action
  addTask = (val) => {
    const task = {
      text: val
    }
    
    if (val.length === 0) {
      return;
    }

    const cloneData = this.taskState.data.slice();
    cloneData.push(task);
    
    this.taskState = {
      ...this.taskState,
      data: cloneData
    }
  }
  
  @action
  removeTask = (id) => {
    const cloneData = this.taskState.data.slice();
    const remainData = cloneData.filter((task, index) => {
      if (index !== id) return task;
    })
    // Update state with filtered results
    this.taskState = {
      ...this.taskState,
      data: remainData
    }
  }
}

export default new TaskStore();