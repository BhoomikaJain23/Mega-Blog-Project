import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import './App.css'
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice"
import Footer from "./components/Footer/Footer.jsx"
import Header from './components/Header/Header.jsx'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) dispatch(login(userData))
        else dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className="min-h-screen text-slate-100 bg-gradient-to-r from-slate-900 to-slate-700">
      <div className="w-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 px-4 py-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App