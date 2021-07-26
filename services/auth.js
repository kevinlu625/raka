import Firebase from "./Firebase";
import { setUser } from "./database";
// import database from '@react-native-firebase/database';

const auth = Firebase.auth();
// const database = Firebase.database();

export function signUp(email, password) {
  console.log(email);
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log("User account created & signed in!");
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
    });
}

export function login(username, password) {
  auth
    .signInWithEmailAndPassword(username, password)
    .then((userCredential) => {
      // getTodos(this.props.user.uid, currentDate, this.setTaskItems);
      // setUser(userCredential.user.uid, userCredential.user.email);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function logout() {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}
