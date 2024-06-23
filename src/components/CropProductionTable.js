import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';

const CropProductionTable = () => {
  // State to hold the production data fetched from API or local file
  const [productionData, setProductionData] = useState([]);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Simulated fetch operation, replace with actual data fetching
    const fetchData = async () => {
      try {
        // Replace with your actual data fetching logic
        const response = await fetch('/crop_production_data.json');
        
        // Check if the response is not successful
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        // Parse the JSON response
        const data = await response.json();

        // Process the data to match the format expected by the component
        const formattedData = data.map(item => ({
          year: item.Year,
          maxCrop: item['Crop with Maximum Production'],
          minCrop: item['Crop with Minimum Production']
        }));

        // Update state with the formatted data
        setProductionData(formattedData);
      } catch (error) {
        console.error('Error fetching crop production data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <Table>
      <thead>
        <tr>
          <th>Year</th>
          <th>Crop with Maximum Production</th>
          <th>Crop with Minimum Production</th>
        </tr>
      </thead>
      <tbody>
        {/* Map over productionData array to render table rows */}
        {productionData.map((item, index) => (
          <tr key={index}>
            <td>{item.year}</td>
            <td>{item.maxCrop}</td>
            <td>{item.minCrop}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CropProductionTable;
