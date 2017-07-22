import {observable, action} from 'mobx';
import {database, storage} from '../database/database';

export class PostStore {
  @observable
  posts = [];
  constructor() {
    const ref = database.ref();
    ref
      .child('posts')
      .on('value', action((snapshot) => {
        if (snapshot) {
          const list = snapshot.val();
          const posts = [];
          if (list !== null) {
            for (const key of Object.keys(list)) {
              const stringDate = list[key].date
              const parts = stringDate.split('/');
              const date = new Date(parts[2], parts[0] - 1, parts[1]);
              posts.push({id: key, date, text: list[key].text, photoUrls: list[key].photoUrls, writter: list[key].writter});
            }
          }
          this.posts = posts;
        }
      }));
  }
  @action
  addPost = (date, text, photoFiles, writter) => {
    const databaseRef = database.ref();
    const storageRef = storage.ref();
    const post = databaseRef
      .child('posts')
      .push()
    post.set({date, photoUrls: [], text, writter})
    const now = Date()
    for (var i = 0; i < photoFiles.length; i++) {
      const filename = now + "(" + i + ")";
      const mountainsRef = storageRef.child(filename);
      mountainsRef
        .put(photoFiles[0])
        .then((snapshot) => {
          const fileUrl = snapshot.metadata.downloadURLs[0];
          post
            .child('photoUrls')
            .set(post.child('photoUrls').concat(fileUrl))
        });
    }
  }
  @action
  deletePost = (id) => {
    const ref = database.ref();
    ref
      .child('posts')
      .child(id)
      .remove();
  }
}

export default new PostStore();