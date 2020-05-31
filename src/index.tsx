import React, { setGlobal } from "reactn";
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import { theme } from './materialui/theme'
import { Router } from 'react-router-dom';

import { createBrowserHistory } from 'history';

// import thunk from 'redux-thunk'

// import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import { firestore } from './plugins/firebase';
import { StateProvider } from './store';
import { getHeapCodeStatistics } from "v8";
// import 'onsenui/css/onsenui.css';
// import 'onsenui/css/onsen-css-components.css';

// const middlewares = []
// middlewares.push(thunk)
const history = createBrowserHistory();

/*const store = createStore(
   applyMiddleware(thunk) 
) */
setGlobal({ postslist: { posts: [], isLoading: false, startDate: new Date(), endDate: new Date() } });
setGlobal({ channelslist: { channels: [], isLoading: false, startDate: new Date(), endDate: new Date() } });
setGlobal({ searchResults: { posts: [], isLoading: false, startDate: new Date(), endDate: new Date() } });
setGlobal({ currentuser: {} });


async function getPosts() {
  let tmp_posts = new Array();
  let start_date = new Date();
  let end_date = new Date();
  const snapShot = await firestore.collection('posts')
    .orderBy('created_at', 'desc')
    .limit(10)
    .get()
  snapShot.forEach(doc => {
    let post = {
      content: doc.data().content,
      created_at: doc.data().created_at.toDate(),
      channelId: doc.data().channelId,
      thumbnailUrl: doc.data().thumbnailUrl,
      title: doc.data().title,
      post_id: doc.data().post_id,
      channelTitle: doc.data().channelTitle,
      video_id: doc.data().video_id,
      doc_id: doc.id,
      likeCount: doc.data().likeCount,
    }
    tmp_posts.push(post);
  })

  console.log(tmp_posts);

  start_date = tmp_posts[0].created_at;
  end_date = tmp_posts.slice(-1)[0].created_at;
  setGlobal({ postslist: { posts: tmp_posts, startDate: start_date, endDate: end_date, isLoading: false } });
};

async function login() {
  await firebase.auth().signInAnonymously()
    .then(e => {
      if (e.user) {
        const userRef = firestore.collection('users').doc(e.user.uid)
        userRef.set({
          uid: e.user.uid,
          displayName: e.user.displayName,
          photoURL: e.user.photoURL,
          isAnonymus: e.user.isAnonymous,
          likePostCount: 0,
        })
      }
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });

  await firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log(user);
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      let tmp_user = {
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAnonymus: user.isAnonymous,
      }
      setGlobal({ currentuser: tmp_user });
    } else {
      // User is signed out.
      // ...
    }
    // ...
  });

}

login();
getPosts();

ReactDOM.render(
  <StateProvider>
    <Router history={history}>
      <App />
    </Router>
  </StateProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

