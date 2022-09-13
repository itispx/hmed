import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";

const Stack = createStackNavigator();

import HomeScreen from "../screens/HomeScreen";
import AddScreen from "../screens/AddScreen";

function HomeStack() {
  return (
    <Stack.Navigator
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
