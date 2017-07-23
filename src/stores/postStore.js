import {observable, action} from 'mobx';
import {database, storage} from '../database/database';

export class PostStore {
  @observable
  postsState = {
    postedDays: [],
    postsByDate: {},
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
          const posts = snapshot.val();
          const state = {
            ...this.postsState,
            postedDays: [],
            postsByDate: {}
          }
          if (posts !== null) {
            for (const year of Object.keys(posts)) {
              for (const month of Object.keys(posts[year])) {
                for (const date of Object.keys(posts[year][month])) {
                  const dateObj = new Date(year, month - 1, date);
                  state
                    .postedDays
                    .push(dateObj)
                  const postsByDate = posts[year][month][date]
                  const stringDate = year + "/" + month + "/" + date;
                  state.postsByDate[stringDate] = []
                  for (const key of Object.keys(postsByDate)) {
                    state
                      .postsByDate[stringDate]
                      .push({id: key, date: dateObj, text: postsByDate[key].text, photoUrls: postsByDate[key].photoUrls, userInfo: postsByDate[key].userInfo});
                  }
                }
              }
            }
          }
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
    const photoUrls = await this.getUrlsByUploading(photoFiles, date);
    this
      .databaseRef
      .child('posts')
      .child(date)
      .push()
      .set({date, photoUrls, text, userInfo})
  }

  @action
  deletePost = (post) => {
    const stringifiedDate = this.toDateString(post.date)
    const splitedStringifiedDate = stringifiedDate.split("/")
    this
      .databaseRef
      .child('posts')
      .child(splitedStringifiedDate[0])
      .child(splitedStringifiedDate[1])
      .child(splitedStringifiedDate[2])
      .child(post.id)
      .remove();
    if (!!post.photoUrls) {
      Object
        .keys(post.photoUrls)
        .forEach((id, index) => this.storageRef.child(stringifiedDate).child(id).delete())
    }
  }
  @action
  clickDay = (clickedDay, modifiers, e) => {
    this.postsState = {
      ...this.postsState,
      stringifiedSelectedDay: this.toDateString(clickedDay),
      selectedDay: clickedDay
    }
  }

  async getUrlsByUploading(photoFiles, date) {
    const now = Date()
    let urls = {};
    for (var i = 0; i < photoFiles.length; i++) {
      await this.addUrlByUploading(photoFiles[i], i, now, urls, date);
    }
    return urls
  }
  async addUrlByUploading(photoFile, index, now, urls, date) {
    const filename = now + "(" + index + ")";
    const mountainsRef = this
      .storageRef
      .child(date)
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

  toDateString = (date) => (date.getFullYear() + "/" + this.pad(date.getMonth() + 1) + "/" + this.pad(date.getDate()))

}

export default new PostStore();