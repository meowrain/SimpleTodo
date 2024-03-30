import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Button } from "react-native";
import { Avatar, Caption } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser, updateUserProfile, UploadImage } from "../../api/user";

const UserProfile = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    gender: '',
    birthday: '',
    email: '',
    phoneNumber: '',
    bio: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getCurrentUser();
        setUserInfo(user);
        setAvatarUrl(`${user.avatar}?${Date.now()}`);
        setFormData({
          username: user.username,
          gender: user.gender,
          birthday: user.birthday,
          email: user.email,
          phoneNumber: user.phoneNumber,
          bio: user.bio
        });
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
      //调用用户图片的API
      uri = result.assets[0].uri;
      mimeType = result.assets[0].mimeType;
      const newAvatarUrl = await UploadImage(uri, mimeType);
      setAvatarUrl(`${newAvatarUrl}?${Date.now()}`);
    }
  };

  const handleEditProfile = () => {
    setEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
       // 调用更新用户信息的 API
      await updateUserProfile(formData); 
      setEditing(false);
    } catch (error) {
      console.error("更新用户信息失败", error);
    }
  };

  const handleChangeText = (key, value) => {
    setFormData({
      ...formData,
      [key]: value
    });
  };
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleUploadAvatar}>
        <Avatar.Image size={100} source={{ uri: avatarUrl }} style={styles.avatar} />
      </TouchableOpacity>
      {userInfo && (
        <View style={styles.userInfo}>
          {editing ? (
            <>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={text => handleChangeText('username', text)}
                placeholder="用户名"
              />
              <TextInput
                style={styles.input}
                value={formData.gender}
                onChangeText={text => handleChangeText('gender', text)}
                placeholder="性别"
              />
              <TextInput
                style={styles.input}
                value={formData.birthday}
                onChangeText={text => handleChangeText('birthday', text)}
                placeholder="生日"
              />
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={text => handleChangeText('email', text)}
                placeholder="邮箱"
              />
              <TextInput
                style={styles.input}
                value={formData.phoneNumber}
                onChangeText={text => handleChangeText('phoneNumber', text)}
                placeholder="电话号码"
              />
              <TextInput
                style={styles.input}
                value={formData.bio}
                onChangeText={text => handleChangeText('bio', text)}
                placeholder="个人简介"
              />
              {/* 其他个人信息的输入框... */}
              <Button title="保存" onPress={handleSaveProfile} />
            </>
          ) : (
            <>
              <Text style={styles.username}>{userInfo.username}</Text>
              <Caption>@{userInfo.username}</Caption>
              <Text style={styles.infoLabel}>性别：</Text>
              <Text style={styles.infoValue}>{userInfo.gender}</Text>
              <Text style={styles.infoLabel}>生日：</Text>
              <Text style={styles.infoValue}>{userInfo.birthday}</Text>
              <Text style={styles.infoLabel}>邮箱：</Text>
              <Text style={styles.infoValue}>{userInfo.email}</Text>
              <Text style={styles.infoLabel}>电话号码：</Text>
              <Text style={styles.infoValue}>{userInfo.phoneNumber}</Text>
              <Text style={styles.infoLabel}>个人简介：</Text>
              <Text style={styles.infoValue}>{userInfo.bio}</Text>
              <Button title="编辑" onPress={handleEditProfile} />
            </>
          )}
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
