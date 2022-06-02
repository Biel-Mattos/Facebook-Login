import React, { useEffect, useState } from 'react'
import '../home/styles.css'

function Home(){
    
    const [user, setUser] = useState({})
    
    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('@user')))
    },[])

    return(
        <div className='container'>
            <h1>{user.name}</h1>
            <button onClick={logout}>
                SAIR
            </button>
        </div>
    );
}

export default Home;