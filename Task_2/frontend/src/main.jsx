import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './components/Auth.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer.jsx';
import { ScrollProvider } from './context/ScrollContext.jsx';

createRoot(document.getElementById('root')).render(
  <>
  <AuthProvider>
  <ScrollProvider>
    <App />
    <ToastContainer
                position="top-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                draggable
                theme="light"
                bodyClassName="toastBody"

            />
  {/* <Footer></Footer> */}
  </ScrollProvider>
  </AuthProvider>
  </>
)
