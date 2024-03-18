import storage from "../stores/storage"

const saveJwt = async(jwtToken)=>{
    try {
        await storage.save({
            key: "jwtToken",
            data: jwtToken
        });
    }catch(err) {
        console.error("保存jwt数据失败",err)
    }
}

const loadJwt = async()=>{
    try{
       const jwtToken = await storage.load({key:"jwtToken"});
       if (jwtToken) {
            return jwtToken;
       }
    }catch(err) {
        console.error("加载jwt失败",err)
    }
}
export {saveJwt,loadJwt}