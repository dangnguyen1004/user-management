import React, { useEffect, useState } from 'react';
import { getUser } from '../services/userService';
import Joi from 'joi'
import Modal from 'react-bootstrap/Modal'

function UserForm({ show, onClose, onSave, currentId }) {
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
            const userId = currentId
            if (userId === 'new') {
                setUser({
                    email: "",
                    first_name: "",
                    last_name: "",
                    avatar: "",
                })
                return
            }
            const { data } = await getUser(userId)
            setUser(data.data)
        } catch (error) {
            if (error.response && error.response.status === 404)
                console.log('not found')
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
        onSave(user)
    }

    const validate = (obj) => {
        const tempObj = { ...obj }
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
    }, [currentId])

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>User Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                </form>
            </Modal.Body>
        </Modal>
    );
}

export default UserForm;