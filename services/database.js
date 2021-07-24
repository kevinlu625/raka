import * as firebase from "firebase";
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

export function addTodo(id, items, date) {
  database
    .ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`)
    .update({
      todoItems: items,
      todo: items.length,
    })
    .then(() => {
      console.log("set");
      updatePercentage(id, date);
    });
  console.log(id);
  console.log(items);
  console.log(date);

  // reference.on("value", (snapshot) => {
  //   console.log("Todo tasks: ", snapshot.val());
  // });
}

export function deleteTodo(id, items, date) {
  database
    .ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`)
    .update({
      todoItems: items,
      todo: items.length,
      completed: firebase.database.ServerValue.increment(1),
    })
    .then(() => {
      console.log("set");
      updatePercentage(id, date);
    });
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

export function updatePercentage(id, date) {
  const reference = database.ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`);

  reference.on("value", (snapshot) => {
    const todo = snapshot.val().todo || 0;
    const completed = snapshot.val().completed || 0;
    database.ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`).update({
      percentage: completed / (completed + todo) * 100 || 0,
    });
    console.log(snapshot.val().completed);
  });
  
  
  
}
