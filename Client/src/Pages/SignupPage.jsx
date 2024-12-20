import React from 'react'
import { useFormik } from "formik"
import { api } from '../axios'

const SignupPage = () => {

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        },
        onSubmit: async (values) => {
            const { data } = await api.post("/users", values)
            console.log(data)
        }
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <input onChange={formik.handleChange} value={formik.values.name} type="text" name='name' placeholder='Enter name'/>
                <input onChange={formik.handleChange} value={formik.values.username} type="text" name='username' placeholder='Enter username'/>
                <input onChange={formik.handleChange} value={formik.values.email} type="text" name='email' placeholder='Enter email'/>
                <input onChange={formik.handleChange} value={formik.values.password} type="password" name='password' placeholder='Enter password'/>
                <input onChange={formik.handleChange} value={formik.values.confirm_password} type="password" name='confirm_password' placeholder='Enter confirm password'/>
            </form>
        </div>
    )
}

export default SignupPage
