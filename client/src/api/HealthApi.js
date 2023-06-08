const fetchHealthResources = async () => {
  const response = await fetch("https://health.gov/myhealthfinder/api/v3/.json");
  const data = await response.json();
  return data.resources;
};

export { fetchHealthResources };

const fetchHealthResourceById = async (id) => {
  try {
    const response = await fetch(`https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=English&topicId=${id}.json`);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // Log the response data
      return data;
    } else {
      throw new Error('Request failed');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { fetchHealthResourceById };