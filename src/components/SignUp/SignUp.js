import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './SignUp.css';

const SignUp = () => {

    const { createUser } = useContext(AuthContext);

    const [error, setError] = useState();

    const handelSubmit = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        // console.log(email, password, confirm);

        if (password.length < 6) {
            setError('Password should be 6 characters or more')
        }

        if (password !== confirm) {
            setError('Your password did not match')
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset();
            })
            .catch(error => {
                console.error(error)
            })

    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handelSubmit} className='form'>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" required />
                </div>
                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className='new-u'>Already have an account? <Link to="/login">Login</Link></p>
            <p className='text-error'>{error}</p>
        </div>
    );
};

export default SignUp;