import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';
export const Registrar = () => {

  const navigate = useNavigate();
  const obtenerRegistros = () => {
    var datos = localStorage.getItem("registroslogin");
    if(datos){
      return JSON.parse(datos);
    }else{
      return [];
    }
  }


  const [registroslogin, setRegistrosLogin] = useState(obtenerRegistros());

  const [nameuser, setnameuser] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [respuesta, setrespuesta] = useState("");

  function registrarUsuario()
  {
    fetch('http://25.16.222.53:8081/usuario', {
            method: 'POST', headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({

                "name": nameuser,
            
                "email": email,
            
                "password": password,
            
                "image": "no hay imagen",
            
            })
        })
        .then(promise => promise)
        .then(res => {
          console.log(res);
          if(res.status === StatusCodes.EXPECTATION_FAILED)
          {
            alert("El usuario ya está en uso");
          }
          else
          {
            alert("El usuario se ha registrado correctamente");
            navigate('/login');
          }
        }).catch(error => {
          console.log(error);
        })
    
  }

  const botonGuardar = (e) => {
    e.preventDefault();
    var miObjeto = { nameuser, email, password}
    setRegistrosLogin([...registroslogin, miObjeto]);
    limpiarFormulario();
  }


  useEffect(() => {
    localStorage.setItem("registroslogin", JSON.stringify(registroslogin))
  }, [registroslogin] );



  const limpiarFormulario = () => {
    setnameuser("");
    setemail("");
    setpassword("");
    document.getElementById("miFormulario").reset();
  }

  
  return (
    

    <div className="bg-light" style={{marginTop:20, padding:20}}>
      
      <nav className='barra'>
          <div>
              <button className='titulo'><a href={'/'}>DiscussBoard</a></button>
          </div> 
          <div>
              <button className='login'><a href={'/login'}>Log In</a></button>
              <button className='signup'><a href={'/register'}>Sign Up</a></button>
          </div>
      </nav>
    <div className="h3">
      Sign Up
      <br/>
      <form id="miFormulario" onSubmit={ botonGuardar } >
        <div className="row" style={{marginTop:20}}>
          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="text" placeholder="Username"  onChange={(e) => setnameuser(e.target.value)}  required  />
          </div>

          <div className="col-6">
            <input className="form-control form-control-lg text-center" type="text" placeholder="Email Address"  onChange={(e) => setemail(e.target.value)}  required  />
          </div>
          
        </div>
        
        <div className="row" style={{marginTop:20}}>
          <div className="col-6">
          <input className="form-control form-control-lg text-center" type="text" placeholder="Password"  onChange={(e) => setpassword(e.target.value)}  required   />
          </div>
          
        </div>

        <div className="row" style={{marginTop:20}}>
          <div className="col">
            <button className="btn btn-primary btn-lg" onClick={registrarUsuario}>Submit</button>
          </div>
        </div>
      </form>
    </div>
            
  </div>




  )
}
