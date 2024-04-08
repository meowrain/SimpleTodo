import React, { useState, useEffect, useContext } from 'react';
import storage from "../stores/storage";
import { addTodoBackend, deleteTodoFromBackend, getTodos, updateTodoFromBackend } from "../api/todo";
import { getCurrentUser } from "../api/user";
import { loadLoginState, saveLogoutState } from "../utils/handleLoginState";
import { UserStateContext } from '../stores/userStateContext';
const withStorage = (WrappedComponent) => {
    const WithStorageComponent = (props) => {
        const [todos, setTodos] = useState([]);
        // const {isLoggedIn} = useContext(UserStateContext);

        useEffect(() => {
            const checkLogin = async () => {
                // console.log("checkLogin",isLoggedIn);
                const isLoggedIn = await loadLoginState();
                if (isLoggedIn) {
                    await fetchTodos();
                } else {
                    const savedTodos = await loadTodosFromStorage();
                    setTodos(savedTodos);
                }
            };
            const unsubscribe = props.navigation.addListener('focus', checkLogin);
            return () => unsubscribe;
            
        }, [props.navigation]);

        const fetchTodos = async () => {
            try {
                const todosFromDB = await getTodos();
                const todos = todosFromDB.map(item => ({
                    userID: item.userID,
                    content: item.content,
                    status: item.status,
                    id: item.ID,
                }));
                setTodos(todos);
                await saveTodos(todos);
            } catch (err) {
                console.error("Failed to fetch todos", err);
            }
        };
        useEffect(() => {
            const cleanupStorage = async () => {
                try {
                    await storage.remove({ key: "todos" });
                    await storage.remove({ key: "tempTodos" });
                    // 如果需要,可以移除其他存储的数据
                } catch (error) {
                    console.error("Failed to clean up storage", error);
                }
            };
            return cleanupStorage;
        }, []);
        const addTodo = async (task) => {
            const isLoggedIn = await loadLoginState();
            const userInfo = await getCurrentUser();
            const newTodo = {
                id: null,
                content: task,
                userID: userInfo.ID,
                status: 0,
                tag: ''
            };

            if (isLoggedIn) {
                try {
                    // 后端处理新待办事项并且返回包含新id的待办事项
                    const addedTodo = await addTodoBackend(newTodo);
                    // 确保后端返回了有效的 addedTodo 对象
                    if (addedTodo && addedTodo.ID) {
                        // 更新前端的待办事项
                        newTodo.id = addedTodo.ID;
                        const newTodos = [...todos, newTodo];
                        setTodos(newTodos);
                        await saveTodos(newTodos);
                    } else {
                        console.error('Failed to add todo, invalid response from backend');
                    }
                } catch (err) {
                    console.error("Failed to add todo", err);
                }
            } else {
                newTodo.id = todos.length ? todos[todos.length - 1].id + 1 : 1;
                const newTodos = [...todos, newTodo];
                setTodos(newTodos);
                await saveTodos(newTodos);
            }
        };

        const updateTodo = async (newContent, oldContent) => {
            const updatedTodos = todos.map(todo =>
                todo.content === oldContent ? { ...todo, content: newContent } : todo
            );
            setTodos(updatedTodos);
            await saveTodos(updatedTodos);
            const isLoggedIn = await loadLoginState();
            if (isLoggedIn) {
                // 找到要更新的 todo 的 id
                const todoToUpdate = updatedTodos.find(todo => todo.content === newContent);
                if (todoToUpdate) {
                    await updateTodoFromBackend(todoToUpdate.id, { content: newContent });
                } else {
                    console.error('未找到要更新的todo');
                }
            }
        };

        const deleteTodo = async (id) => {

            const updatedTodos = todos.filter(todo => todo.id !== id);
            setTodos(updatedTodos);
            await saveTodos(updatedTodos);
            const isLoggedIn = await loadLoginState();
            if (isLoggedIn) {
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
                const savedTodos = await storage.load({ key: 'todos' });
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
                await storage.remove({ key: "todos" });
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
                    await storage.remove({ key: 'tempTodos' }); // 清空临时保存的待办事项
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
                const tempTodos = await storage.load({ key: 'tempTodos' });
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
                await saveLogoutState();
                // 清空本地存储中的 todos 数据
                await clearTodos();
            
            } catch (error) {
                console.error('Failed to handle logout', error);
            }
        };
        const reloadPage = async () => {
            const isLoggedIn = await loadLoginState();
            if (!isLoggedIn) {
                try {
                    const todosFromStorage = await loadTodosFromStorage()
                    setTodos(todosFromStorage)
                } catch (err) {
                    console.error(err)
                }
            } else {
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
