import Firebase from "./Firebase";
import { setUser } from "./database";

const auth = Firebase.auth();

export function signUp(email, password) {
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
      setUser(userCredential.user.uid, userCredential.user.email);
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
