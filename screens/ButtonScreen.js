import React from "react";
import { render } from "react-dom";

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

import { getButtons, setButtonName } from "../services/database";

import ButtonSettings from "../components/ButtonSettings";

export class ButtonScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: null,
    };

    this.setButtons = this.setButtons.bind(this);
  }

  setButtons(buttons) {
    this.setState({
      buttons,
    });
  }

  componentDidMount() {
    getButtons(this.props.user.uid, this.setButtons);
  }
  
  render() {
    const renderButtons = () => {
      if (this.state.buttons) {
        return (
          <View style={styles.items}>
            <ButtonSettings user={this.props.user} button={this.state.buttons.button1} />
            <ButtonSettings user={this.props.user} button={this.state.buttons.button2} />
            <ButtonSettings user={this.props.user} button={this.state.buttons.button3} />
          </View>
        );
      }
    }
    return (
      <View style={styles.container}>
        <View style={styles.buttonWrapper}>
          <Text style={styles.sectionTitle}>Button Settings</Text>
        </View>
        {renderButtons()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffbf8b",
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
