import { createFileRoute } from '@tanstack/react-router'
import Register from '../components/Register'
import Login from '../components/Login'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="p-2">
      {isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin} /> : <Register isLogin={isLogin} setIsLogin={setIsLogin} />}
    </div>
  )
}