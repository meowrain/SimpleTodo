import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import TodoLists from "../../components/Lists";

export default function HomeScreen({ navigation }) {
  return <TodoLists navigation={navigation}/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
