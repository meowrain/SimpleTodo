import React from "react";
import { View } from "react-native";
import { Avatar, Caption, Text, Card, DataTable ,Button} from "react-native-paper";

export default UserScreen = ({ todo,navigation }) => {
  // Temp user data
  const user = {
    avatarUrl:
      "https://meowrain.cn/upload/2024/02/photo_2024-02-24_23-24-42.jpg",
    username: "MeowRain",
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      {/* 用户信息 */}
      <View style={{ alignItems: "center" }}>
        <Avatar.Image
          size={100}
          source={{ uri: user.avatarUrl }} // Temp avatar url
        />
        <Text>{user.username}</Text>
        <Caption>@{user.username}</Caption>
      </View>

      {/* Todo统计 */}
      <Card style={{ marginTop: 20 }}>
        <Card.Title title="Todo统计" />
        <Card.Content>
          <Text>你已经完成了 100 条Todo</Text>
        </Card.Content>
      </Card>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("Register")}
      >
        进入注册
      </Button>
      <Button
        icon="plus"
        mode="contained"
        onPress={() => navigation.navigate("Login")}
      >
        进入登陆
      </Button>
    </View>
  );
};

// <View>
// <Text>UserSCreen</Text>
// <Button
//   icon="plus"
//   mode="contained"
//   onPress={() => navigation.navigate('Login')}
// >
//   进入登陆
// </Button>
// <Button
//   icon="plus"
//   mode="contained"
//   onPress={() => navigation.navigate('SignIn')}
// >
//   进入注册
// </Button>
// </View>
