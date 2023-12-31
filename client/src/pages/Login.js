import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = (props) => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    //This will update the state when the input has changed
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    //This function grabs the data from the form and handles the submitted data
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }

        //Clear the form
        setFormState({
            email: '',
            password: '',
        });
    };


    return (
        <main className='flex-row justify-center mb-4'>
            <div className='col-12 col-lg-10'>
                <div className='card'>
                    <h4 className='card-header bg-dark text-light p-2'>Login</h4>
                    <div className='card-body'>
                        {data ? (
                            <p>
                               Youre logged in! Click{' '}
                               <Link to='/'>here to go Home</Link> 
                            </p>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <input
                                  className='form-input'
                                  placeholder='Your email here'
                                  name='email'
                                  type='email'
                                  value={formState.email}
                                  onChange={handleChange}
                                />
                                <input
                                  className='form-input'
                                  placeholder='A cadet never tells'
                                  name='password'
                                  type='password'
                                  value={formState.password}
                                  onChange={handleChange}
                                />
                                <button
                                  className='btn btn-block btn-primary'
                                  style={{ cursor: 'pointer' }}
                                  type='submit'
                                >
                                    Submit
                                </button>
                            </form>
                        )}

                        {error && (
                            <div className='my-3 p-3 bg-danger text-white'>
                               {error.message}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;