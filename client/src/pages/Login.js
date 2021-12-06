import React, { useState, useContext } from 'react';
import api from '../variables/api';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { setAuthState } = useContext(AuthContext) 

	let history = useHistory();

	const login = async () => {
		const data = { username: username, password: password };
		try {
			const response = await api.post('auth/login', data);
			console.log('Login: ', response.data);
			if (response.data.error) {
				alert(response.data.error);
			} else {
				localStorage.setItem('accessToken', response.data);
				setAuthState(true);
				history.push('/');
				localStorage.setItem('currentUser', username)
			}
		} catch {
			console.log('error');
		}
	};

	return (
		<div className='loginContainer'>
			<label>Username:</label>
			<input
				type='text'
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<label>Password:</label>
			<input
				type='password'
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>

			<button onClick={login}> Login </button>
		</div>
	);
}

export default Login;
