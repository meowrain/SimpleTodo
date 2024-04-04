import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createMaterialBottomTabNavigator} from "react-native-paper/react-navigation";
import {Entypo, Ionicons, AntDesign, FontAwesome} from "@expo/vector-icons";
import UserScreen from "../screens/user-screen";
import HomeScreen from "../screens/home-screen";
import SettingsScreen from "../screens/settings-screen";
import {Appbar} from "react-native-paper";
import LoginScreen from "../screens/login-screen";
import RegisterScreen from "../screens/register-screen";
import {useContext} from "react";
import {ThemeContext} from "../stores/themeContext";
import UserProfile from "../screens/user-screen/profile";
import HelperScreenDetail from "../screens/help-screen/DetailScreen";
import AddScreen from "../screens/help-screen/AddScreen";
import UpScreen from "../screens/help-screen/UpScreen";
import DeleteScreen from "../screens/help-screen/DeleteScreen";
import TimeScreen from "../screens/help-screen/TimeScreen";
import FeedBackScreen from "../screens/feedback-screen/FeedBack";
// function CustomNavigationBar() {
//   return (
//     <Appbar.Header mode="center-aligned">
//       <Appbar.Content title="My awesome app" />
//     </Appbar.Header>
//   );
// }
function Root() {
    const {isDarkModeOn} = useContext(ThemeContext)
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="主页"
                component={HomeScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <Entypo name="home" size={24} color={isDarkModeOn ? 'white' : 'black'}/>,
                }}
            />
            <Tab.Screen
                name="设置"
                component={SettingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => (
                        <Ionicons name="settings" size={24} color={isDarkModeOn ? 'white' : 'black'}/>
                    ),
                }}
            />
            <Tab.Screen
                name="我的"
                component={UserScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: () => <FontAwesome name="user" size={24} color={isDarkModeOn ? 'white' : 'black'}/>,
                }}
            />
        </Tab.Navigator>
    );
}

export default function TodoNavigationContainer({children}) {
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
                }/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="UserProfile" component={UserProfile} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="HelpScreen" component={HelperScreenDetail} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="addScreen" component={AddScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="upScreen" component={UpScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="deleteScreen" component={DeleteScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="timeScreen" component={TimeScreen} options={{
                    headerShown: false
                }}/>
                <Stack.Screen name="feedBackScreen" component={FeedBackScreen} options={{
                    headerShown: false
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
