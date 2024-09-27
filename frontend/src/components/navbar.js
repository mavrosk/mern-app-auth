import React from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import {useUserContext} from '../hooks/useUserContext'

function Navbar() {

    const {logout} = useLogout()
    const {user} = useUserContext()


    const handleClick = () => {
        logout();
    }

    return (
        <header>
            <div className='container'>
                <Link to='/'>
                    <h1>Workouts here</h1>
                </Link>
                <nav>
                {user && (
                    <div>
                        <button onClick={handleClick}>Log out</button> 
                    </div>
                )}
                {!user && (
                    <div>
                        <Link to='/login'>Login</Link>
                        <Link to='/signup'>Signup</Link>
                    </div>
                )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar
