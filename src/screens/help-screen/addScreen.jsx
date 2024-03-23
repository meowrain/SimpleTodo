import React, { useState } from 'react';
import { View, Text, StyleSheet,TouchableOpacity} from "react-native";
import { Divider,useTheme} from "react-native-paper";


export default function addScreen() {

   const { colors } = useTheme();

    const [helpfulClicked, setHelpfulClicked] = useState(false);
    const [notHelpfulClicked, setNotHelpfulClicked] = useState(false);
    
    const handleHelpfulClick = () => {
      setHelpfulClicked(true);

       // 调用一个函数来记录用户反馈
       recordFeedback(true);
    };

    const handleNotHelpfulClick = () => {
      setNotHelpfulClicked(true);

       // 调用一个函数来记录用户反馈
       recordFeedback(false);
    };

    const recordFeedback = (helpful, feedbackText) => {
      // 可以在这里将用户的反馈信息发送到后端进行记录
      // 也可以将反馈信息保存在本地或数据库中
      console.log("用户反馈：", helpful ? "有帮助" : "没帮助", feedbackText);
   };
  
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={styles.title}>如何添加行程？</Text>
            <Divider />
            <Text style={styles.step}>1. 点击+号创建一个新的todo</Text>
            <Text style={styles.step}>2. 在新建的todo里输入你计划的行程</Text>
            <Text style={styles.step}>3. 点击添加就可以添加一个新的行程</Text>
            <Divider />
            <Text style={styles.note}>以上内容是否对你有帮助？</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
            <TouchableOpacity
        
        style={[styles.button, helpfulClicked && styles.buttonClicked]}
        onPress={handleHelpfulClick}
        disabled={helpfulClicked || notHelpfulClicked}
      >
        <Text style={[styles.buttonText,]}>有帮助</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, notHelpfulClicked && styles.buttonClicked]}
        onPress={handleNotHelpfulClick}
        disabled={helpfulClicked || notHelpfulClicked}
      >
        <Text style={[styles.buttonText,]}>没帮助</Text>
      </TouchableOpacity>
            </View>
      </View>
    )
 }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    step:{
      fontSize: 20,
      marginBottom: 20,
      marginTop: 20,
      
    },
    note: {
        fontSize: 15,
        fontStyle: 'italic',
        marginTop: 150,
        flex: 1, 
        paddingHorizontal: 20,
        textAlign: 'center',
        
    },
    button: {
    width: 100, 
    height: 40,
    borderRadius: 30,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 200,
    },
    buttonText: {
      color: 'black',
      fontSize: 16,
    },
    buttonClicked: {
      backgroundColor:'blue',
    },
});