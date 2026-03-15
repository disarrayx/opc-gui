import { addCounts } from "./averageSampleObj";
import { makeBlankSample } from "./makeBlankSample";

// Global data storage
const uploadedData = {};
let fileQueue = [];
let currentFile = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-upload');
    const overlay = document.querySelector('.overlay');
    const optionsForm = document.getElementById('optionsForm');
    const cancelBtn = document.querySelector('.cancel');
    
    // File input already triggered by label's "for" attribute
    // Just handle the change event
    fileInput.addEventListener('change', handleFileSelect);
    
    // Handle form submission
    optionsForm.addEventListener('submit', handleFormSubmit);
    
    // Handle cancel button
    cancelBtn.addEventListener('click', handleCancel);
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            handleCancel();
        }
    });
});

function handleFileSelect(event) {
    const files = Array.from(event.target.files);
    
    console.log('Files selected:', files.length);
    
    if (files.length === 0) return;
    
    // Add files to queue
    fileQueue = files;
    
    // Start processing first file
    processNextFile();
    
    // Reset file input
    event.target.value = '';
}

function processNextFile() {
    if (fileQueue.length === 0) {
        currentFile = null;
        return;
    }
    
    currentFile = fileQueue.shift();
    
    console.log('Processing file:', currentFile.name);
    
    // Update popup with filename
    document.getElementById('popup-filename').textContent = currentFile.name;
    
    // Show popup
    document.querySelector('.overlay').classList.add('active');
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    console.log('Form submitted');
    
    if (!currentFile) {
        console.error('No current file');
        return;
    }
    
    // Get form values
    const formData = new FormData(event.target);
    const area = formData.get('option1');
    const time = formData.get('option2');
    const depth = formData.get('option3');
    const day = formData.get('option4');
    
    console.log('Form values:', { area, time, depth, day });
    
    // Read and parse the file
    Papa.parse(currentFile, {
        complete: function(results) {
            console.log('Parse complete:', results);
            
            const parsedData = parseC00File(results.data, currentFile.name, area, time, depth, day);
            
            if (parsedData) {
                console.log('Parsed data:', parsedData);
                
                // Store data
                const fileId = generateFileId();
                uploadedData[fileId] = parsedData;
                
                console.log('Stored with ID:', fileId);
                
                // Create file card
                createFileCard(fileId, parsedData);
                
                // Update counter
                updateFileCounter();
            } else {
                console.error('Failed to parse file data');
                alert('Error: Could not parse file ' + currentFile.name);
            }
            
            // Hide popup
            document.querySelector('.overlay').classList.remove('active');
            
            // Process next file in queue
            processNextFile();
        },
        error: function(error) {
            console.error('Error parsing file:', error);
            alert('Error parsing file: ' + currentFile.name);
            
            // Hide popup and continue
            document.querySelector('.overlay').classList.remove('active');
            processNextFile();
        }
    });
}

function handleCancel() {
    console.log('Cancelled');
    
    // Clear current file and queue
    currentFile = null;
    fileQueue = [];
    
    // Hide popup
    document.querySelector('.overlay').classList.remove('active');
}

function parseC00File(data, fileName, area, time, depth, day) {
    console.log('Parsing C00 file, total rows:', data.length);
    
    // Find the row that starts with "TIME (s)" - this is the header
    let headerIndex = -1;
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] && data[i][0].toString().includes('TIME')) {
            headerIndex = i;
            console.log('Found header at row:', i);
            break;
        }
    }
    
    if (headerIndex === -1) {
        console.error('Could not find header row');
        return null;
    }
    
    // Get the last data row (the one with actual counts)
    let dataRow = null;
    for (let i = data.length - 1; i >= headerIndex + 1; i--) {
        // Find first row with data after header
        if (data[i] && data[i].length > 8 && data[i][0] !== '' && data[i][0] !== undefined) {
            dataRow = data[i];
            console.log('Found data row at index:', i, 'Length:', dataRow.length);
            break;
        }
    }
    
    if (!dataRow) {
        console.error('Could not find data row');
        return null;
    }
    
    // Extract bin counts (starting from index 8, skip first 3 values, take next 24)
    const binsStartIndex = 8; // After GPS column
    const binCounts = [];
    
    console.log('First few values after GPS:', dataRow.slice(8, 15));
    
    // Skip first 3 bin values, then read bins 1-24
    for (let i = 0; i < 24; i++) {
        const countIndex = binsStartIndex + 3 + i; // +3 to skip the first 3 bins
        const count = parseInt(dataRow[countIndex]) || 0;
        binCounts.push({
            bin: i + 1,
            counts: count
        });
    }
    
    console.log('Extracted bins:', binCounts.slice(0, 5), '... total:', binCounts.length);
    
    return {
        fromFile: fileName,
        area: area,
        time: time,
        depth: depth,
        day: day,
        sample_num: 0, // Default value as per requirements
        bins: binCounts
    };
}

function generateFileId() {
    return 'file_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function createFileCard(fileId, data) {
    const filesContainer = document.querySelector('.files');
    
    const fileCard = document.createElement('file-card');
    fileCard.setAttribute('data-file-id', fileId);
    fileCard.setAttribute('fileName', data.fromFile);
    fileCard.setAttribute('sample', data.sample_num.toString());
    fileCard.setAttribute('site', data.area);
    fileCard.setAttribute('timeOfDay', data.time);
    fileCard.setAttribute('depth', data.depth);
    fileCard.setAttribute('day', data.day);
    
    filesContainer.appendChild(fileCard);
    
    console.log('Created file card for:', data.fromFile);
}

function deleteFile(fileId) {
    // Remove from data storage
    delete uploadedData[fileId];
    
    // Remove from DOM
    const fileCard = document.querySelector(`[data-file-id="${fileId}"]`);
    if (fileCard) {
        fileCard.remove();
    }
    
    // Update counter
    updateFileCounter();
}

function updateFileCounter() {
    const count = Object.keys(uploadedData).length;
    document.getElementById('uploaded-files-count').textContent = count;
}

// @param allSampleAverageObj { samples: [ {}, {}, {} ] }
function splitByDayNight(averagedData) {
    let res = {
        day: makeBlankSample(),
        night: makeBlankSample(),
    }
    for (sample in averagedData.samples) {
        if (sample.time == "day") {
            addCounts(res.day, sample);
        } else if (sample.time == "night") {
            addCounts(res.night, sample);
        }
    }
    res.day.time = "day";
    res.night.time = "night";
    
    return res;
}

function splitBySurfaceDeep(averagedData) {
    let res = {
        surface: makeBlankSample(),
        deep: makeBlankSample(),
    }
    for (sample in averagedData.samples) {
        if (sample.depth == "surface") {
            addCounts(res.surface, sample);
        } else if (sample.depth == "deep") {
            addCounts(res.deep, sample);
        }
    }
    res.surface.depth = "surface";
    res.deep.depth ="deep";

    return res;
}

function splitByWestCentral(averagedData) {
    let res = {
        western: makeBlankSample(),
        central: makeBlankSample(),
    }
    for (sample in averagedData.samples) {
        if (sample.area == "central") {
            addCounts(res.central, sample);
        } else if (sample.area == "western") {
            addCounts(res.western, sample);
        }
    }
    res.western.area = "western";
    res.central.area = "central";

    return res;
}

// Make functions available globally
window.deleteFile = deleteFile;
window.uploadedData = uploadedData;