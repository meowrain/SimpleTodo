import {loadJwt} from "../utils/handleJwt";
import {API_URL} from '@env'

async function getTodos() {
    try {
        const jwtToken = await loadJwt();
        const headers = {'Authorization': jwtToken}
        const response = await fetch(`${API_URL}/todos/all`, {
            method: 'GET',
            headers: headers,
        });
        const resJson = await response.json()
        return resJson.data
    } catch (error) {
        throw new Error(error)
    }
}

/**
 * @function
 * @param {Object} todo
 * @param {string} todo.content - todo内容
 * @param {string} todo.tag - todo tag
 * @param {uint} todo.userID - todo对应的userID
 * @param {uint} todo.status - todo状态
 * @returns  {Promise<void>}
 * */
async function addTodoBackend(todo) {
    try {
        const jwtToken = await loadJwt();
        const headers = {'Authorization': jwtToken, "Content-Type": "application/json"}
        const response = await fetch(`${API_URL}/todos/add`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(todo)
        })
        /** @type {{code: number, data: Object,msg: string}} */
        const resJson = await response.json()
        if (resJson.msg === "Add success!") {
            console.log("添加成功！")
        }
    } catch (err) {
        throw new Error(err)
    }
}

/**
 * @function
 * @param {int} id 要删除的todo id
 * @return {Promise<void>}
 * */
async function deleteTodoFromBackend(id) {
    try {
        const jwtToken = await loadJwt()
        const headers = {'Authorization': jwtToken}
        const response = await fetch(`${API_URL}/todos/delete/${id}`, {
            method: 'DELETE',
            headers: headers
        })
        /** @type {{code: number, data: Object,msg: string}} */
        const resJson = await response.json()
        if (resJson.msg === "todo 删除成功") {
            console.log("删除成功")
        }
    } catch (err) {
        throw new Error(err)
    }
}

/**
 * @function
 * @param {int} id 要更改的todo id
 * @param {Object} todo
 * @return {Promise<void>}
 * */
async function updateTodoFromBackend(id,todo) {
    try {
        const jwtToken = await loadJwt()
        const headers = {'Authorization': jwtToken}
        const response = await fetch(`${API_URL}/todos/update/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(todo)
        });
        /** @type {{code: number, data: Object,msg: string}} */
        const resJson = await response.json()
        if (resJson.msg === "Update success!") {
            console.log("更新成功！")
        }
    } catch (err) {
        throw new Error(err)
    }
}

/**
 * @function
 * @returns {Promise<{count: number}>}
 * */
async function getTodoNumFromBackend() {
    try {
        const jwtToken = await loadJwt()
        const headers = {'Authorization': jwtToken}
        const response = await fetch(`${API_URL}/todos/num`, {
            method: 'GET',
            headers: headers
        })
        /** @type {{code: number,msg: string, data: number}} */
        const resJson = await response.json();
        if (resJson.msg === "Count obtained successfully ") {
            console.log("获取todo数目成功！")
        }
        return {
            count: resJson.data
        }
    } catch (err) {
        throw new Error(err)
    }
}

export {getTodos, getTodoNumFromBackend, addTodoBackend, updateTodoFromBackend, deleteTodoFromBackend}
