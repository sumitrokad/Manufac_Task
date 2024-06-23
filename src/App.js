import React from 'react';
import { MantineProvider } from '@mantine/core';
import CropProductionTable from './components/CropProductionTable';
import CropStatisticsTable from './components/CropStatisticsTable';

const App = () => {
  return (
    <MantineProvider>
      <div>
        <h1>Crop Production Data</h1>
        <CropProductionTable />
        <h1>Crop Statistics Data</h1>
        <CropStatisticsTable />
      </div>
    </MantineProvider>
  );
};

export default App;
