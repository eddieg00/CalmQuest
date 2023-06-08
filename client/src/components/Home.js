import React, { useState, useEffect } from 'react';
import { getZenQuote } from '../api/quoteApi';
import TaskList from './TaskList';
import { fetchHealthResources } from '../api/HealthApi';
import HealthResourceList from './healthResourceList';

export const Home = () => {
  const [quoteData, setQuoteData] = useState({ quote: '', author: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [healthResources, setHealthResources] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuoteData = await getZenQuote();
      setQuoteData(fetchedQuoteData);
    };

    const loadResources = async () => {
      const resources = await fetchHealthResources();
      setHealthResources(resources);
    };

    fetchQuote();
    loadResources();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleResourceClick = (resource) => {
    console.log(resource);
  };

  const handleManageAnxiety = () => {
    console.log("Manage Anxiety Clicked");
  };

  const handleKeepHeartHealthy = () => {
    console.log("Keep Heart Healthy Clicked");
  };

  const handleGetEnoughSleep = () => {
    console.log("Get Enough Sleep Clicked");
  };

  const handleGetActive = () => {
    console.log("Get Active Clicked");
  };

  const handleChoosingDoctor = () => {
    console.log("Choosing a Doctor Clicked");
  };

  return (
    <body className="flex flex-col w-full h-screen bg-gradient-to-t from-green-300 via-blue-500 to-purple-600">
      <div className="flex flex-grow">
        <div className="h-full bg-white w-3/10 p-8 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl mb-4 text-emerald-400 font-nexa font-bold">CalmQuest</h2>
            <button className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in" 
                onClick={openModal}>Profile
            </button>
              <div className='flex'>
              <HealthResourceList 
                healthResources={healthResources} 
                handleResourceClick={handleResourceClick}
                handleManageAnxiety={handleManageAnxiety}
                handleKeepHeartHealthy={handleKeepHeartHealthy}
                handleGetEnoughSleep={handleGetEnoughSleep}
                handleGetActive={handleGetActive}
                handleChoosingDoctor={handleChoosingDoctor}
                search={search} 
                handleSearch={handleSearch}
              />
              </div>
          </div>
          <p>Logout</p>
        </div>

        <div className="w-full w-7/10 flex flex-col items-start justify-start p-8">
          <div className="bg-white rounded-lg shadow p-8 w-full overflow-auto mb-6">
            <h1 className="text-4xl mb-4 text-center">Welcome to <span className="font-nexa font-bold text-emerald-400">CalmQuest</span></h1>
            <p className="text-2xl text-center justify-center bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-nexa font-bold">Daily Quests:</p>
            <TaskList />
          </div>
          <div className=" w-full p-8 bg-white rounded-lg shadow">
            <p className="text-2xl text-center bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-nexa font-bold">Today's Affirming Quote:</p>
            <p className="font-nexa font-ultralight text-3xl italic text-center ">
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
