import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
