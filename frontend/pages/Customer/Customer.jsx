import axios from 'axios';
import React, { useState } from 'react'

function Customer() {
    const [formData,setFormData] = useState({
        secret_code:"",
        name:"",
        email:"",
        password:"",
    });
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/customer`,formData);
        console.log(response);
    }
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <input type="text" name='secret_code' placeholder='Code...' value={formData.secret_code} onChange={handleChange}/>
            <br />
            <input type="text" name='name' placeholder='Name...' value={formData.name} onChange={handleChange}/>
            <br />
            <input type="email" name='email' placeholder='Email...' value={formData.email} onChange={handleChange}/>
            <br />
            <input type="password" name='password' placeholder='Password...' value={formData.password} onChange={handleChange}/>
            <br />
            <button>Submit</button>
        </form>
    </div>
  )
}

export default Customer