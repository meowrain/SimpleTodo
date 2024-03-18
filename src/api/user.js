import { loadJwt } from "../utils/handleJwt";

const url = "http://192.168.4.138:8090";
async function getCurrentUser() {
  try {
    const jwtToken = await loadJwt();
    console.log("获取到的 JWT 令牌:", jwtToken); // 添加这行代码进行调试

    const headers = { "Authorization": jwtToken }; // 修改这里的键名
    const response = await fetch(`${url}/users/info`, {
      method: "GET",
      headers: headers,
    });

    const data = await response.json(); // 获取响应数据
    console.log("获取到的用户信息:", data); // 添加这行代码进行调试

    return data.data; // 返回响应数据
  } catch (error) {
    throw new Error("获取失败", error);
  }
}
export {getCurrentUser}