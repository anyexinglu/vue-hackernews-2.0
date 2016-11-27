import Firebase from 'firebase'
import LRU from 'lru-cache'

let api
const config = {
    apiKey: "AIzaSyAWZGh9ydW4rxTibabG1cYCz7NfoYmTCcc",
    authDomain: "hackernews-ea265.firebaseapp.com",
    databaseURL: "https://hackernews-ea265.firebaseio.com",
}
const version = '/v0'

if (process.__API__) {
  api = process.__API__
} else {
  Firebase.initializeApp(config)
  api = process.__API__ = Firebase.database().ref(version)

  // fetched item cache
  api.cachedItems = LRU({
    max: 1000,
    maxAge: 1000 * 60 * 15 // 15 min cache
  })

  // let newPostKey = api.child('customers').child('-KXEeLNXZFSN8-fLGZQB').push().key;

  // let updates = {};
  // updates['/customers/-KXEeLNXZFSN8-fLGZQB/' + newPostKey] = {
  //     customerId: 'zhangsan',
  //     customerName: '张三'
  // };
  // newPostKey = api.child('customers').push().key;
  // updates['/customers/' + newPostKey] = {
  //     customerId: 'lisi',
  //     customerName: '李四'
  // };
  // newPostKey = api.child('customers').push().key;
  // updates['/customers/' + newPostKey] = {
  //     customerId: 'yangxiayan',
  //     customerName: '杨夏燕'
  // };

  // api.update(updates);

  // cache the latest story ids
  api.cachedIds = {}
  api.child('customers').on('value', snapshot => {
    api.cachedIds['customers'] = snapshot.val()
  })
}

export default api
