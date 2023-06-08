import React, { useState, useEffect } from 'react';
import { fetchHealthResourceById } from '../api/HealthApi';
import { fetchHealthResources } from '../api/HealthApi';

const HealthResourceList = ({ handleResourceClick }) => {
  const [healthResources, setHealthResources] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const resources = await fetchHealthResources();
      setHealthResources(resources);
    };

    fetchData();
  }, []);

  const staticResources = [
    { id: 'anxiety', title: 'Manage Anxiety' },
    { id: 'heart', title: 'Keep your heart Healthy' },
    { id: 'sleep', title: 'Get Enough Sleep' },
    { id: 'active', title: 'Get Active' },
    { id: 'doctor', title: 'Choosing a Doctor: Quick Tips' },
  ];

  const handleResourceButtonClick = async (id) => {
    const resource = await fetchHealthResourceById(id);
    handleResourceClick(resource);
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
      <ul className="text-left">
        {filteredResources.map((resource) => (
          <li key={resource.id} className="mb-2">
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
    </div>
  );
};

export default HealthResourceList;