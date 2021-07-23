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

export function ButtonScreen() {
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
