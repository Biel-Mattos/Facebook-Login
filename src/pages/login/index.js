import React, { useState, useEffect } from 'react'
import '../login/style.css'
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import { authService } from '../../services/auth/authService'

function Login() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [values, setValues] = useState({
    name: '',
    password: ''
  })
 
  function handleChange(event) {
    const fieldValue = event.target.value;
    const fieldName = event.target.name;
    setValues((currentValues) => {
      return{
        ...currentValues,
        [fieldName] : fieldValue
      }
    })
  }
  
  const criar = (e) => {
    axios.post('http://localhost:4000/user/cadaster', {
      name,
      password
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    handleClose();
    setName('');
    setPassword('');
  }


  return (
    <div className='containerr'>
      <div className='box-left'>
        <img src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg' />
        <h1>O Facebook ajuda você a se conectar e compartilhar com as pessoas que fazem parte da sua vida.</h1>
      </div>

      <div className='box-right'>
        <form onSubmit={(event) => {
          event.preventDefault();
          authService.login({
            name: values.name,
            password: values.password
          })
          .then(() => {
            if(values.name == '') {
              alert('O campo Nome é necessário')
            }

            if(values.password == ''){
              alert('O campo Senha é necessário')
            }

            else{
              localStorage.setItem('@user', JSON.stringify(values))
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log(err)
            alert('Usuário não encontrado')
          })
        }}>
          <input
            autoComplete={'off'}
            type={'text'}
            placeholder={'Nome'}
            name='name'
            value={values.name}
            onChange={handleChange}
          />
          <input
            type={'password'}
            placeholder={'Senha'}
            name='password'
            value={values.password}
            onChange={handleChange}
          />
          <button className='btn-e'>Entrar</button>
          <a className='link'>Esqueceu sua senha ?</a>
          <button className='btn-c' onClick={handleShow} type={'button'}>Criar conta</button>
        </form>
      </div>
{/* parte de criar conta */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Criar conta gratuita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input
              type={'text'}
              placeholder={'Nome'}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type={'password'}
              placeholder={'Senha'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={'senha'}
            />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
          <Button variant="primary" onClick={criar} type={'button'}>
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;