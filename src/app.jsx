import { Routes, Route, Navigate } from "react-router"
import AuthLayout from "./layouts/AuthLayout"
import HomeLayout from "./layouts/HomeLayout"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Entry from "./pages/Entry"

const  App = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/" element={<AuthLayout/>}>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Route>

      <Route path="/home" element={<HomeLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="entry" element={<Entry/>}/>
        <Route path="update/:id" element={<Entry isUpdate/>}/>
      </Route>

    </Routes>
  )
}

export default App