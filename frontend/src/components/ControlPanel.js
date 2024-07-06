import React from 'react';
import axios from 'axios';

function ControlPanel({ files, folderPath }) {
  const handleStartRAG = () => {
    axios.post('/api/rag', { files, folderPath })
      .then(response => {
        console.log('RAG process started:', response.data);
      })
      .catch(error => {
        console.error('There was an error starting the RAG process!', error);
      });
  };

  return (
    <div>
      <button onClick={handleStartRAG}>Start RAG Process</button>
    </div>
  );
}

export default ControlPanel;
