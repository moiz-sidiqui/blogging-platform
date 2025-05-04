import { BrowserRouter as Router, Routes, Route, useLocation} from 'react-router-dom';
import Navbar from './components/common/navbar';
import LogIn from './components/auth/login';
import SignUp from './components/auth/signup';
import Home from './components/pages/home';
import PostBlog from './components/pages/postBlog';
import AboutUS from './components/pages/aboutus';
import Blogs from './components/pages/blogs';
import DetailedBlogPost from './components/blog/blogPost';
import Footer from './components/common/footer';
import ContactUs from './components/pages/contactUs';
import ProtectedRoute from './ProtectedRoute';
import Error404 from './components/pages/error404';
// import { GlobalStateContext } from './contexts/GlobalStateContext';
// import { useContext } from 'react';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}


function AppContent() {
  const location = useLocation();
  // const { isLoggedIn } = useContext(GlobalStateContext);

  const showNavbarAndFooter = () => {
    return location.pathname !== "/" && location.pathname !== "/signup";
  };

  

  return (
    <>
      {showNavbarAndFooter() && <Navbar />}
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<ProtectedRoute> <Home /> </ProtectedRoute>}/>
        <Route path="/postblog" element={<ProtectedRoute> <PostBlog /> </ProtectedRoute>}/>
        <Route path="/aboutus" element={<ProtectedRoute> <AboutUS /> </ProtectedRoute>}/>
        <Route path="/contactus" element={<ProtectedRoute> <ContactUs /> </ProtectedRoute>}/>
        <Route path="/blogs" element={<ProtectedRoute> <Blogs /> </ProtectedRoute>}/>
        <Route path="/blogs/:id" element={<ProtectedRoute> <DetailedBlogPost /> </ProtectedRoute>}/>
        <Route path="*"element={<ProtectedRoute> <Error404 /> </ProtectedRoute>}/>
      </Routes>
      {showNavbarAndFooter() && <Footer />}
      
    </>
  );
}



export default App;
