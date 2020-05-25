// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Dashboard from "./screens/Dashboard";
import Friends from "./screens/Friends";
import VenueDetails from "./screens/VenueDetails";
import SignIn from "./screens/Login/SignIn";

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const LoginStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen
        name="Login"
        component={SignIn}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </LoginStack.Navigator>
  );
}

function HomeStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </MainStack.Navigator>
  );
}

function FriendsPageStack() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Friends"
        component={Friends}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </MainStack.Navigator>
  );
}

function TabStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "white",
        tinColor: "#fff",
        showIcon: true,
        showLabel: true,
        lazyLoad: true,
        upperCaseLabel: false,
        indicatorStyle: {
          backgroundColor: "transparent",
        },
        style: {
          backgroundColor: "rgba(22, 22, 22, 0.0)",
          borderTopWidth: 0,

          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
        },
      }}
    >
      <Tab.Screen name="Friends" component={FriendsPageStack} />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{ headerShown: false, gestureEnabled: false }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Login"
          component={LoginStackScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <RootStack.Screen
          name="Tabs"
          component={TabStack}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <RootStack.Screen
          name="VenueDetails"
          component={VenueDetails}
          options={{
            headerTitle: "",
            headerTransparent: true,
            headerBackTitle: " ",
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
