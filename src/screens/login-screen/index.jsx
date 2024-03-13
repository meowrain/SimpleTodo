import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, TextInput, useTheme } from "react-native-paper";
import { loginQuery } from "../../api/auth";

const LoginScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    const userData = {
        username,
        password
    }
    loginQuery(userData)
    navigation.goBack()
    // 在这里执行登录逻辑
    // console.log("登录信息", { username, password });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={styles.card}>
        <Card.Title title="登录" />
        <Card.Content>
          <TextInput
            label="用户名"
            value={username}
            theme={{ colors: { primary: colors.primary } }}
            onChangeText={(username) => setUsername(username)}
          />
          <TextInput
            label="密码"
            value={password}
            secureTextEntry
            theme={{ colors: { primary: colors.primary } }}
            onChangeText={(password) => setPassword(password)}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            buttonColor={colors.primary}
            onPress={() => navigation.goBack()}
            mode="contained"
          >
            返回
          </Button>
          <Button
            buttonColor={colors.primary}
            onPress={handleLogin}
            mode="contained"
          >
            登陆
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  card: {
    padding: 20,
  },
});

export default LoginScreen;
