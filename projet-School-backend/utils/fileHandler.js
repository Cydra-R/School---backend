// JSON file read/write functions
const fs = require('fs').promises;
const path = require('path');

const dataDir = path.join(__dirname, '../data');

// Read JSON file
const readJsonFile = async (filename) => {
  try {
    const filePath = path.join(dataDir, filename);
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error.message);
    throw error;
  }
};

// Write JSON file
const writeJsonFile = async (filename, data) => {
  try {
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`File ${filename} written successfully`);
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error.message);
    throw error;
  }
};

// Export data
const exportData = async (filename, data) => {
  try {
    const exportsDir = path.join(dataDir, 'exports');
    const filePath = path.join(exportsDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log(`Data exported to ${filename}`);
  } catch (error) {
    console.error(`Error exporting data:`, error.message);
    throw error;
  }
};

module.exports = {
  readJsonFile,
  writeJsonFile,
  exportData,
};
