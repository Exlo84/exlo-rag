import React from 'react';

const FileSelector = ({ onSelectFiles }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onSelectFiles(files);
  };

  return (
    <div>
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileSelector;
