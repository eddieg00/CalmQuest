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

  return (
    <>

      {logged ?(
        <div className="lg: flex flex-col w-screen min-h-screen relative">
          <canvas id="my-canvas" ref={canvasRef} className="w-full h-full absolute top-0 left-0" />
          <div className="lg:flex flex-grow relative">
            <div className="lg: bg-white w-3/10 p-8 flex flex-col justify-between h-screen">
              <div>
                <h2 className="lg: text-3xl mb-4 text-emerald-500 font-nexa font-bold">CalmQuest</h2>
                {/*
                <button className="rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-2 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in" onClick={openModal}>Profile</button>
                */}
                <div className='lg: flex'>
                  <HealthResourceList healthResources={healthResources} handleResourceClick={handleResourceClick} search={search} handleSearch={handleSearch}/>
                </div>
              </div>
              <p>
                <a href="/login" onClick={() => Auth.logout()}>
                  Logout
                </a>
              </p>
            </div>
      
            <div className="lg: w-full w-7/10 flex flex-col items-start justify-start p-8">
              <div className="lg: bg-white bg-opacity-80  rounded-lg shadow p-8 w-full overflow-auto mb-6">
                <h1 className="lg: text-4xl mb-4 text-center">Welcome to <span className="text-5xl font-nexa font-bold text-emerald-500">CalmQuest</span></h1>
                <p className="lg: text-2xl text-center justify-center bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-nexa font-bold">Daily Quests:</p>
      
                <TaskList />
              </div>
              <div className=" w-full p-8 bg-opacity-80  bg-white rounded-lg shadow">
                <p className="text-2xl text-center bg-gradient-to-l from-emerald-600 via-emerald-500 to-emerald-600 bg-clip-text text-transparent font-nexa font-bold">Today's Inspiring Quote:</p>
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

                  <p>
                    <a href="/login" onClick={() => Auth.logout()}>Logout</a>
                  </p>

            </div>
          )}
        </div>
      ) : null}
    </>  
  );
};