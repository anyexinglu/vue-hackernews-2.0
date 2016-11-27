import Firebase from 'firebase/app'
import 'firebase/database'

const config = {
    apiKey: "AIzaSyAWZGh9ydW4rxTibabG1cYCz7NfoYmTCcc",
    authDomain: "hackernews-ea265.firebaseapp.com",
    databaseURL: "https://hackernews-ea265.firebaseio.com",
}
const version = '/v0'

Firebase.initializeApp(config)
const api = Firebase.database().ref(version)
export default api