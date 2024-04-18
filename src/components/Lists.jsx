import React, { useState, useContext, useEffect } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { List, FAB, Portal, Card, Button, Text } from "react-native-paper";
// import todosData from "../stores/todos.json"; //测试数据
import InputTodo from "./InputTodoModal";
import DeleteTodo from "./DeleteTodoModal";
import UpdateTodo from "./UpdateTodoModal";
import withStorage from "../hoc/withStorage";
// import PinTodoModal from "./PinTodoModal";
import TimeTodoModal from "./TimeTodoModal";
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from "../stores/themeContext";

const TodoLists = ({ todos, addTodo, updateTodo, deleteTodo, pinTodo, reloadPage, }) => {

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
    // const [pinDialogVisible, setPinDialogVisible] = useState(false)
    // const [todoToPin, setTodoToPin] = useState(null);
    // const showPinDialog = (todo) => {
    //     // console.log(todo)
    //     setTodoToPin(todo)
    //     setPinDialogVisible(true)
    // }
    // const hidePinDialog = () => setPinDialogVisible(false)

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
    const [currentDate, setCurrentDate] = useState(new Date());

    // 根据当前日期获取月份和周
    const month = currentDate.toLocaleString('default', { month: 'long' });
    const date = currentDate.getDate();
    const week = currentDate.toLocaleString('default', { weekday: 'long' });

    /*  const fetchTodoList = async () => {
        try {
            const response = await fetch(`${API_URL}/todos/add`);
            if (!response.ok) {
                throw new Error("无法获取todo列表");
            }
            const todoListData = await response.json();
            setTodos(todoListData);
        } catch (error) {
            setError(error.message);
        } 
    }; */
    
    useEffect(() => {
        // 在组件加载时调用后端 API 来获取 todo 数据
        // fetchTodoList();
        const timerID = setInterval(() => tick(), 1000);
        return () => {
            clearInterval(timerID);
        };
    }, []);
    const tick = () => {
        setCurrentDate(new Date());
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={todos}
                ListHeaderComponent={
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    <AntDesign style={{fontWeight: 'bold', marginRight: 10 }} name="calendar" size={20} color={isDarkModeOn ? 'white' : 'black'} />
                    <List.Section title="Simple Todo" titleStyle={{ fontSize: 20, fontWeight: 'bold'}}></List.Section>
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>{date}</Text>
                    <View style={styles.weekdayContainer}>
                        <Text style={styles.month}>{month} | </Text>
                        <Text style={styles.week}>周{week === '星期日' ? '日' : week === '星期一' ? '一' : week === '星期二' ? '二' : week === '星期三' ? '三' : week === '星期四' ? '四' : week === '星期五' ? '五' : '六'}</Text>
                    </View>
                    </View>
        </View>}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                        <Card.Content>
                            <Text style={{
                                lineHeight: 20, // 增加行高
                                textAlign: 'justify', // 文本对齐方式
                                padding: 4, // 增加内边距
                            }} variant="bodyLarge">{item.content}</Text>
                        </Card.Content>
                        <Card.Actions>
                        <TouchableOpacity onPress={() => showUpdateModal(item.content)}>
                        <AntDesign name="edit" size={22} color={isDarkModeOn ? 'white' : 'black'} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showDeleteDialog(item.id)}>
                        <AntDesign name="delete" size={22} color={isDarkModeOn ? 'white' : 'black'} style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => showTimeDialog(item.content)}>
                        <AntDesign name="clockcircleo" size={22} color={isDarkModeOn ? 'white' : 'black'} style={styles.icon} />
                        </TouchableOpacity>
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
            {/* <PinTodoModal
                visible={pinDialogVisible}
                hideDialog={hidePinDialog}
                onPin={pinTodo}
                todoToPin={todoToPin}
            /> */}
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
        elevation: 10, // 添加阴影
        borderRadius: 10, // 圆角
        marginTop: 5,
        marginBottom: 6, // 间隔
        marginLeft: 10, // 间隔
        marginRight: 10, // 间隔
    },
    dateContainer: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    date: {
        fontSize: 26,
        fontWeight: 'bold',
        marginRight: 5,
    },
    month: {
        fontSize: 6,
        color: '#999999',
    },
    weekdayContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    week: {
        color: '#999999',
        fontSize: 6,
    },
    icon: {
        marginRight: 20, // 可根据需要调整图标与相邻元素之间的间距
    },
});

export default withStorage(TodoLists);
