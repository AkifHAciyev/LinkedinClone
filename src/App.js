import './App.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import Feed from './component/Feed/Feed';
import Header from './component/Header/Header';
import Sidebar from './component/Sidebar/Sidebar';
import Login from './component/Login/Login';
import { auth } from './firebase/firebase';
import { useDispatch } from 'react-redux';
import Widgets from './component/Widgets/Widgets';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

	useEffect(() => {
		auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				dispatch(
					login({
						email: userAuth.email,
						uid: userAuth,
						displayName: userAuth.displayName,
						photoUrl: userAuth.photoURL,
					})
				);
			} else {
				dispatch(logout());
			}
		});
	}, []);

	return (
		<div className="App">
			<Header />
			{!user ? (
				<Login />
			) : (
				<div className="app__body">
					<Sidebar />
					<Feed />
					<Widgets />
				</div>
			)}
		</div>
	);
}

export default App;
