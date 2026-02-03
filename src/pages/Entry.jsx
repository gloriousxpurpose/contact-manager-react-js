import { useNavigate, useParams } from "react-router"
import { useEffect, useRef } from "react"
import { createData, updateData, getDataById} from "../store/contactReducer"
import { useSelector, useDispatch } from "react-redux"

const Entry = () => {
    return (
        <div>
            <p>Entry Contact</p>
            <br />
            <label htmlFor="">Full Name</label>
            <br />
            <input type="text"  />
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
            <input type="text" />
            <br />
            <label htmlFor="">Job Title</label>
            <br />
            <input type="text" />
            <br />
            <br />
            <button>Simpan</button>
            <button>Batal</button>
        </div>
    )
}
export default Entry