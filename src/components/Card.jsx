import React from 'react';

function Card({user, onDelete, onUpdate}) {
    return (
        <div className="card me-3 mb-3" style={{ width: 300 }}>
            <img src={user.avatar} className="card-img-top" alt="avatar" />
            <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p>{`Name: ${user.first_name} ${user.last_name}`}</p>
                <p>{`Email: ${user.email}`}</p>
                <button className="btn btn-primary" onClick={onUpdate}>Update</button>
                <button className="btn btn-secondary ms-2" onClick={onDelete}>Delete</button>
            </div>
        </div>
    );
}

export default Card;