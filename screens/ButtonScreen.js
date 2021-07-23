import React from "react";

import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from "react-native";

import ButtonSettings from "../components/ButtonSettings";

export class ButtonScreen extends React.Component {
  constructor(props) {
    super(props);

    const date = new Date();

    this.state = {
      tasks: [
        { name: "Dog", timeCount: 0, previousTimeCount: 0 },
        { name: "Cat", timeCount: 0, previousTimeCount: 0 },
        { name: "Mouse", timeCount: 0, previousTimeCount: 0 },
        { name: "Kevin", timeCount: 0, previousTimeCount: 0 },
      ],
    };

    const reference = database.ref(
      `users/${this.props.user.uid}/todo/${date.toISOString().split("T")[0]}/`
    );

    reference.on("value", (snapshot) => {
      this.state.tasks.forEach((task) => {
        task.timeCount = snapshot
          .val()
          .find((item) => item.name === task).timeCount;
      });
    });

    let buttonList = [];
    this.state.tasks.forEach((task) => {
      buttonList.push(<ButtonSettings item={task} />);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.sectionTitle}>button settings</Text>
        </View>
        <View style={styles.items}>
          <ButtonSettings />
          <ButtonSettings />
          <ButtonSettings />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ECC1C1",
  },
  buttonWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});

// export default ButtonScreen;
