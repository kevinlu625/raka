import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen";
import { ButtonScreen } from "./screens/ButtonScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { login, logout } from "./services/auth";
import Firebase from "./services/Firebase";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

const auth = Firebase.auth();

const Drawer = createDrawerNavigator();

export default function App() {

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

  const clickSignUp = () => {
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
        <DrawerItem label="Logout" onPress={() => logout()} />
      </DrawerContentScrollView>
    );
  }
  
  if (user) {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen
            name="Home"
            component={() => <HomeScreen {...props} />}
          />
          <Drawer.Screen name="Buttons" component={() => <ButtonScreen {...props} />} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  } else {
    return <LoginScreen signUp={clickSignUp} />;
  }
}
