import Link from 'next/link';

import { API_BASE_URL } from '@/data/constants';

type User = {
  id: number;
  email: string;
  fullName: string;
};

export default async function Home() {
  console.log('baseURL', `${API_BASE_URL}/users`);
  const usersReq = await fetch(`${API_BASE_URL}/users`, {
    next: { revalidate: 0 },
  });
  const { data: users } = await (usersReq.json() as Promise<{ data: User[] }>);
  console.log('data', users);
  return (
    <div className='grid place-items-center mt-10'>
      <h1 className='text-3xl font-bold mb-10'>All users</h1>
      <Link href='/new' className='my-6'>
        <button
          type='button'
          className='bg-green-500 py-2 w-[200px] rounded-md'>
          Create
        </button>
      </Link>
      <ul className='flex flex-col items-center gap-6'>
        {users.map(user => (
          <li key={user.id} className='border w-max p-2 rounded-md'>
            <p>Email: {user.email}</p>
            <p>FullName: {user.fullName}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
