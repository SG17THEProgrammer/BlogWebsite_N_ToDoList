import { createContext, useContext ,useState,useEffect} from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState("");


    const storeTokensInLS = (serverToken) => {
        setToken(serverToken)
        return localStorage.setItem("token", serverToken);
      };

      const LogoutUser = () => {
        setToken("");
        localStorage.removeItem("token");
      };



      let isLoggedIn = !!token;
  const userAuthentication = async () => {
    // console.log(isLoggedIn , token)
    if (isLoggedIn){
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/user`, {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`,
        },
      });
      // console.log(response)

      if (response.ok) {
        const data = await response.json();

        setUser(data.userData);
      } else {
        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  }
  };
  
  useEffect(()=>{
    userAuthentication();
  },[isLoggedIn])

return (
    <>
    <AuthContext.Provider value={{ isLoggedIn, storeTokensInLS , user , LogoutUser}}>
      {children}
    </AuthContext.Provider>
    </>
  );
};

export const  useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
      throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
  };