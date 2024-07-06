import React from 'react';

const FileList = ({ files }) => (
  <div>
    <h2>Selected Files</h2>
    <ul>
      {files.map((file, index) => (
        <li key={index}>{file.name}</li>
      ))}
    </ul>
  </div>
);

export default FileList;
