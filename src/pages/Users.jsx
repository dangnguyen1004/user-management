import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ButtonAdd from '../components/ButtonAdd';
import Card from '../components/Card';
import Modal from '../components/UserFormModal';
import { fakeDeleteUser, fakeUpdateUser } from '../services/fakeUserService';
import { deleteUser, getUsers, saveUser } from '../services/userService';

function Users(props) {
    const [users, setUsers] = useState([])
    const [modal, setModal] = useState(false)
    const [currentId, setCurrentId] = useState('new') // for user form

    const setUsersData = async () => {
        const { data } = await getUsers()
        setUsers(data.data)
    }

    const handleDelete = async (id) => {
        try {
            await deleteUser(id)
            setUsers(fakeDeleteUser(users, id))
            toast.success('Delete successful')
        } catch (error) {
            toast.error('Delete failed', error.message)
        }
    }

    const handleCloseForm = () => {
        setCurrentId('')
        setModal(false)
    }

    const handleSave = async (user) => {
        try {
            await saveUser(user)
            setUsers(fakeUpdateUser(users, user))
            toast.success('Save successful')
            handleCloseForm()
        } catch (error) {
            toast.error('Save failed')
        }
    }

    const handleAdd = () => {
        setCurrentId('new')
        setModal(true)
    }

    const handleUpdate = (id) => {
        setCurrentId(id)
        setModal(true)
    }

    useEffect(() => {
        setUsersData()
    }, [])

    return (
        <div>
            <h1 className="mb-5 mt-5">Users management</h1>
            <Modal show={modal} onClose={handleCloseForm} onSave={handleSave} currentId={currentId} />
            <div className="d-flex flex-wrap">
                {users.map((user) => (
                    <Card
                        key={user.id}
                        user={user}
                        onDelete={() => handleDelete(user.id)}
                        onUpdate={() => handleUpdate(user.id)}
                    />
                ))}
                <ButtonAdd onAdd={handleAdd}></ButtonAdd>
            </div>
        </div>
    );
}

export default Users;