import React from 'react'
import { Link } from 'react-router-dom'



class List extends React.Component {
    render() {
        const arr = [1, 2, 3]
        return (
            <div>
            <ul>
                {arr.map((item, index) => {
                    return <li key={index}><Link  to={'detail/' + item}>js jump to {item}</Link></li>
                })}
            </ul>
            </div>
        )
    }
}

export default List
