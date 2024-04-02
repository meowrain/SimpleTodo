import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import {
  Avatar,
  Caption,
  Button,
  List,
  Divider,
  useTheme,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { getCurrentUser, updateUserProfile, UploadImage } from "../../api/user";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../../stores/themeContext";

const UserProfile = ({ navigation }) => {
  const { isDarkModeOn, paperTheme } = React.useContext(ThemeContext);
  const { colors } = useTheme();
  const [userInfo, setUserInfo] = useState({
    username: '',
    gender: '',
    birthday: '',
    email: '',
    phoneNumber: '',
    bio: '',
  });
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [editing, setEditing] = useState(false);
  const [GenderVisible, setGenderModalVisible] = useState(false);
  const [BirthdayVisible, setBirthdayModalVisible] = useState(false);
  const [EmailVisible, setEmailModalVisible] = useState(false);
  const [PhoneNumberVisible, setPhoneNumberModalVisible] = useState(false);
  const [BioVisible, setBioModalVisible] = useState(false);
  const [birthdayInput, setBirthdayInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");
  const [bioInput, setBioInput] = useState("");

  const [formData, setFormData] = useState({
    username: "admin",
    gender: "男",
    birthday: "",
    email: "meowrain@126.com",
    phoneNumber: "",
    bio: "",
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
          bio: user.bio,
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

  //没应用
  const handleSaveProfile = async () => {
    try {
      // 调用更新用户信息的 API
      await updateUserProfile(formData);
      setEditing(false);
    } catch (error) {
      console.error("更新用户信息失败", error);
    }
  };

  //更新数据
  const updateUserInfo = (key, value) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [key]: value,
    }));
  };

  //生日部分
  const handleBirthdayChange = (text) => {
    setBirthdayInput(text);
  };
  const handleBirthdaySubmit = () => {
    updateUserInfo("birthday", birthdayInput);
    setBirthdayModalVisible(false);
    setBirthdayInput(""); // 清空输入框
  };

  //邮箱部分
  const handleEmailChange = (text) => {
    setEmailInput(text);
  };
  const handleEmailSubmit = () => {
    updateUserInfo("email", emailInput);
    setEmailModalVisible(false);
    setEmailInput(""); // 清空输入框
  };

  //电话号码部分
  const handlePhoneNumberChange = (text) => {
    setPhoneNumberInput(text);
  };
  const handlePhoneNumberSubmit = () => {
    updateUserInfo("phoneNumber", phoneNumberInput);
    setPhoneNumberModalVisible(false);
    setPhoneNumberInput(""); // 清空输入框
  };

  //个人简介部分
  const handleBioChange = (text) => {
    setBioInput(text);
  };
  const handleBioSubmit = () => {
    updateUserInfo("bio", bioInput);
    setBioModalVisible(false);
    setBioInput(""); // 清空输入框
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonStyle: {
      marginTop: 20,
    },
    userInfo: {
      alignItems: "baseline",
      paddingLeft: 20
    },
    containerStyle: {
      backgroundColor: paperTheme.colors.background,
      padding: 20,
      margin: 20,
      borderRadius: 20,
    },
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TouchableOpacity onPress={handleUploadAvatar}>
        <Avatar.Image
          size={100}
          source={{ uri: avatarUrl }}
        />
      </TouchableOpacity>
      <List.Section>
        <List.Item
          title={userInfo.username}
          left={(props) => <List.Icon {...props} icon="" />}
        />
      </List.Section>

      <Divider />
      <View style={styles.userInfo}>
        <List.Item
          title={userInfo.gender}
          description="性别"
          left={(props) => (
            <>
              {userInfo.gender === '男' ? <List.Icon {...props} icon="gender-male" /> : <List.Icon {...props} icon="gender-female" />}
            </>
          )}
          right={() => (
            <Button
              icon="chevron-right"
              onPress={() => setGenderModalVisible(true)}
            />
          )}
          onPress={() => setGenderModalVisible(true)}
        />
        <Portal>
          <Modal
            visible={GenderVisible}
            contentContainerStyle={styles.containerStyle}
            theme={paperTheme}
            onRequestClose={() => setGenderModalVisible(false)}
            onDismiss={() => setGenderModalVisible(false)}
          >
            <Picker
              selectedValue={userInfo.gender}
              onValueChange={(itemValue) => {
                updateUserInfo("gender", itemValue);
                setGenderModalVisible(false); // 在选择性别后关闭模态框
              }}
              mode="dialog"
              dropdownIconColor={isDarkModeOn ? 'white' : 'black'}
              prompt="选择您的性别"
              style={{
                color: `${isDarkModeOn ? 'white' : 'black'}`
              }}
            >
              <Picker.Item label="男" value="男" />
              <Picker.Item label="女" value="女" />
            </Picker>
          </Modal>
        </Portal>

        <Divider />

        <List.Item
          title={userInfo.birthday}
          description="生日"
          left={(props) => <List.Icon {...props} icon="calendar" />}
          right={() => (
            <Button
              icon="chevron-right"
              onPress={() => setBirthdayModalVisible(true)}
            />
          )}
          onPress={() => setBirthdayModalVisible(true)}
        />
        <Portal>
          <Modal
            visible={BirthdayVisible}
            contentContainerStyle={styles.containerStyle}
            theme={paperTheme}
            onRequestClose={() => setBirthdayModalVisible(false)}
            onDismiss={() => setBirthdayModalVisible(false)}
          >
            <Text>设置生日</Text>
            <TextInput
              style={styles.input}
              placeholder="自定义生日（YYYY-MM-DD）"
              onChangeText={handleBirthdayChange}
              value={birthdayInput}
            />
            <Button
              icon="calendar"
              mode="contained"
              style={styles.buttonStyle}
              title="确定"
              onPress={handleBirthdaySubmit}
            >
              确定
            </Button>
            <Button
              icon="close"
              mode="outlined"
              style={styles.buttonStyle}
              title="取消"
              onPress={() => setBirthdayModalVisible(false)}
            >
              取消
            </Button>
          </Modal>
        </Portal>
        <Divider />

        <List.Item
          title={userInfo.email}
          description="邮箱"
          left={(props) => <List.Icon {...props} icon="email" />}
          right={() => (
            <Button icon="chevron-right" onPress={setEmailModalVisible} />
          )}
          onPress={setEmailModalVisible}
        />
        <Portal>
          <Modal
            visible={EmailVisible}
            contentContainerStyle={styles.containerStyle}
            theme={paperTheme}
            onRequestClose={() => setEmailModalVisible(false)}
            onDismiss={() => setEmailModalVisible(false)}
          >
            <TextInput
              style={styles.input}
              placeholder="请输入邮箱"
              onChangeText={handleEmailChange}
              value={emailInput}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Button
              icon="email"
              mode="contained"
              style={styles.buttonStyle}
              title="确定"
              onPress={handleEmailSubmit}
            >
              确定
            </Button>
            <Button
              icon="close"
              mode="outlined"
              style={styles.buttonStyle}
              title="取消"
              onPress={() => setEmailModalVisible(false)}
            >
              取消
            </Button>
          </Modal>
        </Portal>
        <Divider />

        <List.Item
          title={userInfo.phoneNumber}
          description="电话号码"
          left={(props) => <List.Icon {...props} icon="phone" />}
          right={() => (
            <Button
              icon="chevron-right"
              onPress={setPhoneNumberModalVisible}
            />
          )}
          onPress={setPhoneNumberModalVisible}
        />
        <Portal>
          <Modal
            visible={PhoneNumberVisible}
            contentContainerStyle={styles.containerStyle}
            theme={paperTheme}
            onRequestClose={() => setPhoneNumberModalVisible(false)}
            onDismiss={() => setPhoneNumberModalVisible(false)}
            onPress={handlePhoneNumberSubmit}
          >
            <TextInput
              style={styles.input}
              onChangeText={handlePhoneNumberChange}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="请输入电话号码"
              value={phoneNumberInput}
              keyboardType="phone-pad"
            />
            <Button
              icon="phone"
              mode="contained"
              style={styles.buttonStyle}
              title="确定"
              onPress={handlePhoneNumberSubmit}
            >
              确定
            </Button>
            <Button
              icon="close"
              mode="outlined"
              style={styles.buttonStyle}
              title="取消"
              onPress={() => setPhoneNumberModalVisible(false)}
            >
              取消
            </Button>
          </Modal>
        </Portal>
        <Divider />

        <List.Item
          title={userInfo.bio}
          description="个人简介"
          left={(props) => <List.Icon {...props} icon="information" />}
          right={() => (
            <Button icon="chevron-right" onPress={setBioModalVisible} />
          )}
          onPress={setBioModalVisible}
        />
        <Portal>
          <Modal
            visible={BioVisible}
            contentContainerStyle={styles.containerStyle}
            theme={paperTheme}
            onRequestClose={() => setBioModalVisible(false)}
            onDismiss={() => setBioModalVisible(false)}
          >
            <TextInput
              style={styles.input}
              placeholder="请输入个人简介"
              onChangeText={handleBioChange}
              value={bioInput}
              multiline={true}
              numberOfLines={4}
              autoCapitalize="sentences"
              autoCorrect={true}
            />
            <Button
              icon="information"
              mode="contained"
              style={styles.buttonStyle}
              title="确定"
              onPress={handleBioSubmit}
            >
              确定
            </Button>
            <Button
              icon="close"
              mode="outlined"
              style={styles.buttonStyle}
              title="取消"
              onPress={() => setBioModalVisible(false)}
            >
              取消
            </Button>
          </Modal>
        </Portal>
        <Divider />
      </View>
      <Button icon="archive" mode="contained" style={{marginTop: 10}} theme={paperTheme} onPress={()=>handleSaveProfile(userInfo)}>保存</Button>
    </View>
  );
};

export default UserProfile;
