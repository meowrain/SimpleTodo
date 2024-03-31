import React, { useState, useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { List, FAB, Portal, Card, Button, Text } from "react-native-paper";
// import todosData from "../stores/todos.json"; //测试数据
import InputTodo from "./InputTodoModal";
import DeleteTodo from "./DeleteTodoModal";
import UpdateTodo from "./UpdateTodoModal";
import withStorage from "../hoc/withStorage";
import PinTodoModal from "./PinTodoModal";
import TimeTodoModal from "./TimeTodoModal";
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from "../stores/themeContext";
const TodoLists = ({ todos, addTodo, updateTodo, deleteTodo, pinTodo, reloadPage }) => {

    //添加部分
    const [addModalVisible, setAddModalVisible] = useState(false);
    const showAddModal = () => setAddModalVisible(true);
    const hideAddModal = () => setAddModalVisible(false);

    //更新部分
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState('');
    const hideUpdateModal = () => setUpdateModalVisible(false);
    const showUpdateModal = (task) => {
        setTaskToUpdate(task);
        setUpdateModalVisible(true);
    };

    //删除部分
    const [dialogVisible, setDialogVisible] = useState(false);
    const [currentTodoId, setCurrentTodoId] = useState(null);
    const showDeleteDialog = (id) => {
        setCurrentTodoId(id);
        setDialogVisible(true);
    };
    const hideDeleteDialog = () => setDialogVisible(false);

    //置顶部分
    const [pinDialogVisible, setPinDialogVisible] = useState(false)
    const [todoToPin, setTodoToPin] = useState(null);
    const showPinDialog = (todo) => {
        // console.log(todo)
        setTodoToPin(todo)
        setPinDialogVisible(true)
    }
    const hidePinDialog = () => setPinDialogVisible(false)

    //提醒部分
    const [timeModalVisible, setTimeModalVisible] = useState(false);
    const [todoToSetReminder, setTodoToSetReminder] = useState('');
    const showTimeDialog = (content) => {
        setTodoToSetReminder(content);
        setTimeModalVisible(true);
    }
    const hideTimeDialog = () => setTimeModalVisible(false);

    //处理头顶标题样式
    const { isDarkModeOn, toggleTheme } = useContext(ThemeContext)
    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                ListHeaderComponent={<View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}><AntDesign name="checkcircleo" size={22} color={isDarkModeOn ? 'white' : 'black'} /><List.Section title="Todo App" titleStyle={{ fontSize: 18 }}></List.Section></View>}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card onLongPress={() => showPinDialog(item)} style={styles.card}>
                        <Card.Content>
                            <Text style={{
                                lineHeight: 24, // 增加行高
                                textAlign: 'justify', // 文本对齐方式
                                padding: 10, // 增加内边距
                            }} variant="bodyLarge">{item.content}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => showUpdateModal(item.content)}>修改</Button>
                            <Button onPress={() => showDeleteDialog(item.id)}>删除</Button>
                            <Button onPress={() => showTimeDialog(item.content)}>设置提醒</Button>
                        </Card.Actions>
                    </Card>
                )}
            />
            <InputTodo
                showModal={showAddModal}
                hideModal={hideAddModal}
                visible={addModalVisible}
                addTodo={addTodo}
            />
            <UpdateTodo
                hideModal={hideUpdateModal}
                visible={updateModalVisible}
                updateTodo={(newTask) => updateTodo(newTask, taskToUpdate)}
                taskToUpdate={taskToUpdate}
            />
            <DeleteTodo
                visible={dialogVisible}
                hideDialog={hideDeleteDialog}
                onDelete={() => deleteTodo(currentTodoId)}
            />
            <PinTodoModal
                visible={pinDialogVisible}
                hideDialog={hidePinDialog}
                onPin={pinTodo}
                todoToPin={todoToPin}
            />
            {/*<Button onPress={async()=>{await clearTodos()}}>删除</Button>*/}
            <TimeTodoModal
                visible={timeModalVisible}
                hideDialog={hideTimeDialog}
                showDialog={showTimeDialog}
                todoToSetReminder={todoToSetReminder}
            />
            <Portal.Host>
                <FAB style={styles.fab} icon="plus" onPress={showAddModal} />
                <FAB style={styles.reload} icon="reload" onPress={reloadPage} />
            </Portal.Host>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    fab: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 0,
    },
    reload: {
        position: "absolute",
        margin: 16,
        right: 0,
        bottom: 100,
    },
    card: {
        elevation: 5, // 添加阴影
        borderRadius: 20, // 圆角
        marginBottom: 20, // 间隔
        marginLeft: 15, // 间隔
        marginRight: 15, // 间隔
    }
});

export default withStorage(TodoLists);
