import { useNavigate } from "react-router"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getData, deleteData, updateData } from "../store/contactReducer";

const Home = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const contactState = useSelector((state) => state.contact);

    console.log("contactState:", contactState);

    const {value : contact, isError, isLoading} = useSelector((state) => state.contact);

    console.log("data:", contact)


    useEffect(() => {
    dispatch(getData())
    }, [dispatch])


    return (
        <div>
            <h2>Home</h2>
            <br />
            <button onClick={() => navigate('entry')}>New Contact</button>
            <br />
            
            <br />
            {isLoading && (<p>Loading...</p>)}
            {isError && (<p>Error</p>)}
            {!isLoading && !isError && (
                <div>
                    {
                        contact.length === 0 ? (
            <p>Tidak ada contact ditemukan.</p>
                ) : (
                contact.map((item, index) => (
                <div key={index}>
                    <span>Ful Name : </span>
                    <span>{item.fullName}</span>
                    <br />
                    <span>Phone : </span>
                    <span>{item.phone}</span>
                    <br />
                    <span>Company : </span>
                    <span>{item.company}</span>
                    <br />
                    <span>Job Title : </span>
                    <span>{item.job_title}</span>
                    <br />
                    <span>Notes : </span>
                    <span>{item.notes}</span>
                    <br />
                    <button onClick={() => navigate(`update/${item.contact_id}`)}>Edit</button>
                    <button onClick={() => dispatch(deleteData(item.contact_id))}>Delete</button>
                    <br />
                    <br />
                </div>
                ))
                )
                }     
                </div>
            )}

        </div>
    )
}

export default Home