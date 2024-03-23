import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { Avatar, Caption } from "react-native-paper";
import { getCurrentUser } from "../../api/user"; // 设置获取用户信息的 API


const UserProfile = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser(); // 获取用户信息，根据实际情况修改
        setUserInfo(user);
        setAvatarUrl(user.avatarUrl); // 从用户信息中获取头像链接
      } catch (error) {
        console.error("加载用户信息失败", error);
      }
    }
    fetchData();
  }, []);

  const handleUploadAvatar = async () => {
    // 实现上传头像功能
    const newAvatarUrl = await uploadAvatar(); // 调用上传头像的 API
    setAvatarUrl(newAvatarUrl); // 更新头像链接
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Avatar.Image size={100} source={{ uri: avatarUrl }} />
      <Button title="上传头像" onPress={handleUploadAvatar} />
      {userInfo && (
        <View>
          <Text>{userInfo.username}</Text>
          <Caption>@{userInfo.username}</Caption>
        </View>
      )}
    </View>
  );
};

export default UserProfile;