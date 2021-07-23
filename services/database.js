// import * as firebase from "firebase";
// import database from "@react-native-firebase/database";
import Firebase from "./Firebase";

const database = Firebase.database();

export function getTodos(id, date, callback) {
  const reference = database.ref(
    `users/${id}/todo/${date.toISOString().split("T")[0]}`
  );

  reference.on("value", (snapshot) => {
    const todoItems = [];
    if (snapshot.val()) {
      console.log(snapshot.val().values());
      snapshot
        .val()
        .values()
        .forEach((item) => {
          todoItems.append(item.name);
        });
    }
    callback(todoItems);
  });
}

export function setTodos(id, items, date) {
  items.forEach((item) => {
    database
      .ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`)
      .push()
      .set({
        name: item,
        timeCount: 0,
      });
  });
  // database
  //   .ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`)
  //   .set({
  //     todoItems: items,
  //     count: items.length,
  //   })
  //   .then(() => {
  //     console.log("set");
  //   });
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

export function getTaskTime(id, date, task, callback) {
  const reference = database.ref(
    `users/${id}/todo/${date.toISOString().split("T")[0]}/`
  );

  reference.on("value", (snapshot) => {
    callback(snapshot.val().find((item) => item.name === task));
  });
}
