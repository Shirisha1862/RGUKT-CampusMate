// client/src/pages/SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query) {
      // Updated the API route here
      axios.get(`/api/services?q=${query}`)
        .then(res => setResults(res.data))
        .catch(err => console.error("Search error:", err));
    }
  }, [query]);

  return (
    <div className="max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-semibold mb-4">
        Results for: <span className="text-blue-600">{query}</span>
      </h1>
      {results.length > 0 ? (
        <ul className="space-y-4">
          {results.map(service => (
            <li key={service._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold">{service.title}</h2>
              <p>{service.description}</p>
              <p className="text-sm text-gray-500">{service.location}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No services found.</p>
      )}
    </div>
  );
};

export default SearchResults;
