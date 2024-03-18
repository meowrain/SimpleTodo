const url = "http://127.0.0.1:8090";
function getCurrentUser() {
    const jwtToken = "your_jwt_token_here"; // 替换为您的 JWT 令牌
    const headers = { "Authorization:": jwtToken }
    fetch(`${url}/users`, {
        method: 'GET',
        headers: headers
    })
}