import storage from "../stores/storage";

/*
* 保存主题状态到本地存储
*
* */

const saveThemeState = async (isDarkModeOn) => {
    try {
        await storage.save({
            key: "isDarkModeOn",
            data: isDarkModeOn,
        });
    } catch (error) {
        console.error("保存主题状态失败", error)
    }
}

/*
* @async
* 加载主题状态
* */

const loadThemeState = async () => {
    try {
        return await storage.load({key: "isDarkModeOn"})
    } catch (error) {
        console.error("加载主题状态失败", error)
    }
}
export {saveThemeState, loadThemeState}