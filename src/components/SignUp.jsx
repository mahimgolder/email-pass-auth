import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';
// react icon 
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  // error massage var
    const [errorMess, setErrorMess] = useState('');
    
    // when user is successfully create account ,display show an error
    const [success, setSuccess] = useState(false);
    // Show pass btn
    const [showPass, setShowPass] = useState(false);

    
    // form submit func
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        const checkBox = e.target.checkBox.checked;
        setErrorMess('');
        setSuccess('');
        // pass validation section here
        if(!checkBox){
          setErrorMess("Please check terms and condition")
          return;
        }
        if(pass.length < 6){
          setErrorMess('Please set at least 6 carectar');
          return;
        }
        const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{5,}$/;
        if(!passwordPattern.test(pass)){
          setErrorMess("please enter: one number, one uppercase, one lowercase, one spacial carectar for your security");
          return;
        }

        // create user email and pass section here
        createUserWithEmailAndPassword(auth, email, pass )
        .then(res => {
          console.log(res.user);
          setSuccess(true);
        }).catch(error => {
            console.log(errorMess);
            setErrorMess(error.message);
            setSuccess(false);
        })
    }

    // handle show btn func here
    const handleShowPass = () => {
      setShowPass(!showPass)
    }
   
    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto">
          <form onSubmit={handleSubmit} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" name='email' placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type={ showPass ? "text" : "password"} name='password' placeholder="password" className="input input-bordered" required />
              <button 
              onClick={handleShowPass}
              className='absolute top-1/2 bottom-1/2 left-72'>
                {
                  showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                }
              </button>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>

            {/* terms and condition checkBox */}
            <div className="form-control">
              <label className="cursor-pointer label justify-start">
                <input name='checkBox' type="checkbox" className="checkbox checkbox-secondary" />
                <span className="label-text ml-4">check terms and condition</span>
              </label>
            </div>
            
            {/* error show in display */}
            {
                errorMess && <p>{errorMess}</p>
            }
            {
              success && <p>Successfully Created account</p>
            }
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
    );
};

export default SignUp;