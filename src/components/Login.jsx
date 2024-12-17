import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { auth } from '../firebase/firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Login = () => {
    const [errorMsg, setErrorMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [eye, setEye] = useState(false);
    const emailRef = useRef();



    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const pass = event.target.pass.value;
        console.log(email, pass);
        // reset status
        setErrorMsg('');
        setSuccess(false);
        signInWithEmailAndPassword(auth, email, pass)
        .then(res => {
            console.log(res.user)
            console.log(success);
            if(!res.user.emailVerified){
              setErrorMsg("Plz verify your email ")
            }else{
              setSuccess("Successfully created account");
            }

        }).catch(error => {
            console.log("ERROR", error);
            if(error == "FirebaseError: Firebase: Error (auth/invalid-credential)."){
                setErrorMsg("Invalid password Plz Try again")
            }
        })
    }

    const handleEye = () => {
        setEye(!eye)
    }
    const handleForgetPass = () =>  {
      console.log("Get me email pass", emailRef.current.value);
      setSuccess(false)
      const email = emailRef.current.value;
      if(!email){
        setErrorMsg("plz provide a valid email ")
      }else{
        sendPasswordResetEmail(auth, email)
        .then(() => {
          setErrorMsg("pass reset email, plz check your email");
        })
        .catch(error => {
          console.log(error);
        })
      }
    }
    return (
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                quasi. In deleniti eaque aut repudiandae et a id nisi.
              </p>
            </div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
              <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input type="email" name='email' placeholder="email" ref={emailRef} className="input input-bordered" required />
                </div>
                <div className="form-control relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type={ eye ? "text" : "password"} name='pass' placeholder="password" className="input input-bordered" required />
                  <button className='absolute inset-y-0 end-0 mr-3' onClick={handleEye}>
                    {
                        eye ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                    }
                  </button>
                  <label onClick={handleForgetPass} className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                {
                    errorMsg && <p className='text-red-900'>{errorMsg}</p>
                }
                {
                    success && <p className='text-red-900'>{success}</p>
                }
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <p>Already create account? <Link to="/signup" className='text-blue-700'>SignUp</Link></p>
              </form>
            </div>
          </div>
        </div>
        
    );
};

export default Login;