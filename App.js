import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen";
import { ButtonScreen } from "./screens/ButtonScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { login, logout } from "./services/auth";
//import { getTodos, setTodos } from "./services/database";

// import auth from "@react-native-firebase/auth";
import Firebase from "./services/Firebase";
// import { getTodos } from "./services/database";
import ButtonSettings from "./components/ButtonSettings";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

//firebase.initializeApp(firebaseConfig);
//firebase.analytics();
const auth = Firebase.auth();

const Drawer = createDrawerNavigator();

export default function App() {
  // firebase.analytics();

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [initialTodo, setInitialTodo] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // const showLogin = false;
  const clickSignUp = () => {
    console.log("showLogin");
    login("mtsiraka@gmail.com", "raka1234");
  };

  const clickLogOut = () => {
    logout();
  };

  const props = {
    user,
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="log out" onPress={() => logout()} />
      </DrawerContentScrollView>
    );
  }

  if (user) {
    console.log(user.uid);
    // getTodos(props.user.uid, new Date(), setTaskItems);
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="HomeScreen"
            component={() => <HomeScreen {...props} />}
          />
          <Drawer.Screen name="ButtonScreen" component={ButtonScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen signUp={clickSignUp} />;
  }
}
