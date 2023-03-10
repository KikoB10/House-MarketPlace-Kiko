import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import OAuth from '../components/OAuth';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      updateProfile(auth.currentUser, { displayName: name });

      const formDataCopy = { ...formData };
      delete formDataCopy.password; //we don't want to the password to get saved to the database
      formDataCopy.timestamp = serverTimestamp(); //set the timestamp to the server timestamp

      await setDoc(doc(db, 'users', user.uid), formDataCopy); //setDoc is actually updating the database and adding our user to the 'users' collection
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with registration');
    }
  };
  return (
    <>
      <div className="pageContainer">
        <header className="pageHeader">
          <p>Welcome Back</p>
        </header>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            palceholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            palceholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              className="showPassword"
              alt=" show password"
              src={visibilityIcon}
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>

        <OAuth />

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
