import React from "react";
import {
    Modal,
    Portal,
    Text,
    Button,
    TextInput,
} from "react-native-paper";
import {StyleSheet} from "react-native";
import {ThemeContext} from "../stores/themeContext";


export default function InputTodo({showModal, hideModal, visible, addTodo}) {
    const themeContext = React.useContext(ThemeContext)
    // console.log(themeContext.paperTheme)
    const [todo, setTodo] = React.useState("")
    const handleAdd = () => {
        addTodo(todo); //将用户添加的待办事项传给addTodo函数
        setTodo(""); //重置输入框
        hideModal();
    };
    const styles = StyleSheet.create({
        containerStyle: {
            backgroundColor: themeContext.paperTheme.colors.background,
            padding: 20,
            margin: 20, //添加外边距使其离屏幕边缘有一定距离
            borderRadius: 20, //添加圆角
        },
        buttonStyle: {
            marginTop: 15
        }
    })
    return (
        <Portal>
            <Modal
                visible={visible}
                onDismiss={hideModal}
                onRquestClose={hideModal}
                contentContainerStyle={styles.containerStyle}
                theme={themeContext.paperTheme}
                animationType="fade"
            >
                <Text>输入你要添加的todo</Text>
                <TextInput label="todo" value={todo} onChangeText={setTodo}/>
                <Button
                    icon="plus"
                    mode="contained"
                    style={styles.buttonStyle}
                    onPress={() => handleAdd()}
                >
                    添加
                </Button>
            </Modal>
        </Portal>
    );
}
