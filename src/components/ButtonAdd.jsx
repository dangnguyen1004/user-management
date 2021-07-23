import React from 'react';

function ButtonAdd({ onAdd }) {
    return (
        <div
            className="mb-3"
            style={{
                width: 300,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <button
                onClick={onAdd}
                className="btn btn-secondary mb-3"
                style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                +
            </button>
        </div>
    );
}

export default ButtonAdd;