// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Dashboard from "./screens/Dashboard";
import ModalScreen from "./screens/ModalScreen";
import SignIn from "./screens/Login/SignIn";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const LoginStack = createStackNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </LoginStack.Navigator>
  );
}

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />
    </MainStack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Login"
          component={LoginStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="MyModal" component={ModalScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
