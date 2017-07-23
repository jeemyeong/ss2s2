import {observable, action} from 'mobx';
import {database, storage} from '../database/database';

export class PostStore {
  @observable
  postsState = {
    posts: [],
    postedDay: [],
    postsByDay: {},
    stringifiedSelectedDay: null,
    selectedDay: new Date()
  };
  databaseRef = database.ref();
  storageRef = storage.ref();

  constructor(props) {
    this.postsState = {
      ...this.postsState,
      stringifiedSelectedDay: this.toDateString(this.postsState.selectedDay)
    }
  }

  initPostsState() {
    this
      .databaseRef
      .child('posts')
      .on('value', action((snapshot) => {
        if (snapshot) {
          const list = snapshot.val();
          const state = {
            posts: [],
            postedDay: [],
            postsByDay: {},
            stringifiedSelectedDay: this.postsState.stringifiedSelectedDay,
            selectedDay: this.postsState.selectedDay
          }
          if (list !== null) {
            for (const key of Object.keys(list)) {
              const stringDate = list[key].date
              const parts = stringDate.split('/');
              const date = new Date(parts[2], parts[0] - 1, parts[1]);
              state
                .posts
                .push({id: key, date, text: list[key].text, photoUrls: list[key].photoUrls, userInfo: list[key].userInfo});
            }
          }

          state
            .posts
            .map((e) => {
              state
                .postedDay
                .push(e.date)
              const stringfiedDate = this.toDateString(e.date);
              if (!!state.postsByDay[stringfiedDate]) {
                state
                  .postsByDay[stringfiedDate]
                  .push(e)
                return null;
              } else {
                state.postsByDay[stringfiedDate] = []
                state
                  .postsByDay[stringfiedDate]
                  .push(e)
                return null;
              }
            })
          this.postsState = state;
        }
      }));
  }

  @action
  addPost = async(text, photoFiles, userInfo) => {
    if (text === "" && photoFiles === []) {
      return;
    }
    const date = this.postsState.stringifiedSelectedDay
    const post = this
      .databaseRef
      .child('posts')
      .push()
    const photoUrls = await this.getUrlsByUploading(photoFiles);
    post.set({date, photoUrls, text, userInfo})
  }

  @action
  deletePost = (post) => {
    if (!!post.photoUrls) {
      Object
        .keys(post.photoUrls)
        .forEach((id, index) => this.storageRef.child(id).delete())
    }
    this
      .databaseRef
      .child('posts')
      .child(post.id)
      .remove();
  }
  @action
  clickDay = (clickedDay, modifiers, e) => {
    this.postsState = {
      ...this.postsState,
      stringifiedSelectedDay: this.toDateString(clickedDay),
      selectedDay: clickedDay
    }
  }

  async getUrlsByUploading(photoFiles) {
    const now = Date()
    let urls = {};
    for (var i = 0; i < photoFiles.length; i++) {
      await this.addUrlByUploading(photoFiles[i], i, now, urls);
    }
    return urls
  }
  async addUrlByUploading(photoFile, index, date, urls) {
    const filename = date + "(" + index + ")";
    const mountainsRef = this
      .storageRef
      .child(filename);
    await mountainsRef
      .put(photoFile)
      .then((snapshot) => {
        urls[filename] = snapshot.metadata.downloadURLs[0];
      });
  }

  pad = (n) => (n < 10
    ? "0" + n
    : n)

  toDateString = (date) => (this.pad(date.getMonth()+1) + "/" + this.pad(date.getDate()) + "/" + date.getFullYear())

}

export default new PostStore();