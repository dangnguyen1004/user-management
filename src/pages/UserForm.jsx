import React, { useEffect, useState } from 'react';
import { getUser, saveUser } from '../services/userService';
import Joi from 'joi'
import { toast } from 'react-toastify';

function UserForm({ match, history }) {
    const [user, setUser] = useState({
        email: "",
        first_name: "",
        last_name: "",
        avatar: "",
    });

    const [errors, setErrors] = useState()

    const schema = Joi.object({
        avatar: Joi.string().required(),
        first_name: Joi.string().required().label('First Name'),
        last_name: Joi.string().required().label('Last Name'),
        email: Joi.string().required().label('Email')
    })

    const getUserData = async () => {
        try {
            const userId = match.params.id
            if (userId === 'new') return
            const { data } = await getUser(userId)
            setUser(data.data)
        } catch (error) {
            if (error.response && error.response.status === 404)
                this.props.history.replace("/not-found");
        }

    }

    const doSubmit = async () => {
        try {
            await saveUser(user)
            toast.success('Save successful')
        } catch (error) {
            toast.error('Save failed', error.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newErrors = validate(user)
        if (newErrors) {
            setErrors(newErrors)
            console.log(newErrors)
            return
        }
        setErrors()
        doSubmit()
    }

    const validate = (obj) => {
        const tempObj = {...obj}
        delete tempObj.id
        const validation = schema.validate(tempObj, { abortEarly: false })
        if (!validation.error) return null

        const newErrors = {}
        for (let item of validation.error.details) {
            newErrors[item.path[0]] = item.message
        }
        return newErrors
    }

    const handleChange = ({ currentTarget: input }) => {
        let newUser = { ...user }
        newUser[input.name] = input.value
        setUser(newUser)
    }

    useEffect(() => {
        getUserData()
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <h1>User Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="first_name" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="first_name" name='first_name' onChange={handleChange} value={user['first_name']} />
                    {errors && errors['first_name'] && <div className="alert alert-danger" role="alert">{errors['first_name']}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="last_name" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="last_name" name='last_name' onChange={handleChange} value={user['last_name']} />
                    {errors && errors['last_name'] && <div className="alert alert-danger" role="alert">{errors['last_name']}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name='email' onChange={handleChange} value={user['email']} />
                    {errors && errors['email'] && <div className="alert alert-danger" role="alert">{errors['email']}</div>}
                </div>
                <div className="mb-3">
                    <label htmlFor="avatar" className="form-label">Avatar URL</label>
                    <input type="avatar" className="form-control" id="avatar" name='avatar' onChange={handleChange} value={user['avatar']} />
                    {errors && errors['avatar'] && <div className="alert alert-danger" role="alert">{errors['avatar']}</div>}
                </div>
                <div className="mb-3">
                    <img src={user['avatar']} style={{ width: 200, height: 200 }} alt="avatar" />
                </div>
                <button className="btn btn-primary">Save</button>
                <button className="btn btn-secondary ms-3" onClick={() => history.push('/users')}>Back</button>
            </form>
        </div>
    );
}

export default UserForm;