import React from 'react'

const Member = (props) => {
    const { firstName, lastName, type, date} = props.teamMember
    const formattedDate = date ? new Date(date.seconds * 1000).toLocaleString() : "";
    return (
        <div className='member'>
            <hr />
            <div className='team-member'>
                <p key={date}>Created: {formattedDate}</p>
                <h3 key={firstName}>First Name: <span>{firstName}</span></h3>
                <h3 key={lastName}>Last Name: <span>{lastName}</span></h3>
                <h3 key={type}>Type: <span>{type}</span></h3>
                <div className="remove-icon-container">
                    <i className="fa-solid fa-trash" onClick={props.onDelete}></i>
                </div>
            </div>
        </div>
    )
}

export default Member
