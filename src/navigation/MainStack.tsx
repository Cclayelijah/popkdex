import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Trivia from "../screens/Trivia";
import MainTabs from "./MainTabs";
import Groups from "../screens/Groups";
import Idols from "../screens/Idols";
import Wish from "../screens/Wish";

const MainStack = createNativeStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="Trivia" component={Trivia} />
      <MainStack.Screen name="Groups" component={Groups} />
      <MainStack.Screen name="Idols" component={Idols} />
      <MainStack.Screen name="Wish" component={Wish} />
    </MainStack.Navigator>
  );
};

export default Main;
