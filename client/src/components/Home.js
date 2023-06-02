import React, { useState, useEffect } from 'react';
import { getZenQuote } from '../api/quoteApi';

export const Home = () => {
  const [quoteData, setQuoteData] = useState({quote: '', author: ''});

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuoteData = await getZenQuote();
      setQuoteData(fetchedQuoteData);
    };

    fetchQuote();
  }, []);

  return (
    <body className="flex flex-col w-full h-screen bg-gradient-to-t from-green-300 via-blue-500 to-purple-600">
      <div className="flex flex-grow">
        <div className="h-full bg-white w-3/10 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl mb-4 text-emerald-400">CalmQuest</h2>
            <button className="text-2xl">Profile</button>
            <h2 className="text-2xl mt-20 mb-4 text-blue-400">Health Resources</h2>
            <input type="search" placeholder="Search..." className="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100" />
            <ul>
              <li className="mb-2">Manage Anxiety</li>
              <li className="mb-2">Keep your heart Healthy</li>
              <li className="mb-2">Get Enough Sleep</li>
              <li className="mb-2">Get Active</li>
              <li className="mb-2">Choosing a Doctor: Quick Tips</li>
            </ul>
          </div>
          <p>Logout</p>
        </div>

        <div className="w-full w-7/10 flex flex-col items-start justify-start p-8">
          <div className="bg-white rounded-lg shadow p-8 w-full overflow-auto mb-6">
            <h1 className="text-4xl mb-4 text-center">Welcome to <span className="text-emerald-400">CalmQuest</span></h1>

            <p className="text-2xl text-center justify-center">Daily Tasks:</p>
            <ul className="mb-6 text-center">
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- CalmQuest Hunters mom</li>
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Make your bed</li>
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Dont kill yourself</li>
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Visit the hat man</li>
            </ul>
          </div>

          <div className=" w-full p-8 bg-white rounded-lg shadow">
            <p className="text-3xl text-center">Today's Affirming Quote:</p>
            <p className="text-4xl italic text-center bg-gradient-to-l from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                {quoteData.quote ? `“${quoteData.quote}” - ${quoteData.author}` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </body>
  );
};
