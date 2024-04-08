import React, {useEffect, useState, useContext} from "react";
import {View} from "react-native";
import {Avatar, Button, Caption, Card, Text, TouchableRipple} from "react-native-paper";
import {loadLoginState, saveLogoutState} from "../../utils/handleLoginState";
import {getCurrentUser} from "../../api/user";
import withStorage from "../../hoc/withStorage";
import {getTodoNumFromBackend} from "../../api/todo";
import {UserStateContext} from "../../stores/userStateContext";
import unloginImage from '../../../assets/unlogin.jpg'
const UserScreen = ({logoutHandler, navigation}) => {
    const {needUpdateUserInfo, setNeedUpdateUserInfo} = useContext(UserStateContext)
    console.log("是否需要更新？",needUpdateUserInfo)
    const [userInfo, setUserInfo] = useState({
        username: '未登录',
        gender: '',
        birthday: '',
        email: '',
        phonenumber: '',
        bio: '',
    });
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [todoNum, setTodoNum] = useState(0)
    useEffect(() => {

        const fetchData = async () => {
            try {
                const loginState = await loadLoginState();
                setIsLoggedIn(loginState)
                if (loginState) {
                    const user = await getCurrentUser()
                    setUserInfo({
                        ...user, // 取出原有的 user 对象的所有属性
                        avatar: `${user.avatar}?${Date.now()}` // 使用修改后的 avatar 替换原有的 avatar 属性
                      });
                    const TodoNum = await getTodoNumFromBackend()
                    setTodoNum(TodoNum.count)
                    setNeedUpdateUserInfo(false)
                }else {
                    setUserInfo({
                        username: '未登录',
                        gender: '',
                        birthday: '',
                        email: '',
                        phonenumber: '',
                        bio: '',
                        avatar: unloginImage // 设置为本地图像资源
                    });
                }
            } catch (error) {
                console.error("加载用户失败", error)
            }
        }
        if(needUpdateUserInfo){
            fetchData()
        }
    }, [needUpdateUserInfo,isLoggedIn]);

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
            <View style={{alignItems: "center"}}>
                <TouchableRipple onPress={handleAvatarPress}>
                    <Avatar.Image
                        size={100}
                        source={isLoggedIn ? { uri: userInfo.avatar } : unloginImage}
                        style={{
                            marginBottom: 10
                        }}
                    />
                </TouchableRipple>
                <Text>{userInfo.username}</Text>
                {isLoggedIn && <><Caption> @{userInfo.username} | {userInfo.gender} | {userInfo.birthday} </Caption>
                    <Caption>邮箱：{userInfo.email}</Caption>
                    <Caption>个人简介：{userInfo.bio}</Caption></>}
            </View>

            {/* Todo统计 */}
            <Card style={{marginTop: 20}}>
                <Card.Title title="Todo统计"/>
                <Card.Content>
                    <Text>你已经添加了 {todoNum} 条Todo</Text>
                </Card.Content>
            </Card>

            {!isLoggedIn ? <Button icon="plus"
                                   mode="contained"
                                   onPress={() => {
                                       navigation.navigate("Login")
                                   }}>登录</Button> : <Button
                icon="plus"
                mode="contained"
                onPress={async () => {
                    await logoutHandler(); // 先调用 logoutHandler
                    setIsLoggedIn(false); // 然后设置登录状态为 false
                    setTodoNum(0)
                    setUserInfo({
                        username: '未登录',
                        gender: '',
                        birthday: '',
                        email: '',
                        phonenumber: '',
                        bio: '',
                        avatar: unloginImage
                    }); // 并将用户信息设置为 null
                }}
                style={{
                    marginTop: 10
                }}
            >
                注销
            </Button>}

        </View>
    );
};

export default withStorage(UserScreen)
