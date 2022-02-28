import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';
import { auth } from '../../firebase/firebase';
import './Login.css';

function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const [profile, setProfile] = useState('');
	const dispatch = useDispatch();

	const loginToApp = (e) => {
		e.preventDefault();

		auth
			.signInWithEmailAndPassword(email, password)
			.then((userAuth) => {
				dispatch(
					login({
						email: userAuth.user.email,
						uid: userAuth.user.uid,
						displayName: userAuth.user.displayName,
						photoUrl: userAuth.user.photoURL,
					})
				);
			})
			.catch((error) => alert(error));
	};

	const register = () => {
		if (!name) {
			return alert('Please enter a full name!');
		}

		auth
			.createUserWithEmailAndPassword(email, password)
			.then((userAuth) => {
				userAuth.user
					.updateProfile({
						displayName: name,
						photoURL: profile,
					})
					.then(() => {
						dispatch(
							login({
								email: userAuth.user.email,
								uid: userAuth.user.uid,
								displayName: name,
								photoURL: profile,
							})
						);
					});
			})
			.catch((error) => alert(error));
	};

	return (
		<div className="login">
			<img src="https://www.pngkey.com/png/detail/14-143268_file-linkedin-logo-svg-linkedin-logo-png-no.png" alt="" />

			<form>
				<input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name(required if registering)" type="text" />
				<input value={profile} onChange={(e) => setProfile(e.target.value)} placeholder="Profile pic URL (optional)" type="text" />
				<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
				<input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
				<button type="submit" onClick={loginToApp}>
					Sing in
				</button>
			</form>

			<p>
				Not a member?
				<span className="login__register" onClick={register}>
					{' '}
					Register Now
				</span>
			</p>
		</div>
	);
}

export default Login;
