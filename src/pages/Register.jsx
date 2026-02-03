import { useNavigate } from "react-router"

const Register = () => {
        const navigate = useNavigate()
    return (
        <div>
            <p>Register</p>
            <br />
            <label htmlFor="">Full Name</label>
            <br />
            <input type="text" />
            <br />
            <label htmlFor="">Email</label>
            <br />
            <input type="text" />
            <br />
            <label htmlFor="">Phone</label>
            <br />
            <input type="text" />
            <br />
            <label htmlFor="">Company</label>
            <br />
            <input type="text"/>
            <br />
            <label htmlFor="">Notes</label>
            <br />
            <input type="text" />
            <br />
            <br />
            <button onClick={() => navigate('/home')}>Home</button>
            <button onClick={() => navigate('/login')}>Login</button>
        </div>
    )
}
export default Register