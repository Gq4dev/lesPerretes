import { gql, useMutation, useQuery } from '@apollo/client/';
import client from '../lib/apolloClient';
import { Owner } from '../types';
import { useState } from 'react';

const GET_OWNERS = gql`
  query owners {
    owners {
      id
      name
      email
      address
      phone
    }
  }
`;

const CREATE_OWNER = gql`
mutation CreateOwner($createOwnerInput: CreateOwnerInput!) {
  createOwner(createOwnerInput: $createOwnerInput) {
    id
    name
    phone
    address
    email
  }
}
`


const CreatePage = () => {

  const [createOwner] = useMutation(CREATE_OWNER, {
    client,
    refetchQueries: [{ query: GET_OWNERS }],
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const { loading, error, data } = useQuery(GET_OWNERS, { client });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  const { owners } = data



  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createOwner({ variables: { createOwnerInput: { name, email, phone, address } } })
      setName('');
      setEmail('');
      setPhone('');
      setAddress('')
    } catch (error) {
      console.error('Error creating owner:', error);
    }
  };




  return (
    <div className="container mx-auto mt-3 ">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Owners</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2" >Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">Phone</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner: Owner) => (
                <tr key={owner.id}>
                  <td className="border px-4 py-2">{owner.name}</td>
                  <td className="border px-4 py-2">{owner.email}</td>
                  <td className="border px-4 py-2">{owner.address}</td>
                  <td className="border px-4 py-2">{owner.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className=' p-3'>
          <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
              </div>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input type="address" name="address" id="address" value={address} onChange={(e) => setAddress(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="address" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <input type="tel" pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}" name="phone" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (11-4567-8901)</label>
              </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CreatePage;
