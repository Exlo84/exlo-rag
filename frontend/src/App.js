// frontend/src/App.js

import React, { useState } from 'react';
import './App.css';

function App() {
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileUpload = async (event) => {
    try {
      setUploadStatus('Uploading file...');
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:3001/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }

      setUploadStatus('File uploaded and processed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('Error uploading file. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PDF File Upload</h1>
        <input type="file" onChange={handleFileUpload} />
        {uploadStatus && <p>{uploadStatus}</p>}
      </header>
    </div>
  );
}

export default App;
