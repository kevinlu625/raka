import { min } from "moment";
import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { setButtonName } from "../services/database";

export class ButtonSettings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.button.name,
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.button.name,
    });
  } 
  render() {
    return (
      <View style={styles.item}>
        <TextInput
          style={styles.input}
          value={this.state.name || null}
          placeholder={"Button Task"}
          onChangeText={((text) => this.setState({name: text}))}
          onSubmitEditing={(event) => setButtonName(this.props.user.uid, this.props.button.key, event.nativeEvent.text)}
        />
        <View style={styles.hours}>
          <Text style={styles.hoursText}>Seconds today: {this.props.button.timeLogged} </Text>
        </View>
        <View style={styles.month}>
          <Text style={styles.monthText}>monthly hours: 5</Text>
        </View>
        <View style={styles.increase}>
          <Text style={styles.dailyIncrease}>daily increase</Text>
          <Text style={styles.increaseMetric}>5%</Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#F6F6F6",
    padding: 30,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    width: 186,
    height: 24,
    borderRadius: 5,
    padding: 0,
    paddingLeft: 10,
    backgroundColor: "#FFF",
    marginTop: -15,
    marginLeft: -15,
  },
  hours: {
    width: 186,
    height: 24,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    paddingTop: 5,
    marginLeft: -15,
  },
  hoursText: {
    fontSize: 12,
    fontWeight: "normal",
  },
  month: {
    width: 186,
    height: 24,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginTop: 10,
    paddingLeft: 10,
    paddingTop: 5,
    marginLeft: -15,
  },
  monthText: {
    fontSize: 12,
    fontWeight: "normal",
  },
  increase: {
    width: 100,
    height: 95,
    backgroundColor: "#FFF",
    borderRadius: 5,
    marginTop: -93,
    paddingLeft: 10,
    paddingTop: 5,
    marginLeft: 200,
  },
  dailyIncrease: {
    fontSize: 12,
    fontWeight: "normal",
    paddingLeft: 2.5,
  },
  increaseMetric: {
    fontSize: 45,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingTop: 7,
    color: "#4BC538",
  },
});

export default ButtonSettings;
