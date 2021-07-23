import React, { useEffect, useState } from 'react';
import { getUser } from '../services/userService';
import Joi from 'joi'
import Modal from 'react-bootstrap/Modal'
import Input from './Input'

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
                });
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
                    <Input name='first_name' label="First Name" onChange={handleChange} errors={errors} user={user} />
                    <Input name='last_name' label="Last Name" onChange={handleChange} errors={errors} user={user} />
                    <Input name='email' label="Email" onChange={handleChange} errors={errors} user={user} />
                    <Input name='avatar' label="Avatar" onChange={handleChange} errors={errors} user={user} />
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