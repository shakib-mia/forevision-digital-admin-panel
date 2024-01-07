import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login/Login.jsx'
import Home from './pages/Home/Home.jsx'
import RequireAuth from './RequireAuth.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequireAuth>
      <Home />
    </RequireAuth>,
  },

  {
    path: "/login",
    element: <Login />,
  },
]);
// console.log(!localStorage.getItem('token').length);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
