import React, {useState} from "react";
import {View} from "react-native";
import {Avatar, Caption, Text, Card, DataTable, Button, TouchableRipple} from "react-native-paper";
import userImg from '../../../assets/user.svg'

const UserScreen = ({todo, navigation}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    // Temp user data
    const user = isLoggedIn ? {
        avatarUrl: 'https://meowrain.cn/upload/2024/02/photo_2024-02-24_23-24-42.jpg',
        username: 'meowrain'
    } : {
        avatarUrl: 'https://img.ixintu.com/download/jpg/20200905/d286ad90987b5bba8d8aa9320ef5b991_512_512.jpg!con',
        username: "未登陆",
    };
    const handleAvatarPress = () => {
        if (isLoggedIn) {
            // 如果用户已登录，导航到个人信息界面
            navigation.navigate("UserProfile");
        } else {
            // 如果用户未登录，导航到登录页面
            navigation.navigate("Login");
        }
    };
    return (
        <View style={{flex: 1, padding: 25}}>
            {/* 用户信息 */}
            <View style={{alignItems: "center"}} >
                <TouchableRipple onPress={handleAvatarPress}>
                <Avatar.Image
                    size={100}
                    source={{uri: user.avatarUrl}} // Temp avatar url
                    style={{
                        marginBottom: 10
                    }}
                />
                </TouchableRipple>
                <Text>{user.username}</Text>
                {isLoggedIn && <Caption>@{user.username}</Caption>}
            </View>

            {/* Todo统计 */}
            <Card style={{marginTop: 20}}>
                <Card.Title title="Todo统计"/>
                <Card.Content>
                    <Text>你已经完成了 100 条Todo</Text>
                </Card.Content>
            </Card>
            <Button
                icon="plus"
                mode="contained"
                onPress={() => console.log("注销")}
            >
                注销
            </Button>
        </View>
    );
};
export default UserScreen
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
