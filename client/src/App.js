import './App.css';
import { BrowserRouter as Router, Route, Switch, Link, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Login from './pages/Login';
import Registration from './pages/Registration';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';

function App() {
	const [authState, setAuthState] = useState(false);
	let history = useHistory();

	useEffect(() => {
		if (localStorage.getItem('accessToken')) {
			setAuthState(true);
		}
	}, []);

	const logout = () => {
		localStorage.removeItem("accessToken");
		setAuthState(false);
		localStorage.setItem('currentUser', '');
	}

	return (
		<div className='App'>
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<Router>
					
					<div className='navbar'>
						<Link to='createpost'>Create a Post</Link>
						<Link to='/'>Home Page</Link>
						{!authState ? (
							<>
								<Link to='/login'>Login</Link>
								<Link to='/registration'>Registration</Link>
							</>
						) : (
							<button onClick={() => logout()}>Logout</button>
						)}
					</div>
					{!authState && (
							<p className="pleaseLogin"><br></br>You are not logged in. Please login, and, after that you will be able to manege posts.</p>
						)}
				    
					<Switch>
						<Route path='/' exact component={Home}></Route>
						<Route path='/createpost' exact component={CreatePost}></Route>
						<Route path='/post/:id' exact component={Post}></Route>
						<Route path='/registration' exact component={Registration}></Route>
						<Route path='/login' exact component={Login}></Route>
					</Switch>
				</Router>
			</AuthContext.Provider>
		</div>
	);
}

export default App;
