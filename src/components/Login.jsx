import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input, Logo } from '../components'
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin({ userData }));
        navigate("/")
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="flex items-center justify-center w-full min-h-[70vh]">
      <div className="mx-auto w-full max-w-lg glass rounded-2xl p-10 border border-slate-700/30">
        <div className="mb-6 flex justify-center">
          <Logo width="100px" />
        </div>

        <h2 className="text-center text-3xl font-bold leading-tight text-slate-100 mb-2">Sign in to your account</h2>
        <p className="text-center text-sm text-slate-400 mb-6">
          Don't have an account?
          <Link to="/signup" className="ml-2 text-sky-300 hover:text-sky-200 font-medium">Sign Up</Link>
        </p>

        {error && <p className="text-red-400 mt-2 text-center">{error}</p>}

        <form onSubmit={handleSubmit(login)} className="mt-4">
          <div className="space-y-4">
            <Input label="Email" placeholder="you@domain.com" type="email" {...register("email", { required: true })} />
            <Input label="Password" placeholder="••••••••" type="password" {...register("password", { required: true })} />
            <Button type="submit" className="w-full">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;