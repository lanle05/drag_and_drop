import React from 'react';
import { Form, useActionData, redirect } from 'react-router-dom';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config';

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData);

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    if (user) return redirect('/');
  } catch (error) {
    let errorMessage = 'An error occurred during sign-in.';
    if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    } else if (error.code === 'auth/missing-password') {
      errorMessage = 'Please enter your password.';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Wrong login credentials.';
    }
    return errorMessage;
  }
}

export default function SiginPage() {
  const message = useActionData();

  return (
    <div className='h-screen flex items-center justify-center px-5'>
      <Form method='post' replace className='w-full max-w-lg'>
        <h1 className='text-center text-2xl text-pink-800 font-bold mb-5'>
          Sign In
        </h1>

        {message && (
          <h4 className='text-center text-red-500 font-semibold'>{message}</h4>
        )}

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            className='bg-slate-200 w-full rounded-md px-4 py-2 mb-2 focus:outline-none focus:bg-blue-100'
          />
        </div>

        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            className='bg-slate-200 w-full rounded-md px-4 py-2 mb-4 focus:outline-none focus:bg-blue-100'
          />
        </div>
        <div className='text-center'>
          <button className='bg-pink-800 rounded-md px-4 py-1 text-white'>
            Sign in
          </button>
        </div>
      </Form>
    </div>
  );
}
