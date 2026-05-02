// client/src/App.jsx
import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Toaster } from "react-hot-toast"

// --- ADD THESE IMPORTS ---
import api from './configs/api' 
import { login, logout, setLoading } from './app/features/authSlice' 
// -------------------------

import Home from './pages/Home'
import Layout from './pages/Layout'
import Dashboard from './pages/Dashboard'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview'
import About from './pages/About'
import Blog from './pages/Blog'
import PrivacyAndTerms from './pages/Privacy'
import Support from './pages/Support'
import ATSCheckerPage from './pages/ATSCheckerPage'
import ATSFeature from './pages/ATSFeature'
import AIRewriter from './pages/AIRewriter'
import Templates from './pages/Templates'
import KeywordAnalysis from './pages/KeywordAnalysis'
import UpdateBanner from './components/home/UpdateModal'

const App = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
        const currentToken = token || localStorage.getItem('token');
        
        if (currentToken) {
            try {
                // Ensure api is imported above
                const { data } = await api.get('/api/users/data', {
                    headers: { Authorization: `Bearer ${currentToken}` }
                });
                if (data.success) {
                    dispatch(login({ user: data.user, token: currentToken })); 
                }
            } catch (error) {
                console.error("Session expired or invalid:", error);
                dispatch(logout());
            } finally {
                // Ensure setLoading is imported above
                dispatch(setLoading(false));
            }
        }
    };
    fetchUserData();
  }, [dispatch, token]);

  return (
    <div className="selection:bg-green-200">
      <Toaster position="top-center" />
      <UpdateBanner />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />}/>
        <Route path='app' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='/ats-checker' element={<ATSCheckerPage />} />
        <Route path='/ats' element={<ATSFeature />} />
        <Route path='/rewriter' element={<AIRewriter />} />
        <Route path='/templates' element={<Templates />} />
        <Route path='/analysis' element={<KeywordAnalysis />} />
        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/privacy' element={<PrivacyAndTerms />} />
        <Route path='/support' element={<Support />} />
      </Routes>
    </div>
  )
}

export default App