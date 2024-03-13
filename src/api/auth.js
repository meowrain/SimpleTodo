const url = "192.168.4.138:8090";
/**
 *
 * @param {Object} userData
 * @param {string} userData.username - 用户名
 * @param {string} userData.password - 密码
 * @returns {Promise<void>} 一个 Promise,在请求完成后解析
 */
function registerQuery(userData) {
  fetch(`http://${url}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

/**
 *
 * @param {Object} userData
 * @param {string} userData.username - 用户名
 * @param {string} userData.password - 密码
 * @returns {Promise<void>} 一个 Promise,在请求完成后解析
 */
function loginQuery(userData) {
  fetch(`http://${url}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error", error));
}
export { registerQuery,loginQuery };
