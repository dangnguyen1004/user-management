export function fakeDeleteUser(users, id) {
    return users.filter(user => user.id !== id)
}

export function fakeUpdateUser(users, user) {
    if (user.id) {
        const newUsers = [...users]
        const index = newUsers.indexOf(newUsers.filter(u => u.id === user.id)[0])
        newUsers[index] = user
        return newUsers 
    }
    user.id = users.length + 1
    return [...users, user]
}

