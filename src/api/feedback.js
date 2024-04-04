import {loadJwt} from "../utils/handleJwt";
import {API_URL} from '@env'

/**
 * @function incrementHelpful
 * @description 向服务器发送get请求，增加helpless计数
 * @return {Promise<*>}
 * @throws {Error}
 */
async function incrementHelpful() {
    try {
        const jwtToken = await loadJwt();
        const headers = {'Authorization': jwtToken}
        const response = await fetch(`${API_URL}/feedback/helpful`, {
            method: 'GET',
            headers: headers,
        });
        const resJson = await response.json()
        return resJson.data
    } catch (error) {
        throw new Error(error)
    }

    /*
    * 响应示例
{
    "code": 200,
    "data": "Helpful count incremented",
    "msg": ""
}
    *
    * */
}


/**
 * @function incrementHelpless
 * @description 向服务器发送get请求，增加helpful计数
 * @return {Promise<*>}
 * @throws {Error} 如果出现任何错误,将抛出一个 Error 对象
 */
async function incrementHelpless() {
    try {
        const jwtToken = await loadJwt()
        const headers = {'Authorization': jwtToken}
        const response = await fetch(`${API_URL}/feedback/helpless`, {
            method: 'GET',
            headers: headers,
        });
        const resJson = await response.json();
        return resJson.data;
    } catch (err) {
        throw new Error(err)
    }

    /*
    *
    * 响应示例
{
    "code": 200,
    "data": "Helpless count incremented",
    "msg": ""
}
    * */
}

/**
 * @function addComment
 * @description 向服务器发送评论数组
 * @param {Array<Object>} comments - 包含评论对象的数组,每个评论对象应该具有以下结构:
 * @param {string} comments[].text - 评论文本内容
 * @returns {Promise<any>} 服务器响应的数据
 * @throws {Error} 如果出现任何错误,将抛出一个 Error 对象
 */
async function addComment(comments) {
    /*
    * 发送的comments示例
[
  {
    "text": "The app is very user-friendly."
  },
  {
    "text": "I encountered a bug when trying to log out."
  }
]
    * */
    try {
        // console.log(JSON.stringify(comments))
        const jwtToken = await loadJwt()
        const headers = {'Authorization': jwtToken}
        const response = await fetch(`${API_URL}/feedback/add`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(comments)
        });
        const resJson = await response.json()
        console.log(resJson)
        return resJson.data;
    } catch (err) {
        throw new Error(err)
    }
}
export {addComment,incrementHelpful,incrementHelpless}
