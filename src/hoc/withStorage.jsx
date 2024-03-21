import React, {useState, useEffect} from 'react';
import storage from "../stores/storage";
import {addTodoBackend, deleteTodoFromBackend, getTodos, updateTodoFromBackend} from "../api/todo";
import {getCurrentUser} from "../api/user";
import {loadLoginState} from "../utils/handleLoginState";

const withStorage = (WrappedComponent) => {
    const WithStorageComponent = (props) => {
        const [todos, setTodos] = useState([]);
        const [userID, setUserID] = useState(null);
        const [loginStatus, setLoginStatus] = useState(false);

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const loginState = await loadLoginState();
                    if (loginState) {
                        const userInfo = await getCurrentUser();
                        setUserID(userInfo.ID);
                        const todosFromDB = await getTodos();
                        const todos = todosFromDB.map(item => ({
                            userID: item.userID,
                            content: item.content,
                            status: item.status,
                            id: item.ID,
                        }));
                        setTodos(todos);
                    } else {
                        const savedTodos = await loadTodosFromStorage();
                        setTodos(savedTodos);
                    }
                } catch (err) {
                    console.error("Failed to fetch data", err);
                }
            };
            fetchData();
        }, []);

        useEffect(() => {
            const loadData = async () => {
                try {
                    const loginState = await loadLoginState();
                    setLoginStatus(loginState);
                    if (loginState) {
                        await fetchTodos();
                    }
                } catch (err) {
                    console.error("Failed to load data", err);
                }
            };
            const unsubscribe = props.navigation.addListener('focus', loadData);
            return () => unsubscribe;
        }, [props.navigation]);
        useEffect(() => {
            if (loginStatus) {
                try{
                    mergeTodosOnLogin();
                }catch (err) {
                    console.error(err)
                }
            }
        }, [loginStatus]);
        const fetchTodos = async () => {
            try {
                const todosFromDB = await getTodos();
                const todos = todosFromDB.map(item => ({
                    userID: item.userID,
                    content: item.content,
                    status: item.status,
                    id: item.ID,
                }));
                await saveTodos(todos);
                setTodos(todos);
            } catch (err) {
                console.error("Failed to fetch todos", err);
            }
        };
        useEffect(() => {
            const cleanupStorage = async () => {
                try {
                    await storage.remove({key: "todos"});
                    await storage.remove({key: "tempTodos"});
                    // 如果需要,可以移除其他存储的数据
                } catch (error) {
                    console.error("Failed to clean up storage", error);
                }
            };
            return cleanupStorage;
        }, []);
        const addTodo = async (task) => {
            const newTodo = {
                id: todos.length ? todos[todos.length - 1].id + 1 : 1,
                content: task,
                userID,
                status: 0, // Set default status to 0 (uint)
                tag: '' // 添加一个空字符串作为 tag 属性的默认值
            };
            const newTodos = [...todos, newTodo];
            setTodos(newTodos);
            await saveTodos(newTodos);
            if (loginStatus) {
                await addTodoBackend(newTodo);
            }
        };
        const updateTodo = async (newContent, oldContent) => {
            const updatedTodos = todos.map(todo =>
                todo.content === oldContent ? {...todo, content: newContent} : todo
            );
            setTodos(updatedTodos);
            await saveTodos(updatedTodos);

            if (loginStatus) {
                // 找到要更新的 todo 的 id
                const todoToUpdate = updatedTodos.find(todo => todo.content === newContent);
                if (todoToUpdate) {
                    await updateTodoFromBackend(todoToUpdate.id, {content: newContent});
                } else {
                    console.error('未找到要更新的todo');
                }
            }
        };

        const deleteTodo = async (id) => {
            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
            await saveTodos(updatedTodos);
            if (loginStatus) {
                await deleteTodoFromBackend(id)
            }
        };

        const moveTodoToTop = async (todo) => {
            const updatedTodos = [...todos.filter(t => t.id !== todo.id), todo];
            setTodos(updatedTodos);
            await saveTodos(updatedTodos);
        };

        const saveTodos = async (todos) => {
            try {
                await storage.save({
                    key: "todos",
                    data: todos,
                });
            } catch (error) {
                console.error("Failed to save todos", error);
            }
        };

        const loadTodosFromStorage = async () => {
            try {
                const savedTodos = await storage.load({key: 'todos'});
                return savedTodos || [];
            } catch (error) {
                if (error.name === 'NotFoundError') {
                    // 如果本地存储中没有 'todos' 键值对,返回空数组
                    return [];
                } else {
                    console.error('Failed to load todos from storage', error);
                    return [];
                }
            }
        };

        const clearTodos = async () => {
            try {
                await storage.remove({key: "todos"});
                setTodos([]); // 重置 todos 状态为空数组
            } catch (error) {
                console.error("Failed to clear todos", error);
            }
        };
        const mergeTodosOnLogin = async () => {
            try {
                const tempTodos = await loadTempTodosFromStorage();
                const savedTodos = await loadTodosFromStorage();

                if (tempTodos !== null && tempTodos.length > 0) {
                    await clearTodos(); // 清空之前的待办事项列表
                    const mergedTodos = tempTodos.map(tempTodo => ({
                        ...tempTodo,
                        userID: userID,
                    }));
                    // 将临时保存的待办事项发送到后端
                    await Promise.all(mergedTodos.map(async todo => {
                        await addTodoBackend(todo);
                    }));
                    await storage.remove({key: 'tempTodos'}); // 清空临时保存的待办事项
                } else if (savedTodos.length > 0) {
                    // 如果没有临时待办事项,但有之前保存的待办事项,则合并之前的待办事项
                    await clearTodos(); // 清空之前的待办事项列表
                    const mergedTodos = savedTodos.map(todo => ({
                        ...todo,
                        userID: userID,
                    }));
                    // 将之前保存的待办事项发送到后端
                    await Promise.all(mergedTodos.map(async todo => {
                        await addTodoBackend(todo);
                    }));
                }

                await fetchTodos(); // 从后端获取最新的待办事项列表
            } catch (error) {
                console.error("Error merging todos on login", error);
            }
        };
        const loadTempTodosFromStorage = async () => {
            try {
                const tempTodos = await storage.load({key: 'tempTodos'});
                console.log(tempTodos)
                return tempTodos || null;
            } catch (error) {
                if (error.name === 'NotFoundError') {
                    // 如果本地存储中没有 'tempTodos' 键值对,返回 null
                    return null;
                } else {
                    console.error('Failed to load tempTodos from storage', error);
                    return null;
                }
            }
        };
        const logoutHandler = async () => {
            try {
                // 清空本地存储中的 todos 数据
                await clearTodos();
                // 设置登录状态为 false
                setLoginStatus(false);
            } catch (error) {
                console.error('Failed to handle logout', error);
            }
        };
        const reloadPage = async()=>{
            if(!loginStatus) {
                try{
                    const todosFromStorage = await loadTodosFromStorage()
                    setTodos(todosFromStorage)
                }catch (err) {
                    console.error(err)
                }
            }else {
                    const userInfo = await getCurrentUser();
                    setUserID(userInfo.ID);
                    const todosFromDB = await getTodos();
                    const todos = todosFromDB.map(item => ({
                        userID: item.userID,
                        content: item.content,
                        status: item.status,
                        id: item.ID,
                    }));
                    setTodos(todos);
            }
        }

        return (
            <WrappedComponent
                todos={todos}
                addTodo={addTodo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
                moveTodoToTop={moveTodoToTop}
                clearTodos={clearTodos}
                mergeTodosOnLogin={mergeTodosOnLogin}
                logoutHandler={logoutHandler}
                reloadPage={reloadPage}
                {...props}
            />
        );
    };

    return WithStorageComponent;
};

export default withStorage;
