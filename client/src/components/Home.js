import React, { useState, useEffect, useRef } from 'react';
import { getZenQuote } from '../api/quoteApi';
import TaskList from './TaskList';
import { fetchHealthResources } from '../api/HealthApi';
import HealthResourceList from './healthResourceList';
import MeshGradient from 'mesh-gradient.js';
//import { useQuery } from '@apollo/client';
//import { ME } from "../utils/queries";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";

const logged = Auth.getToken();

const COLORS = ["#22C96B ", "#22C9AA", "#22AAC9", "#7422C9"];

export const Home = () => {
  const navigate = useNavigate();
  const [quoteData, setQuoteData] = useState({ quote: "", author: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [healthResources, setHealthResources] = useState([]);
  const [search, setSearch] = useState("");
  const [profileOpen, setProfileOpen] = useState(false); // State for profile modal

  //const { data } = useQuery(ME);

  const canvasRef = useRef(null);
  const gradient = useRef(new MeshGradient());

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

  useEffect(() => {
    if (canvasRef.current) {
      gradient.current.initGradient(`#${canvasRef.current.id}`, COLORS);
      gradient.current.changePosition(780);
    }
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
  useEffect(() => {
    if (!logged) {
      navigate("./login");
    }
  }, [navigate]);

  const openProfileModal = () => {
    setProfileOpen(true);
  };

  const closeProfileModal = () => {
    setProfileOpen(false);
  };

  return (
    <>
      {logged ? (
        <div className="flex flex-col w-screen min-h-screen relative">
          <canvas id="my-canvas" ref={canvasRef} className="w-full h-full absolute top-0 left-0" />
          <div className="flex flex-col lg:flex-row flex-grow relative">
            <div className="bg-white w-full lg:w-2/12 p-4 lg:p-8 flex flex-col justify-between max-h-screen overflow-y-auto lg:h-auto">
              <div>
                <h2 className="text-2xl lg:text-3xl mb-4 text-emerald-500 font-nexa font-bold">CalmQuest</h2>
                <button className="text-sm text-emerald-500 mt-4" onClick={openProfileModal}>Profile</button> {/* Profile Button */}
                <div className='flex flex-col lg:flex-row'>
                  <HealthResourceList healthResources={healthResources} handleResourceClick={handleResourceClick} search={search} handleSearch={handleSearch}/>
                </div>
              </div>
              <p>
                <a href="/login" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </p>
            </div>

            <div className="w-full lg:w-10/12 p-4 lg:p-8 flex flex-col items-start justify-start">
              <div className="bg-white bg-opacity-80  rounded-lg shadow p-4 lg:p-8 w-full overflow-auto mb-6">
                <h1 className="text-2xl lg:text-4xl mb-4 text-center">Welcome to <span className="text-3xl lg:text-5xl font-nexa font-bold text-emerald-500">CalmQuest</span></h1>
                <p className="text-xl lg:text-2xl text-center justify-center bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-nexa font-bold">Daily Quests:</p>

                <TaskList />
              </div>
              <div className=" w-full p-4 lg:p-8 bg-opacity-80  bg-white rounded-lg shadow">
                <p className="text-xl lg:text-2xl text-center bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-nexa font-bold">Today's Inspiring Quote:</p>
                <p className="font-nexa font-ultralight text-2xl lg:text-3xl italic text-center ">
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
              <p>
                <a href="/login" onClick={() => Auth.logout()}>Logout</a>
              </p>
            </div>
          )}

          {profileOpen && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-50">
            <div className="fixed top-[50%] left-[50%] w-72 h-72 bg-white rounded-md flex flex-col items-center justify-between p-4 shadow-lg transform translate-x-[-50%] translate-y-[-50%]">
              <h3 className="mb-4 text-lg font-nexa font-ultralight">Profile</h3>
              <div className="w-full h-2 bg-gray-300 rounded">
                <div className="h-full bg-green-500 rounded" style={{ width: '60%' }}></div>
              </div>
              <p className="mt-2">Task Progress: 60%</p>
              <p>Name: John Doe</p>
              <button
                className="bg-green-500 text-white rounded-md px-4 py-2 mt-4"
                onClick={closeProfileModal}
              >
                Close
              </button>
            </div>
          </div>
          )}
        </div>
      ) : null}
    </>
  );
};