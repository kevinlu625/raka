// import * as firebase from "firebase";
// import database from "@react-native-firebase/database";
import Firebase from "./Firebase";

const database = Firebase.database();

export function getTodos(id, date, callback) {
  const reference = database.ref(
    `users/${id}/todo/${date.toISOString().split("T")[0]}/todoItems`
  );

  reference.on("value", (snapshot) => {
    console.log(snapshot.val());
    if (snapshot.val()) {
      callback(snapshot.val());
    } else {
      callback([]);
    }
  });
}

export function setTodos(id, items, date) {
  database
    .ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`)
    .set({
      todoItems: items,
      count: items.length,
    })
    .then(() => {
      console.log("set");
    });
  console.log(id);
  console.log(items);
  console.log(date);

  // reference.on("value", (snapshot) => {
  //   console.log("Todo tasks: ", snapshot.val());
  // });
}

export function setUser(id, email) {
  database
    .ref(`users/${id}`)
    .set({
      email,
    })
    .then(() => {
      console.log("hi");
    });
  console.log("User signed in!");
}
