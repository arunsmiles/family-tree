// Main entry point for the Family Tree Visualization application
import { parseCSV } from './csvParser.js';
import { buildFamilyTree } from './familyTreeBuilder.js';
import { renderFamilyTree } from './treeRenderer.js';
import { setupConfig } from './configManager.js';
import { sampleData } from './sampleData.js';
import { exportSVG as exportSVGUtil } from './modules/ExportUtils.js';

// Debug logs flag - set to true to see debug messages
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[Family Tree Vis] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

// Global variables
let familyData = [];
let renderer = null;
let elements = {};

// Get DOM elements
document.addEventListener('DOMContentLoaded', function() {
    // Get element references
    elements = {
        csvFileInput: document.getElementById('csv-file'),
        loadSampleBtn: document.getElementById('load-sample'),
        rootPersonSelect: document.getElementById('root-person'),
        generateTreeBtn: document.getElementById('generate-tree'),
        exportSvgSingleBtn: document.getElementById('export-svg-single'),
        exportSvgPagesBtn: document.getElementById('export-svg-pages'),
        exportPdfBtn: document.getElementById('export-pdf'),
        resetViewBtn: document.getElementById('reset-view'),
        orientationSelect: document.getElementById('orientation'),
        nodeSizeInput: document.getElementById('node-size'),
        nodeSpacingInput: document.getElementById('node-spacing'),
        colorSchemeSelect: document.getElementById('color-scheme'),
        fontSizeInput: document.getElementById('font-size'),
        lineStyleSelect: document.getElementById('line-style'),
        svgWidthInput: document.getElementById('svg-width'),
        svgHeightInput: document.getElementById('svg-height'),
        visualizationContainer: document.getElementById('visualization-container'),
        personSelection: document.getElementById('person-selection')
    };
    
    // Check if all elements were found
    const missingElements = Object.entries(elements)
        .filter(([name, element]) => !element)
        .map(([name]) => name);
    
    if (missingElements.length > 0) {
        console.error('Missing elements:', missingElements);
    } else {
        // All elements found, initialize the application
        initApp();
    }
});

// Initialize the application
function initApp() {
    debugLog('Initializing application');
    
    // Register event listeners
    elements.csvFileInput.addEventListener('change', handleFileUpload);
    elements.loadSampleBtn.addEventListener('click', loadSampleData);
    elements.generateTreeBtn.addEventListener('click', generateTree);
    elements.exportSvgSingleBtn.addEventListener('click', () => exportSVG(false, false));
    elements.exportSvgPagesBtn.addEventListener('click', () => exportSVG(true, false));
    elements.exportPdfBtn.addEventListener('click', () => exportSVG(true, true));
    elements.resetViewBtn.addEventListener('click', resetView);
    elements.rootPersonSelect.addEventListener('change', updateSelectedPerson);
    
    // Debugging - log elements
    debugLog('App initialized with elements', Object.keys(elements));
    
    // Log important components
    if (DEBUG) {
        console.log('Component check:', [
            { id: 'csv-file', name: 'CSV File Input' },
            { id: 'load-sample', name: 'Load Sample Button' },
            { id: 'generate-tree', name: 'Generate Tree Button' },
            { id: 'export-svg-single', name: 'Export SVG Single Button' },
            { id: 'export-svg-pages', name: 'Export SVG Pages Button' },
            { id: 'export-pdf', name: 'Export PDF Button' },
            { id: 'reset-view', name: 'Reset View Button' },
            { id: 'visualization-container', name: 'Visualization Container' },
        ].map(component => ({
            ...component,
            found: !!document.getElementById(component.id)
        })));
    }
}

// Handle file upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    debugLog('File selected for upload', { name: file.name, size: file.size });
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csvContent = e.target.result;
            debugLog('CSV file loaded, parsing content');
            
            familyData = parseCSV(csvContent);
            debugLog('CSV parsed successfully', { records: familyData.length });
            
            populatePersonSelection();
        } catch (error) {
            debugLog('Error parsing CSV', error);
            showStatusMessage('Error parsing CSV file. Please check the format.', 'error');
        }
    };
    
    reader.onerror = function() {
        debugLog('Error reading file');
        showStatusMessage('Error reading file.', 'error');
    };
    
    reader.readAsText(file);
}

// Load sample data
function loadSampleData() {
    debugLog('Loading sample data');
    
    // Use fetch to load the sample data
    fetch('data/sample-family-tree.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(csvContent => {
            debugLog('Sample data loaded, parsing content');
            
            familyData = parseCSV(csvContent);
            debugLog('Sample data parsed successfully', { records: familyData.length });
            
            populatePersonSelection();
        })
        .catch(error => {
            debugLog('Error loading sample data', error);
            showStatusMessage('Error loading sample data.', 'error');
        });
}

// Populate person selection dropdown
function populatePersonSelection() {
    debugLog('Populating person selection dropdown');
    
    if (!familyData || familyData.length === 0) {
        debugLog('No family data available');
        return;
    }
    
    try {
        // Clear existing options
        elements.rootPersonSelect.innerHTML = '';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '-- Select a person --';
        elements.rootPersonSelect.appendChild(defaultOption);
        
        // Add all people as options
        familyData.forEach(person => {
            const option = document.createElement('option');
            option.value = person.id;
            
            // Create option text with name and lifespan if available
            let optionText = person.name;
            if (person.birth_year || person.death_year) {
                optionText += ' (';
                if (person.birth_year) optionText += person.birth_year;
                optionText += '-';
                if (person.death_year) optionText += person.death_year;
                optionText += ')';
            }
            
            option.textContent = optionText;
            elements.rootPersonSelect.appendChild(option);
        });
        
        // Show the person selection container
        elements.personSelection.style.display = 'block';
        
        // Auto-select first person
        autoSelectFirstPerson();
        
        debugLog('Person selection dropdown populated');
    } catch (error) {
        debugLog('Error populating person selection', error);
        showStatusMessage('Error populating person selection.', 'error');
    }
}

// Auto-select first person in dropdown
function autoSelectFirstPerson() {
    if (elements.rootPersonSelect.options.length > 1) {
        // Select the first non-placeholder option (index 1)
        elements.rootPersonSelect.selectedIndex = 1;
        
        // Trigger the change event manually
        updateSelectedPerson({ target: { value: elements.rootPersonSelect.value } });
    }
}

// Generate the family tree visualization
function generateTree() {
    debugLog('Generate family tree requested');
    
    if (!familyData || familyData.length === 0) {
        debugLog('No family data available');
        showStatusMessage('Please upload a CSV file or load sample data first.', 'error');
        return;
    }
    
    if (!elements.rootPersonSelect.value) {
        debugLog('No root person selected');
        showStatusMessage('Please select a person to view their family tree.', 'error');
        return;
    }
    
    try {
        // Clear previous visualization
        elements.visualizationContainer.innerHTML = '';
        debugLog('Visualization container cleared');
        
        // Make sure the visualization container is visible
        elements.visualizationContainer.style.display = 'block';
        elements.visualizationContainer.style.minHeight = '500px';
        elements.visualizationContainer.style.border = '1px solid #ccc';
        
        // Get configuration options
        const config = {
            orientation: elements.orientationSelect.value,
            nodeSize: parseFloat(elements.nodeSizeInput.value),
            nodeSpacing: parseFloat(elements.nodeSpacingInput.value),
            colorScheme: elements.colorSchemeSelect.value,
            fontSize: parseInt(elements.fontSizeInput.value),
            lineStyle: elements.lineStyleSelect.value,
            svgWidth: parseInt(elements.svgWidthInput.value),
            svgHeight: parseInt(elements.svgHeightInput.value),
            language: 'en', // Default to English 
            rootPersonId: elements.rootPersonSelect.value,
            showOnlyDirectFamily: false // Show ALL descendants, not just direct family
        };
        
        debugLog('Configuration options', config);
        
        // Build the family tree structure
        debugLog('Building family tree');
        const familyTree = buildFamilyTree(familyData, elements.rootPersonSelect.value);
            
        // Render the family tree
        debugLog('Rendering family tree');
        renderer = renderFamilyTree(familyTree, elements.visualizationContainer, config);
        
        debugLog('Family tree rendered successfully');
        
        // Scroll to visualization
        elements.visualizationContainer.scrollIntoView({ behavior: 'smooth' });
    } catch (error) {
        console.error('Error generating family tree:', error);
        showStatusMessage('Error generating family tree.', 'error');
    }
}

// Update selected person
function updateSelectedPerson(event) {
    debugLog('Root person selection changed', { value: event.target.value });
    if (event.target.value) {
        generateTree();
    }
}

// Reset the tree view
function resetView() {
    if (renderer) {
        renderer.resetView();
    }
}

// Export the SVG
function exportSVG(splitIntoPages = false, exportAsPdf = false) {
    if (!renderer) {
        alert('Please generate a family tree first.');
        return;
    }
    
    try {
        console.log('Exporting SVG...');
        
        // Call exportSVG directly from imported function instead of through renderer
        exportSVGUtil(renderer.svg, renderer.nodeWidth, renderer.nodeHeight, splitIntoPages, exportAsPdf);
    } catch (error) {
        console.error('Error exporting SVG:', error);
        alert('Error exporting SVG: ' + error.message);
    }
}

// Show status message
function showStatusMessage(message, type = 'info') {
    debugLog(`Showing ${type} message: ${message}`);
    
    // Create status container if it doesn't exist
    let statusContainer = document.getElementById('status-container');
    if (!statusContainer) {
        statusContainer = document.createElement('div');
        statusContainer.id = 'status-container';
        statusContainer.style.margin = '10px 0';
        statusContainer.style.padding = '10px';
        statusContainer.style.borderRadius = '4px';
        document.querySelector('.container').insertBefore(statusContainer, elements.visualizationContainer);
    }
    
    // Set styles based on message type
    statusContainer.style.backgroundColor = type === 'error' ? '#ffebee' : '#e8f5e9';
    statusContainer.style.color = type === 'error' ? '#c62828' : '#2e7d32';
    statusContainer.style.border = `1px solid ${type === 'error' ? '#ffcdd2' : '#c8e6c9'}`;
    
    // Set message content
    statusContainer.textContent = message;
    
    // Scroll to message
    statusContainer.scrollIntoView({ behavior: 'smooth' });
} 