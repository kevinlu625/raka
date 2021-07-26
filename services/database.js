import * as firebase from "firebase";
import Firebase from "./Firebase";

const database = Firebase.database();

export function getTodos(id, date, callback) {
  const reference = database.ref(
    `users/${id}/todo/${date.toISOString().split("T")[0]}/todoItems`
  );

  reference.on("value", (snapshot) => {
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
      updatePercentage(id, date);
    });
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
      updatePercentage(id, date);
    });
}

export function setUser(id, email) {
  database.ref(`test`).set(null);
  database
    .ref(`users/${id}`)
    .set({
      email,
      buttons: {
        button1: {key: "button1", name: "Button 1", timeLogged: 0},
        button2: {key: "button2", name: "Button 2", timeLogged: 0},
        button3: {key: "button3", name: "Button 3", timeLogged: 0},
      },
    })
    .then(() => {
    });
}

export function updatePercentage(id, date) {
  const reference = database.ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`);

  reference.on("value", (snapshot) => {
    const todo = snapshot.val().todo || 0;
    const completed = snapshot.val().completed || 0;
    database.ref(`users/${id}/todo/${date.toISOString().split("T")[0]}`).update({
      percentage: completed / (completed + todo) * 100 || 0,
    });
  });
}

export function getButtons(id, callback) {
  const reference = database.ref(`users/${id}/buttons/`);

  reference.on("value", (snapshot) => {
    if (snapshot.val()) {
      callback(snapshot.val());
    }
  });
}

export function setButtonName(id, key, buttonName) {
  database.ref(`users/${id}/buttons/${key}`).update({name: buttonName});
}
