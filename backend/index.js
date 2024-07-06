// backend/index.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Ollama = require('@ollama/sdk'); // Ensure this is the correct way to import Ollama

const app = express();
const PORT = 3001;

let dbClient;
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'file_database';
const collectionName = 'file_embeddings';

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error('Error connecting to MongoDB:', err);
    return;
  }
  console.log('Connected to MongoDB');
  dbClient = client.db(dbName);
});

app.post('/upload', async (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }

    const uploadedFile = req.files.file;
    const tempFilePath = path.join(__dirname, 'uploads', uploadedFile.name);

    await uploadedFile.mv(tempFilePath);

    console.log(`File ${uploadedFile.name} uploaded successfully.`);

    const embedding = await processFile(tempFilePath);
    const insertResult = await insertEmbedding(embedding);

    console.log(`Embedding for file ${uploadedFile.name} inserted into MongoDB.`);

    res.status(200).send('File uploaded and processed successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file. Please try again.');
  }
});

async function processFile(filePath) {
  try {
    const documentBuffer = fs.readFileSync(filePath);
    const documentText = (await pdfParse(documentBuffer)).text;

    const model = new Ollama('nomic-embed-text'); // Initialize the Ollama model

    const embedding = await model.embed({ text: documentText });
    
    return embedding;
  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  }
}

async function insertEmbedding(embedding) {
  try {
    const collection = dbClient.collection(collectionName);
    const insertResult = await collection.insertOne({ embedding });

    return insertResult;
  } catch (error) {
    console.error('Error inserting embedding:', error);
    throw error;
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
