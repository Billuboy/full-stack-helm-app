'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { API_BASE_URL } from '@/data/constants';

export const createUser = async (formData: FormData) => {
  let success = 0;
  try {
    const user = {
      email: formData.get('email'),
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      password: formData.get('password'),
    };
    console.log('URL:', `${API_BASE_URL}/users`, user);
    const result = await fetch(`${API_BASE_URL}/users`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    });
    const create = await result.json();
    console.log('create-result:', create);
    revalidatePath('/');
    if (result.status === 200) success = 1;
  } catch (err) {
    console.error(err);
  }

  if (success) redirect('/');
};
