import React from 'react';

import { createUser } from './actions/createUser';

export default function CreateUserForm() {
  return (
    <div className='grid place-items-center mt-10'>
      <form
        className='border w-[600px] px-6 py-8 flex flex-col gap-6 rounded-lg shadow-md'
        action={createUser}>
        <h2 className='text-center text-3xl font-semibold'>Create a user</h2>
        <div>
          <p className='font-medium mb-1'>First Name</p>
          <input
            type='text'
            name='firstName'
            placeholder='First Name'
            className='border w-full rounded-md py-2 px-2 focus:outline-none'
          />
        </div>
        <div>
          <p className='font-medium mb-1'>Last Name</p>
          <input
            type='text'
            name='lastName'
            placeholder='Last Name'
            className='border w-full rounded-md py-2 px-2 focus:outline-none'
          />
        </div>
        <div>
          <p className='font-medium mb-1'>Email</p>
          <input
            type='text'
            name='email'
            placeholder='Email'
            className='border w-full rounded-md py-2 px-2 focus:outline-none'
          />
        </div>
        <div>
          <p className='font-medium mb-1'>Password</p>
          <input
            type='text'
            name='password'
            placeholder='Password'
            className='border w-full rounded-md py-2 px-2 focus:outline-none'
          />
        </div>
        <button type='submit' className='bg-green-500 py-2 rounded-md'>
          Create
        </button>
      </form>
    </div>
  );
}
