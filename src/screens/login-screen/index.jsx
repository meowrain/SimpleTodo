import * as React from "react";
import {View, StyleSheet} from "react-native";
import {Button, Card, Divider, Text, TextInput, useTheme} from "react-native-paper";
import {loginQuery} from "../../api/auth";

const LoginScreen = ({navigation}) => {
    const {colors} = useTheme();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState('');

    
    const handleLogin = async () => {
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
          const res = await loginQuery(userData);
          setErrorMessage("")
          navigation.goBack()
          console.log(res);
          // 执行其他操作,例如导航到主页面
          // navigation.replace("Home");
        } catch (error) {
          console.error("登录失败:", error);
          setErrorMessage("登录失败,请稍后重试");
        }
      };


    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Card style={styles.card}>
                <Card.Title title="登录"/>
                <Card.Content>
                    <TextInput
                        label="用户名"
                        value={username}
                        theme={{colors: {primary: colors.primary}}}
                        onChangeText={(username) => setUsername(username)}
                    />
                    <TextInput
                        label="密码"
                        value={password}
                        secureTextEntry
                        theme={{colors: {primary: colors.primary}}}
                        onChangeText={(password) => setPassword(password)}
                    />
                    {errorMessage && <Text style={{ color: 'red' }}>{errorMessage}</Text>}
                </Card.Content>
                <Card.Actions style={{marginTop: 3}}>
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
                <Text style={{textAlign: "right",marginTop: 3}} onPress={() => {
                    navigation.navigate("Register")
                }}>还没有账号？点击注册</Text>
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
