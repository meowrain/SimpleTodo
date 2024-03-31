import { saveJwt, loadJwt } from "../utils/handleJwt";
import {API_URL} from '@env'
/**
 *
 * @param {Object} userData
 * @param {string} userData.username - 用户名
 * @param {string} userData.password - 密码
 * @returns {Promise<void>} 一个 Promise,在请求完成后解析
 */
async function registerQuery(userData) {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resJson = await response.json();
    if (resJson.msg === "success") {
      console.log("注册成功！");
      return resJson.data;
    }
  } catch (error) {
    throw error; // 重新抛出错误以便被捕获
  }
}

/**
 *
 * @param {Object} userData
 * @param {string} userData.username - 用户名
 * @param {string} userData.password - 密码
 * @returns {Promise<void>} 一个 Promise,在请求完成后解析
 */
async function loginQuery(userData) {
  try {
    const response = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const resJson = await response.json();

    if (resJson.msg !== "登录失败") {
      // console.log(`jwtToken: ${resJson.data}`);
      await saveJwt(resJson.data);
      return resJson.data; // 返回 JWT 令牌
    } else {
      throw new Error("登录失败,请检查用户名和密码");
    }
  } catch (error) {
    throw error; // 重新抛出错误以便被捕获
  }
}

export { registerQuery, loginQuery };
