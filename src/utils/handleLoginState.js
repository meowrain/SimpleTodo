import storage from "../stores/storage";

const saveLoginState = async()=>{
    try {
        await storage.save({
            key:"loginState",
            data: true
        });
    }catch(err) {
        console.error("保存登陆状态失败",err)
    }
}
const saveLogoutState = async()=>{
    try {
        await storage.save({
            key:"loginState",
            data: false
        })
    }catch(err) {
        console.error("保存登出状态失败",err)
    }
}
const loadLoginState = async()=>{
    try{
        const loginState = await storage.load({key:"loginState"});
        if(loginState === undefined) {
            return false
        }
        return loginState
    }catch(err) {
        console.error("加载登陆状态失败",err)
    }
}
export {saveLoginState,saveLogoutState,loadLoginState}