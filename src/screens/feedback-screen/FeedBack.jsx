import React from "react";
import {View, StyleSheet, ToastAndroid} from "react-native";
import {Button, Card, Text, TextInput, useTheme} from "react-native-paper";
import {addComment} from "../../api/feedback";


const FeedBackScreen = () => {
    const {colors} = useTheme()
    const [feedbacks, setFeedBacks] = React.useState("")
    return (
        <View style={[styles.container, {backgroundColor: colors.background}]}>
            <Card>
                <Card.Content>
                    <Text variant="titleLarge">反馈您的意见😊</Text>
                </Card.Content>
            </Card>
            <TextInput
                placeholder="请输入您要反馈的信息，您宝贵的意见是我们前进的动力😊"
                multiline={true}
                numberOfLines={10}
                style={styles.textInput}
                onChangeText={(text) => {
                    setFeedBacks(text)
                }}
            ></TextInput>
            <Button mode={"contained"} style={styles.btn} onPress={async () => {
                if (feedbacks.trim() === "") {
                    ToastAndroid.show("😊提交信息不可为空哦~", ToastAndroid.SHORT)
                    return
                }
                const newComments = [{text: feedbacks}]
                let res = await addComment(newComments)
                if (res) {
                    ToastAndroid.show("😊反馈提交成功，感谢您的反馈！", ToastAndroid.SHORT)
                    setFeedBacks(""); // 清空输入框
                } else {
                    ToastAndroid.show("😢反馈提交失败，请重试！", ToastAndroid.SHORT)
                }
            }}>✨提交</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    textInput: {
        marginTop: 10
    },
    btn: {
        marginTop: 10
    }
})
export default FeedBackScreen
