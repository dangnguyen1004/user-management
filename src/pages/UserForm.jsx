import React, { useEffect, useState } from 'react';
import { getUser, saveUser } from '../services/userService';
import Joi from 'joi'
import { toast } from 'react-toastify';
import Input from '../components/Input';

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
        e.preventDefault() // for find all errors of each input 
        
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
                <Input name='first_name' label="First Name" onChange={handleChange} errors={errors} user={user} />
                <Input name='last_name' label="Last Name" onChange={handleChange} errors={errors} user={user} />
                <Input name='email' label="Email" onChange={handleChange} errors={errors} user={user} />
                <Input name='avatar' label="Avatar" onChange={handleChange} errors={errors} user={user} />
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