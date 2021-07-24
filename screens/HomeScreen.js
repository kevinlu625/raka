import React, { useState } from "react";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import Task from "../components/Task";
import { getTodos, addTodo, deleteTodo } from "../services/database";
import { setStatusBarBackgroundColor } from "expo-status-bar";
// import { user } from "./App.js";

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    // const [task, setTask] = useState();
    // const [taskItems, setTaskItems] = useState([]);
    // const [date, setDate] = useState(new Date());
    // const [mode, setMode] = useState("date");
    // const [show, setShow] = useState(false);

    this.state = {
      task: "",
      taskItems: [],
      date: new Date(),
      mode: "date",
      show: false,
    };

    this.setTaskItems = this.setTaskItems.bind(this);
    this.onChange = this.onChange.bind(this);

    // getTodos(this.props.user.uid, new Date(), this.setTaskItems);
  }

  setTaskItems(taskItems) {
    this.setState({
      taskItems,
    });
  }

  handleAddTask() {
    Keyboard.dismiss();
    this.setState({
      taskItems: [...this.state.taskItems, this.state.task],
      task: null,
    });
    addTodo(
      this.props.user.uid,
      [...this.state.taskItems, this.state.task],
      this.state.date
    );
  }

  completeTask(index) {
    let itemsCopy = [...this.state.taskItems];
    itemsCopy.splice(index, 1);
    this.setState({
      taskItems: itemsCopy,
    });
    deleteTodo(this.props.user.uid, itemsCopy, this.state.date);
  }

  onChange(event, selectedDate) {
    const currentDate = selectedDate || this.state.date;
    getTodos(this.props.user.uid, currentDate, this.setTaskItems);
    // setShow(Platform.OS === "ios");
    this.setState({
      show: Platform.OS === "ios",
      date: currentDate,
    });
    // setDate(currentDate);
  }

  showMode(currentMode) {
    this.setState({
      show: true,
      mode: currentMode,
    });
    // setShow(true);
    // setMode(currentMode);
  }

  showDatepicker() {
    this.setState({
      mode: "date",
    });
    // showMode("date");
  }

  showTimepicker() {
    this.setState({
      mode: "time",
    });
    // showMode("time");
  }
  
  componentDidMount() {
    getTodos(this.props.user.uid, new Date(), this.setTaskItems);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.TitleDatePicker}>
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        </View>
        <Text style={styles.sectionTitle}>today's tasks</Text>

        {/* Added this scroll view to enable scrolling when list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {/* This is where the tasks will go! */}
              {this.state.taskItems.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => this.completeTask(index)}
                  >
                    <Task text={item} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Write a task */}
        {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput
            style={styles.input}
            placeholder={"Write a task"}
            value={this.state.task}
            onChangeText={(text) => this.setState({ task: text })}
          />
          <TouchableOpacity onPress={() => this.handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  TitleDatePicker: {
    marginTop: 70,
    marginLeft: 100,
  },
  datePicker: {
    marginTop: 70,
    marginLeft: 250,
  },
  tasksWrapper: {
    paddingTop: 0,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {},
});

// export default HomeScreen;