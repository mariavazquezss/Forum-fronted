import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

export const Login = () => {

  const [miLogin, setMiLogin] = useState("false");
  const [usu, setUsu] = useState("");
  const [pas, setPas] = useState("");
  const navigate = useNavigate();

  function iniciarSesion(e){
    e.preventDefault();
    var txtusu = document.getElementById("txtusu").value;
    var txtpas = document.getElementById("txtpas").value;
    if(txtusu.length===0 || txtpas.length===0){
      alert("Hay datos sin rellenar, por favor rellenelos");
    }else{
      fetch('http://25.16.222.53:8081/usuario/login', {
            method: 'POST', headers: { 'Content-Type': 'Application/json' },
            body: JSON.stringify({
                "email": usu,
                "password": pas,
            })
        })
        .then(promise => promise)
        .then(res => {
          console.log(res);

          if(res.status === StatusCodes.OK){
            setMiLogin("true");
            localStorage.setItem('usu1',usu);
            document.getElementById("form_login").style.display = "none";
            navigate('/')
          }else{
            setMiLogin("false");
            alert("Error De Usuario y/o Contraseña");
            document.getElementById("txtusu").value = "";
            document.getElementById("txtpas").value = "";
            document.getElementById("txtusu").focus();
            
          }
        })

    }

  }


  return (
    

    <div className="container" style={{background:"lightblue", marginTop:20, padding:20}}>
        
      <form id="form_login">
          <div>
              <h1 style={{color:"blueviolet", textalign:"center"}}>LOGIN</h1>
              <label htmlFor="txtusu"><strong>Email</strong></label>
              <input type="text" id="txtusu" style={{textAlign:"center"}} className="form-control"  onChange={ (e)=>setUsu(e.target.value) }  required/>
          </div>
          <div>
              <label htmlFor="txtpas"><strong>Password</strong></label>
              <input type="password" id="txtpas" style={{textAlign:"center"}} className="form-control"  onChange={ (e)=>setPas(e.target.value) }  required/>
          </div><br/>
         
          <input type="submit"  className="btn btn-primary" value="Login" onClick={ iniciarSesion }/>
      </form>

      { miLogin === "true" && <Menu usu={usu}/> }

    </div>


  )
}
