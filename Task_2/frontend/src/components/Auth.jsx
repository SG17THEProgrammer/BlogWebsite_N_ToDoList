import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState("");
  const [plan, setPlan] = useState()
  const [articles, setArticles] = useState()
  const [allBlogs, setAllBlogs] = useState()


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
    if (isLoggedIn) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API}/user`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

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
    else {
      console.log("You are not logged in")
    }
  };

  const getPlan = async () => {
    try {
      const { data: response } = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/getPlan`, {
        email: user?.email
        // email:"shray3@gmail.com"
      }
      );

      console.log(response);
      setPlan(response.plan)
      setArticles(response.article)
    } catch (error) {
      console.log(error)
    }
  }

  const getAllBlogs = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_API}/getAllBlogs`, {
        method: 'GET'
      })

      const resData = await res.json();

      setAllBlogs(resData.allBlogs)

    } catch (error) {
      console.log(error)
    }
  }

  const smoothScrooling = () => {
    window.scrollTo({ top: "0", behavior: "smooth" })
  }


  useEffect(() => {
    getAllBlogs();
    userAuthentication();
    getPlan()
  }, [])

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, storeTokensInLS, user, LogoutUser, plan, articles, allBlogs, smoothScrooling }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};