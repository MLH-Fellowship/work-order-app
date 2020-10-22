import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateOrder from "../components/CreateOrder";

const CreateOrderStack = createStackNavigator();

const CreateOrderPage = () => {
  return (
    <CreateOrderStack.Navigator>
      <CreateOrderStack.Screen name="Create Order" component={CreateOrder} />
    </CreateOrderStack.Navigator>
  );
};

export default CreateOrderPage;
