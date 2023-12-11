import React, { useReducer, useEffect, useState } from "react";

const initialState = { hotels: [], filteredHotels: [] };

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, hotels: action.payload, filteredHotels: action.payload };
    case "FILTER":
      const { userInput } = action.payload;
      const filtered = state.hotels.filter(
        (hotel) => hotel.city.toLowerCase() === userInput.toLowerCase()
      );
      return { ...state, filteredHotels: filtered };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://content.newtonschool.co/v1/pr/63b85bcf735f93791e09caf4/hotels"
        );
        const data = await response.json();
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  const handleFilter = (e) => {
    const userInput = e.target.value;
    dispatch({ type: "FILTER", payload: { userInput } });
  };

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Enter city name"
        onChange={handleFilter}
      />
      <ul>
        {state.filteredHotels.map((hotel, index) => (
          <li key={index}>{hotel.hotel_name}</li>
        ))}
      </ul>
    </div>
  );
}

  
