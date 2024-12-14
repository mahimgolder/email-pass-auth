import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../firebase/firebase.init';

const SignUp = () => {
  // error massage var
    const [errorMess, setErrorMess] = useState('');
    
    // when user is successfully create account ,display show an error
    const [success, setSuccess] = useState(false);
    
    // form submit func
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const pass = e.target.password.value;
        setErrorMess('');
        setSuccess('');

        // pass validation section here
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
        })
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name='password' placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
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