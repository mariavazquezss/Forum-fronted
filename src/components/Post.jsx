import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Post.css';

export const Post = () => {
    const location = useLocation()
    const [activTab, setActivTab] = useState("1");
    const [thread, setThread] = useState([]);
    const [valorinput, setvalorinput] = useState('');
    const [selectvalue, setselectvalue] = useState('');
    let date = new Date();
    let ActualDate = String(date.getFullYear() + '/' + + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getDate()).padStart(2, '0');

    useEffect(() => {
        fetch('http://25.16.222.53:8081/post/' + location.state.title, {
            method: 'GET', headers: { 'Content-Type': 'Application/json' }
        })
            .then(res => res.json())
            .then(r => {
                setThread(r)

            })
    }, [])

    const sendData = () => {

        fetch('http://25.16.222.53:8081/post', {
            method: 'POST', headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({

                "comment": valorinput,
            
                "date": date,
            
                "author": localStorage.getItem('usu1'),
            
                "thread": location.state.title,
            
                "category":selectvalue
            
            })
        })
        window.location.reload()
    }

    return (
        <div>
            <div className="TabMenu">
                <nav className='barra'>
                    <div>
                    <button className='titulo'><a href={'/'}>DiscussBoard</a></button>
                    </div>
                    <div>
                        <button className='login'><a href={'/login'}>Log In</a></button>
                        <button className='signup'><a href={'/register'}>Sign Up</a></button>
                    </div>
                </nav>
                <div className='divTitulo'>
                    <h1 className='titEnviar'>{location.state.title}</h1>
                </div>
                <div className='divComentarios'>
                    {thread.map(post => (
                    <div className='comentario'>
                        <div className='imgDiv'>
                            img
                        </div>
                        <div className='comDiv'>
                            <h1>{post.author}</h1>
                            <p>{post.comment}</p>
                        </div>
                    </div>
                    ))}
            </div>
                <div className='divInput'>
                    <form>
                        <label htmlFor="categ1">Category: </label>
                        <select name="categ" id="categ" value={ selectvalue } onChange={ event => setselectvalue( event.target.value)}>
                            <option value="doubt">Doubt</option>
                            <option value="suggestion ">Suggestion</option>
                            <option value="clarification ">Clarification</option>
                        </select>
                        <input type="textArea" className="TextAr" cols="200" wrap="hard" onChange={event => setvalorinput(event.target.value)}>
                            
                        </input>
                    </form>
                    

                </div>
                <div className='divButton'>
                    <button className='btnEnviar' onClick={()=>sendData()}>Submit</button>
                </div>
            </div>




        </div>

    );
}