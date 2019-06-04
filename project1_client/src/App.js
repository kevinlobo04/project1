import React from 'react';
import './style.css';
import ImportPane from './ImportPane';
import ExportPane from './ExportPane';

const App = () => (
  <div className="app">
      <ImportPane />
      <div className = "exportpane">
        <ExportPane />
      </div>
    </div>
);


export default App;