import { useNavigate } from "react-router"

const Login = () => {
    const navigate = useNavigate()
    return (
        <div>
            <p>Login</p>
            <label htmlFor="">Email</label>
            <br />
            <input type="text" />
            <br />
            <br />
            <label htmlFor="">Password</label>
            <br />
            <input type="text" />
            <br />
            <br />
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/register')}>Register</button>
        </div>
    )
}
export default Login