import { useState } from 'react';
import axios from 'axios';

const projectID = '3c3573ca-9a98-4d63-a02b-5d9208b9bc58';

const Modal = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents page reload on submit allowing the hadnling

    const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };

    try {
      await axios.get('https://api.chatengine.io/chats', { headers: authObject }); // authentication endpoint

      localStorage.setItem('username', username); // store in browser localstorage 
      localStorage.setItem('password', password); // its a technique for persisting user credentials 


      window.location.reload(); // reload after successful auth
      setError('');
    } catch (err) {
      setError('Oops, incorrect credentials.');
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-400 flex justify-center items-center">
      <div className="w-96">
        <h1 className="text-center text-white mb-8 w-full text-3xl">Chat Application</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" className='text-gray-800 text-lg mx-auto py-6 px-8 rounded-lg bg-white border-none w-11/12 block border-b-2 border-transparent transition-all duration-300 focus:outline-none mb-6' value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" className="text-gray-800 text-lg mx-auto py-6 px-8 rounded-lg bg-white border-none w-11/12 block border-b-2 border-transparent transition-all duration-300 focus:outline-none mb-6" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <div align="center">
            <button type="submit" className="bg-gradient-to-r from-yellow-400 to-pink-400 hover:ring-4 hover:ring-purple-300 hover:ring-opacity-50 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
              <span>Start chatting</span>
            </button>
          </div>
        </form>
        <h1 className='text-center mt-4 font-bold'>{error}</h1>
      </div>
    </div>

  );
};

export default Modal;