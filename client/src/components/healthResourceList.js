import React, { useState, useEffect } from 'react';
import { fetchHealthResourceById } from '../api/HealthApi';
import { fetchHealthResources } from '../api/HealthApi';
import Modal from './Modal';

const HealthResourceList = ({ handleResourceClick }) => {
  const [healthResources, setHealthResources] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const resources = await fetchHealthResources();
      setHealthResources(resources);
    };

    fetchData();
  }, []);

  const staticResources = [
    { id: '30560', title: 'Manage stress' },
    { id: '25', title: 'Keep your heart Healthy' },
    { id: '30533', title: 'Get Enough Sleep' },
    { id: '30547', title: 'Get Active' },
    { id: '30589', title: 'Choosing a Doctor: Quick Tips' },
  ];

  const [loading, setLoading] = useState(false);

  const handleResourceButtonClick = async (id) => {
    setLoading(true);
    setShowModal(true);
    const resource = await fetchHealthResourceById(id);
    setSelectedResource(resource); 
    setLoading(false);
  };

  const allResources = [...staticResources, ...healthResources];

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredResources = allResources.filter((resource) =>
    resource.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl mt-20 mb-4 text-blue-400">Health Resources</h2>
      <input
        type="search"
        placeholder="Search..."
        className="mb-6 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-100"
        value={search}
        onChange={handleSearch}
      />
      <ul className="text-left ">
        {filteredResources.map((resource) => (
          <li key={resource.id} className="mb-2 hover:bg-gray-200 rounded">
            {staticResources.some((staticResource) => staticResource.id === resource.id) ? (
              <button
                className="w-full text-left"
                onClick={() => handleResourceButtonClick(resource.id)}
              >
                {resource.title}
              </button>
            ) : (
              <button
                className="w-full text-left"
                onClick={() => handleResourceClick(resource)}
              >
                {resource.title}
              </button>
            )}
          </li>
        ))}
      </ul>
      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        {loading ? (
            <p className="p-4 text-center text-gray-700">Loading...</p>
        ) : (
            <div className="p-4 bg-white text-gray-800 rounded shadow">
            <h3 className="text-3xl text-center font-semibold mb-4 bg-gray-100 p-2 rounded">{selectedResource?.Result.Resources.Resource[0].Title}</h3>
            
            <div className="prose prose-blue " dangerouslySetInnerHTML={{ __html: selectedResource?.Result.Resources.Resource[0].Sections.section[0].Content }}/>
            </div>
        )}
      </Modal>
    </div>
  );
};

export default HealthResourceList;