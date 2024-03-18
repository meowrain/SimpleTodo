
const [jwt,setJwt] = React.useState('')
React.useEffect(() => {
    const loadJwtToken = async () => {
      try {
        const jwt = await loadJwt();
        setJwt(jwt);
      } catch (error) {
        console.error('加载 JWT 令牌时出错:', error);
      }
    };
  
    loadJwtToken();
  
    // 清理副作用
    return () => {
      // 在这里执行清理操作,如果需要
    };
  }, []);