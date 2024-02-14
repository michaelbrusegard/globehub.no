import { Avatar, Button, Input, Link } from '@nextui-org/react';

export default function EditableProfile() {
  return (
    <div>
      <div className='sm: sm: hidden shrink-0 flex-col items-end py-2 sm:flex'>
        <Button as={Link} href='/profile' variant='bordered'>
          Lagre
        </Button>
      </div>
      <h1 className='text-left text-4xl text-blue-500'>Min Profil</h1>
      <div className='items-left flex justify-start py-8'>
        <Avatar
          src='https://i.pravatar.cc/150?u=a04258114e29026708c'
          className='w-25 h-25 text-large '
        />
      </div>

      <div>
        <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          Brukernavn
        </label>
        <input
          type='text'
          id='Brukernavn'
          className='block w-64 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='John Doe'
          required
        ></input>
      </div>

      <div className='mt-4'>
        <label className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
          E-post
        </label>
        <input
          type='text'
          id='E-post'
          className='block w-64 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-semibold text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500'
          placeholder='john.doe@hotmail.com'
          required
        ></input>
      </div>
    </div>
  );
}
