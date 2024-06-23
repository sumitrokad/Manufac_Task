import React, { useEffect, useState } from 'react';
import { Table } from '@mantine/core';

const CropStatisticsTable = () => {
  // State to hold the statistics data fetched from JSON
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Effect hook to fetch data when the component mounts
    fetch('/indian_agriculture_data.json')
      .then(response => response.json())  // Parse JSON response
      .then(data => {
        // Initialize an object to store aggregated statistics per crop
        const cropStats = {};

        // Iterate through each data item fetched
        data.forEach(item => {
          const cropName = item['Crop Name'];  // Get crop name from data
          // Parse yield and area values, default to 0 if not a number
          const yieldVal = parseFloat(item['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0;
          const areaVal = parseFloat(item['Area Under Cultivation (UOM:Ha(Hectares))']) || 0;

          // Initialize crop stats if it doesn't exist in cropStats
          if (!cropStats[cropName]) {
            cropStats[cropName] = { totalYield: 0, totalArea: 0, count: 0 };
          }

          // Accumulate total yield, total area, and count for averaging later
          cropStats[cropName].totalYield += yieldVal;
          cropStats[cropName].totalArea += areaVal;
          cropStats[cropName].count += 1;
        });

        // Transform cropStats object into an array of objects for rendering
        const statsArray = Object.keys(cropStats).map(cropName => {
          const { totalYield, totalArea, count } = cropStats[cropName];
          return {
            cropName,
            avgYield: (totalYield / count).toFixed(3),  // Calculate average yield with 3 decimal places
            avgArea: (totalArea / count).toFixed(3),   // Calculate average area with 3 decimal places
          };
        });

        // Set the state with the formatted statistics array
        setStats(statsArray);
      })
      .catch(error => console.error('Error fetching crop data:', error));  // Handle any errors during fetch
  }, []);  // Empty dependency array ensures useEffect runs only once on mount

  return (
    <Table>
      <thead>
        <tr>
          <th>Crop</th>
          <th>Average Yield (1950-2020)</th>
          <th>Average Cultivation Area (1950-2020)</th>
        </tr>
      </thead>
      <tbody>
        {/* Map over stats array to render table rows */}
        {stats.map((item, index) => (
          <tr key={index}>
            <td>{item.cropName}</td>
            <td>{item.avgYield}</td>
            <td>{item.avgArea}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CropStatisticsTable;
