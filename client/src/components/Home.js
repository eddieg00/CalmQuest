import React, { useState, useEffect } from 'react';
import { getZenQuote } from '../api/quoteApi';

export const Home = () => {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '' });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuoteData = await getZenQuote();
      setQuoteData(fetchedQuoteData);
    };

    fetchQuote();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <body className="flex flex-col w-full h-screen bg-gradient-to-t from-green-300 via-blue-500 to-purple-600">
      <div className="flex flex-grow">
        <div className="h-full bg-white w-3/10 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl mb-4 text-emerald-400">CalmQuest</h2>
            <button className="rounded-2xl m-2  text-white bg-blue-400 w-2/5 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in" 
                onClick={openModal}>Profile
            </button>
            <h2 className="text-2xl mt-20 mb-4 text-blue-400">Health Resources</h2>
            <input
              type="search"
              placeholder="Search..."
              className="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
            />
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

        <div className="h-full w-full w-7/10 flex items-start justify-start p-8">
          <div className="bg-white rounded-lg shadow p-8 w-full h-full overflow-auto">
            <h1 className="text-4xl mb-4 text-center">
              Welcome to <span className="text-emerald-400">CalmQuest</span>
            </h1>

            <p className="text-2xl text-center justify-center">Daily Tasks:</p>
            <ul className="mb-6 text-center">
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- CalmQuest Hunters mom</li>
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Make your bed</li>
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Dont kill yourself</li>
              <li className="text-2xl mb-2 bg-gradient-to-l from-white via-blue-200 to-white">- Visit the hat man</li>
            </ul>

            <p className="mb-6 text-center">Today's Affirming Quote:</p>
            <p className="text-4xl italic text-center bg-gradient-to-l from-emerald-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {quoteData.quote ? `“${quoteData.quote}” - ${quoteData.author}` : 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <section
            style={{ fontFamily: 'Montserrat' }}
            className="bg-grey-400 flex font-medium items-center justify-center h-screen"
          >
            <section className="w-64 mx-auto bg-teal-700 rounded-2xl px-8 py-6 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </span>
              </div>
              <div className="mt-6 w-fit mx-auto">
                <img src="" className="rounded-full w-28" alt="" srcSet="" />
              </div>

              <div className="mt-8">
                <h2 className="text-white font-bold text-2xl tracking-wide">
                  Jonathan <br /> Smith
                </h2>
              </div>

              <div className="h-1 w-full bg-black mt-8 rounded-full">
                <div className="h-1 rounded-full w-2/5 bg-sky-500 "></div>
              </div>
              <div className="mt-3 text-white text-sm">
                <span className="text-white font-semibold">Goal for today:</span>
                <span className="text-white"> 40%</span>
              </div>
              <button
                className="mt-6 bg-emerald-600 hover:bg-emerald-400 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={closeModal}
              >
                Close
              </button>
            </section>
          </section>
        </div>
      )}
    </body>
  );
};
