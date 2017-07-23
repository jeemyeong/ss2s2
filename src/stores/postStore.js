import {observable, action} from 'mobx';
import {database, storage} from '../database/database';

export class PostStore {
  @observable
  postsState = {
    posts: [],
    postedDay: [],
    postsByDay: {},
    StringifiedSelectedDay: new Date().toLocaleDateString(),
    selectedDay: new Date()
  };
  databaseRef = database.ref();
  storageRef = storage.ref();

  initPostsState() {
    this.databaseRef
      .child('posts')
      .on('value', action((snapshot) => {
        if (snapshot) {
          const list = snapshot.val();
          const state = {
            posts: [],
            postedDay: [],
            postsByDay: {},
            StringifiedSelectedDay: this.postsState.StringifiedSelectedDay,
            selectedDay: this.postsState.selectedDay
          }
          if (list !== null) {
            for (const key of Object.keys(list)) {
              const stringDate = list[key].date
              const parts = stringDate.split('/');
              let date;
              if(parts.length > 1){
                date = new Date(parts[2], parts[0] - 1, parts[1]);
              }else{
                const originalParts = stringDate.replace(".","").split(' ')
                date = new Date(originalParts[2], originalParts[0] - 1, originalParts[1]);
              }
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
              const date = e
                .date
                .toLocaleDateString();
              if (!!state.postsByDay[date]) {
                state
                  .postsByDay[date]
                  .push(e)
                return null;
              } else {
                state.postsByDay[date] = []
                state
                  .postsByDay[date]
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
    const date = this.postsState.StringifiedSelectedDay
    const post = this
      .databaseRef
      .child('posts')
      .push()
    const photoUrls = await this.getUrlsByUploading(photoFiles);
    post.set({date, photoUrls, text, userInfo})
  }

  @action
  deletePost = (post) => {
    if(!!post.photoUrls){
      Object.keys(post.photoUrls).forEach((id, index) =>
        this.storageRef.child(id).delete()
      )
    }
    this.databaseRef
      .child('posts')
      .child(post.id)
      .remove();
  }
  @action
  clickDay = (clickedDay, modifiers, e) => {
    this.postsState.StringifiedSelectedDay = clickedDay.toLocaleDateString();
    this.postsState.selectedDay = clickedDay;
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

}

export default new PostStore();