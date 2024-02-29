import { useQuery, gql, useMutation } from '@apollo/client';
import client from '../lib/apolloClient';
import { Dog, Owner } from '../types';
import { useState } from 'react';


const GET_DOGS_AND_OWNERS = gql`
  query GetDogsAndOwners {
    dogs {
      id
      name
      breed
      owner{
        name
      }
    }
    owners{
      id
      name
    }
  }
`;

const CREATE_DOG = gql`
mutation CreateDog($createDogInput: CreateDogInput!) {
  createDog(createDogInput: $createDogInput) {
    name
  }
}
`


const ListPage = () => {

  const [createDog] = useMutation(CREATE_DOG, {
    client,
    refetchQueries: [{ query: GET_DOGS_AND_OWNERS }],
  });

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [neutered, setNeutered] = useState(false);
  const [ownerId, setOwnerId] = useState('');
  const { loading, error, data } = useQuery(GET_DOGS_AND_OWNERS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { dogs, owners } = data;

  const handleOptionChange = (value: boolean) => {
    setNeutered(value === true);
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createDog({ variables: { createDogInput: { name, breed, neutered, ownerId } } })
      setName('');
      setBreed('');
      setNeutered(false)
      setOwnerId('')
    } catch (error) {
      console.error('Error creating owner:', error);
    }
  };
  return (
    <div className="container mx-auto mt-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Dogs</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Breed</th>
                <th className="px-4 py-2">Owner</th>
              </tr>
            </thead>
            <tbody>
              {dogs.map((dog: Dog) => (
                <tr key={dog.id}>
                  <td className="border px-4 py-2">{dog.name}</td>
                  <td className="border px-4 py-2">{dog.breed}</td>
                  <td className="border px-4 py-2">{dog.owner.name}</td>
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
              <input type="breed" name="breed" id="breed" value={breed} onChange={(e) => setBreed(e.target.value)} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label htmlFor="breed" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">breed</label>
            </div>
            <div className="flex justify-between mb-5">
              <div>
                <p className=' peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300'>Neutered</p>
              </div>
              <div className="flex item center">
                <input
                  type="radio"
                  id="yes"
                  name="neutered"
                  value="yes"
                  checked={neutered}
                  onChange={() => handleOptionChange(true)}
                  className="mr-2"
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="no"
                  name="neutered"
                  value="no"
                  checked={!neutered}
                  onChange={() => handleOptionChange(false)}
                  className="mr-2"
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-5 group">
                <select
                  name="ownerId"
                  id="ownerId"
                  value={ownerId}
                  onChange={(e) => setOwnerId(e.target.value)}
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  required
                >
                  <option value="">Select Owner</option>
                  {owners.map((owner: Owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="ownerId"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Owner
                </label>
              </div>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>

        </div>
      </div>


    </div>
  );
};

export default ListPage;
