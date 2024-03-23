import { View, Text, StyleSheet} from "react-native";
import { Divider,useTheme,Button} from "react-native-paper";


export default function timeScreen() {

   const { colors } = useTheme();
   const handleHelpful = () => {
    // 处理用户点击“有帮助”按钮的逻辑，比如增加相关计数或其他操作
    console.log("用户认为有帮助");
  };
  
  const handleNotHelpful = () => {
    // 处理用户点击“没帮助”按钮的逻辑，比如减少相关计数或其他操作
    console.log("用户认为没帮助");
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
           <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 20, marginHorizontal: 10 }}>
      <Button mode="contained" onPress={handleHelpful}>有帮助</Button>
      <Button mode="outlined" onPress={handleNotHelpful}>没帮助</Button>
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
        marginTop: 30,
        flex: 1, 
        paddingHorizontal: 20,
    }
});