import storage from "../stores/storage";

/**
 * 保存todos到本地存储
 * @async
 * @param {Array.<{id: number, task: string}>} todos - todo数组
 * @param {number} todos[].id - todo的id
 * @param {string} todos[].task - todo的内容
 */
const saveTodos = async (todos) => {
  try {
    await storage.save({
      key: "todos",
      data: todos,
    });
  } catch (error) {
    console.error("保存文件失败", error);
  }
};

/**
 * @async
 * @param {function} setTodos 
 * 
 */
const loadTodos = async(setTodos)=>{
    try {
        const savedTodos = await storage.load({key:'todos'});
        if (saveTodos) {
            setTodos(savedTodos)
        }
    }catch(error) {
        console.error("加载todo失败",error);
    }
}
export { saveTodos,loadTodos };
