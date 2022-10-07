import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../home.css';

export const Home = () => {
    const navigate = useNavigate()
   const[activTab, setActivTab] = useState("1");
   const[thread, setThread] = useState([]);

   useEffect(() => {
    fetch('http://25.16.222.53:8081/thread',{
        method: 'GET', headers:{'Content-Type':'Application/json'}
    })
    .then(res=>res.json())
    .then(r=>{
        setThread(r)
        
    })
   }, [])

   const openPost = (e, value) => {
    navigate("/post", {
        state: {
            title: value
        }
    })
   }

   return (
    <div className="TabMenu">
        <nav className='barra'>
            <div>
                <button className='titulo'><a href={'/home'}>DiscussBoard</a></button>
            </div> 
            <div>
                <button className='login'><a href={'/login'}>Log In</a></button>
                <button className='signup'><a href={'/register'}>Sign Up</a></button>
            </div>
        </nav>

        <div className='tableDiv'>
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                    {thread.map(th => (
                    <tr>
                        <td>{th.title}</td>
                        <td>{th.author}</td>
                        <td><button className='tableBtn' onClick={e => openPost(e, th.title)}>Open</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
    </div>
  
   );
}
