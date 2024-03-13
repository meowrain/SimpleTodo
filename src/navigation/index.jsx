import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Entypo, Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import UserScreen from "../screens/user-screen";
import HomeScreen from "../screens/home-screen";
import SettingsScreen from "../screens/settings-screen";
import { Appbar } from "react-native-paper";
import LoginScreen from "../screens/login-screen";
import RegisterScreen from "../screens/register-screen";
function CustomNavigationBar() {
  return (
    <Appbar.Header mode="center-aligned">
      <Appbar.Content title="My awesome app" />
    </Appbar.Header>
  );
}
function Root() {
  const Tab = createMaterialBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="settings" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />,
        }}
      />
    </Tab.Navigator>
  );
}
export default function TodoNavigationContainer({ children }) {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={Root}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={
            {
                headerShown: false,
            }
        } />
        <Stack.Screen name="Register" component={RegisterScreen} options={{
            headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
