import React from 'react'

export default props => (
    <li className='treeview'>
        <a href={props.path}>
            <i className={`fa fa-${props.icon}`}></i> <span>{props.label}</span>
        </a>
    </li>
);