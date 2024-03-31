import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text, TextInput, useTheme } from "react-native-paper";
import { registerQuery } from "../../api/auth";
import { ToastAndroid } from "react-native";
const RegisterScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleRegister = async () => {
    if (!username || !password) {
      setErrorMessage("账户名和密码不为空！");
      console.log("密码不为空！");
      return;
    }
    const userData = {
      username,
      password,
    };
    try {
      const res = await registerQuery(userData);
      if(res) {
        ToastAndroid.show('✨注册成功!', ToastAndroid.SHORT);
        setErrorMessage("");
        navigation.goBack();
      }
      console.log(res)
    } catch (err) {
      console.error("注册失败:", err);
      setErrorMessage("注册失败,请稍后重试");
      ToastAndroid.show('注册失败,请稍后重试', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Card style={styles.card}>
        <Card.Title title="注册" />
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
          {errorMessage && <Text style={{ color: "red" }}>{errorMessage}</Text>}
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
            onPress={handleRegister}
            mode="contained"
          >
            注册
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

export default RegisterScreen;
