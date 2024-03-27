import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Caption } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser } from "../../api/user";
import { UploadImage } from "../../api/user";
const UserProfile = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        setUserInfo(user);
        setAvatarUrl(`${user.avatar}?${Date.now()}`);
      } catch (error) {
        console.error("加载用户信息失败", error);
      }
    };
    fetchData();
  }, []);

  const handleUploadAvatar = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      // 调用上传图片的 API 将图片上传到服务器
      uri = result.assets[0].uri
      mimeType = result.assets[0].mimeType
      const newAvatarUrl = await UploadImage(uri,mimeType);
      setAvatarUrl(`${newAvatarUrl}?${Date.now()}`);
    }
  };

  return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleUploadAvatar}>
          <Avatar.Image size={100} source={{ uri: avatarUrl }} style={styles.avatar} />
        </TouchableOpacity>
        {userInfo && (
            <View style={styles.userInfo}>
              <Text style={styles.username}>{userInfo.username}</Text>
              <Caption>@{userInfo.username}</Caption>
              <View style={styles.personalInfo}>
                {/* 你可以在这里添加更多的个人信息 */}
              </View>
            </View>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  avatar: {
    marginBottom: 20,
  },
  userInfo: {
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  personalInfo: {
    marginTop: 20,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UserProfile;
