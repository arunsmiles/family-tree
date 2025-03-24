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
        console.log(`[App] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

// DOM elements
const fileInput = document.getElementById('csv-file');
const loadSampleBtn = document.getElementById('load-sample');
const generateTreeBtn = document.getElementById('generate-tree');
const exportSvgBtn = document.getElementById('export-svg');
const resetViewBtn = document.getElementById('reset-view');
const visualizationContainer = document.getElementById('visualization-container');
const personSelectionContainer = document.getElementById('person-selection');
const rootPersonSelect = document.getElementById('root-person');

// Application state
let familyData = null;
let familyTree = null;
let renderer = null;
let selectedRootPerson = null;

// Initialize the application
async function initApp() {
    debugLog('Initializing application');

    // Check if all DOM elements are found
    validateDOMElements();
    
    // Setup configuration options
    setupConfig();
    
    // Add event listeners
    addEventListeners();
    
    debugLog('Application initialized successfully');
    showStatusMessage('Application initialized. Please load data or sample to begin.', 'info');
}

// Validate that all required DOM elements exist
function validateDOMElements() {
    debugLog('Validating DOM elements');
    
    const requiredElements = [
        { id: 'csv-file', name: 'CSV File Input' },
        { id: 'load-sample', name: 'Load Sample Button' },
        { id: 'generate-tree', name: 'Generate Tree Button' },
        { id: 'export-svg', name: 'Export SVG Button' },
        { id: 'reset-view', name: 'Reset View Button' },
        { id: 'visualization-container', name: 'Visualization Container' },
        { id: 'person-selection', name: 'Person Selection Container' },
        { id: 'root-person', name: 'Root Person Dropdown' }
    ];
    
    const missingElements = [];
    
    requiredElements.forEach(element => {
        const domElement = document.getElementById(element.id);
        if (!domElement) {
            missingElements.push(element.name);
            debugLog(`Missing DOM element: ${element.id}`);
        }
    });
    
    if (missingElements.length > 0) {
        const error = `Some required DOM elements were not found: ${missingElements.join(', ')}`;
        debugLog(error);
        console.error(error);
        
        // Try to show an error message even if the status container might be missing
        try {
            showStatusMessage(`Application initialization error: Missing DOM elements - ${missingElements.join(', ')}`, 'error');
        } catch (e) {
            // If showStatusMessage fails, create a basic error display
            const errorDiv = document.createElement('div');
            errorDiv.style.backgroundColor = '#ffebee';
            errorDiv.style.color = '#c62828';
            errorDiv.style.padding = '15px';
            errorDiv.style.margin = '15px';
            errorDiv.style.border = '1px solid #ef9a9a';
            errorDiv.style.borderRadius = '4px';
            errorDiv.textContent = error;
            
            // Try to add to the body or any available container
            const container = document.querySelector('.container') || document.body;
            container.prepend(errorDiv);
        }
        
        return false;
    }
    
    debugLog('All required DOM elements found');
    return true;
}

// Add event listeners to DOM elements
function addEventListeners() {
    debugLog('Setting up event listeners');
    
    // File input
    fileInput.addEventListener('change', handleFileUpload);
    
    // Load sample data
    loadSampleBtn.addEventListener('click', loadSampleData);
    
    // Generate tree
    generateTreeBtn.addEventListener('click', generateFamilyTree);
    
    // Export SVG
    exportSvgBtn.addEventListener('click', exportSVG);
    
    // Reset view
    resetViewBtn.addEventListener('click', resetView);
    
    // Root person selection
    rootPersonSelect.addEventListener('change', (e) => {
        selectedRootPerson = e.target.value;
        generateFamilyTree();
    });
}

// Handle CSV file upload
async function handleFileUpload(event) {
    debugLog('File upload initiated');
    
    const file = event.target.files[0];
    if (!file) {
        debugLog('No file selected');
        return;
    }
    
    debugLog('Processing file', { name: file.name, size: file.size, type: file.type });
    
    try {
        // Show loading indicator
        showStatusMessage('Parsing CSV file...', 'info');
        
        familyData = await parseCSV(file);
        debugLog('CSV data parsed successfully', { records: familyData.length });
        
        // Show success message
        showStatusMessage(`Successfully loaded ${familyData.length} records from CSV file.`, 'success');
        
        // Populate person selection dropdown
        populatePersonSelection(familyData);
        
        // Auto-select the first person and generate tree
        autoSelectFirstPerson();
    } catch (error) {
        debugLog('Error parsing CSV file', error);
        showStatusMessage('Error parsing CSV file: ' + error.message, 'error');
    }
}

// Load sample data
function loadSampleData() {
    debugLog('Loading sample data');
    
    try {
        familyData = sampleData;
        debugLog('Sample data loaded successfully', { records: familyData.length });
        
        // Show success message
        showStatusMessage(`Successfully loaded ${familyData.length} sample records.`, 'success');
        
        // Populate person selection dropdown
        populatePersonSelection(familyData);
        
        // Auto-select the first person and generate tree
        autoSelectFirstPerson();
    } catch (error) {
        debugLog('Error loading sample data', error);
        showStatusMessage('Error loading sample data: ' + error.message, 'error');
    }
}

// Auto-select first person in dropdown
function autoSelectFirstPerson() {
    if (rootPersonSelect.options.length > 1) {
        // Select the first non-placeholder option (index 1)
        rootPersonSelect.selectedIndex = 1;
        
        // Trigger the change event
        selectedRootPerson = rootPersonSelect.value;
        
        // Generate the tree with the selected person
        if (selectedRootPerson) {
            debugLog('Auto-selecting first person:', selectedRootPerson);
            generateFamilyTree();
        }
    }
}

// Populate the person selection dropdown
function populatePersonSelection(data) {
    debugLog('Populating person selection dropdown');
    
    // Clear existing options
    rootPersonSelect.innerHTML = '';
    
    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Select a person --';
    rootPersonSelect.appendChild(defaultOption);
    
    // First, build a temporary family tree to estimate generations
    try {
        const tempFamilyTree = buildFamilyTree(data);
        const individualsWithGenerations = tempFamilyTree.individuals;
        
        // Create a map for quicker lookup
        const generationMap = new Map();
        individualsWithGenerations.forEach(person => {
            generationMap.set(person.id, person.generation);
        });
        
        // Group individuals by generation
        const peopleByGeneration = {};
        
        data.forEach(individual => {
            const generation = generationMap.has(individual.id) 
                ? generationMap.get(individual.id) 
                : 999; // Unknown generation goes last
                
            if (!peopleByGeneration[generation]) {
                peopleByGeneration[generation] = [];
            }
            
            peopleByGeneration[generation].push(individual);
        });
        
        // Sort generations numerically
        const sortedGenerations = Object.keys(peopleByGeneration)
            .map(Number)
            .sort((a, b) => a - b);
            
        // Create option groups for each generation and add individuals sorted by name
        sortedGenerations.forEach(generation => {
            // Create optgroup for this generation
            const optGroup = document.createElement('optgroup');
            optGroup.label = `Generation ${generation}`;
            
            // Sort people within this generation by name
            const sortedPeople = peopleByGeneration[generation].sort((a, b) => 
                a.name.localeCompare(b.name)
            );
            
            // Add options for each person in this generation
            sortedPeople.forEach(individual => {
                const option = document.createElement('option');
                option.value = individual.id;
                
                // Format the option text: Name (Birth Date)
                let optionText = individual.name;
                if (individual.birth_date) {
                    optionText += ` (${individual.birth_date})`;
                }
                
                option.textContent = optionText;
                optGroup.appendChild(option);
            });
            
            rootPersonSelect.appendChild(optGroup);
        });
    } catch (error) {
        debugLog('Error organizing dropdown by generations', error);
        
        // Fallback without generations if there's an error
        const sortedData = [...data].sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        
        // Add an option for each individual
        sortedData.forEach(individual => {
            const option = document.createElement('option');
            option.value = individual.id;
            
            // Format the option text: Name (Birth Date)
            let optionText = individual.name;
            if (individual.birth_date) {
                optionText += ` (${individual.birth_date})`;
            }
            
            option.textContent = optionText;
            rootPersonSelect.appendChild(option);
        });
    }
    
    // Show the person selection container
    personSelectionContainer.style.display = 'block';
    
    debugLog('Person selection dropdown populated');
}

// Generate the family tree visualization
function generateFamilyTree() {
    debugLog('Generate family tree requested');
    
    if (!familyData || familyData.length === 0) {
        debugLog('No family data available');
        showStatusMessage('Please upload a CSV file or load sample data first.', 'error');
        return;
    }
    
    if (!selectedRootPerson) {
        debugLog('No root person selected');
        showStatusMessage('Please select a person to view their family tree.', 'error');
        return;
    }
    
    try {
        // Show loading message
        showStatusMessage('Generating family tree...', 'info');
        
        // Clear previous visualization
        visualizationContainer.innerHTML = '';
        debugLog('Visualization container cleared');
        
        // Make sure the visualization container is visible
        visualizationContainer.style.display = 'block';
        visualizationContainer.style.minHeight = '500px';
        visualizationContainer.style.border = '1px solid #ccc';
        
        // Get configuration options
        const config = {
            orientation: document.getElementById('orientation').value,
            nodeSize: parseFloat(document.getElementById('node-size').value),
            nodeSpacing: parseFloat(document.getElementById('node-spacing').value),
            colorScheme: document.getElementById('color-scheme').value,
            fontSize: parseInt(document.getElementById('font-size').value),
            lineStyle: document.getElementById('line-style').value,
            svgWidth: parseInt(document.getElementById('svg-width').value),
            svgHeight: parseInt(document.getElementById('svg-height').value),
            language: 'en', // Default to English since we removed language selection
            rootPersonId: selectedRootPerson, // Pass the selected root person ID
            showOnlyDirectFamily: false // Show ALL descendants, not just direct family
        };
        
        debugLog('Using configuration', config);
        
        // Build the family tree data structure
        debugLog('Building family tree');
        try {
            familyTree = buildFamilyTree(familyData, selectedRootPerson);
            debugLog('Family tree built successfully', { 
                individuals: familyTree.individuals.length,
                generations: familyTree.generations
            });
        } catch (error) {
            debugLog('Error building family tree', error);
            showStatusMessage('Error building family tree: ' + error.message, 'error');
            return;
        }
        
        // Render the family tree
        debugLog('Rendering family tree');
        try {
            renderer = renderFamilyTree(familyTree, visualizationContainer, config);
            debugLog('Family tree rendered successfully');
            
            // Show success message
            showStatusMessage('Family tree generated successfully.', 'success');
            
            // Scroll to visualization
            visualizationContainer.scrollIntoView({ behavior: 'smooth' });
        } catch (error) {
            debugLog('Error rendering family tree', error);
            showStatusMessage('Error rendering family tree: ' + error.message, 'error');
        }
    } catch (error) {
        debugLog('Error generating family tree', error);
        showStatusMessage('Error generating family tree: ' + error.message, 'error');
    }
}

// Export the SVG
function exportSVG() {
    if (!renderer) {
        alert('Please generate a family tree first.');
        return;
    }
    
    try {
        console.log('Exporting SVG...');
        // Call exportSVG directly from imported function instead of through renderer
        exportSVGUtil(renderer.svg, renderer.nodeWidth, renderer.nodeHeight);
    } catch (error) {
        console.error('Error exporting SVG:', error);
        alert('Error exporting SVG: ' + error.message);
    }
}

// Reset the view
function resetView() {
    if (renderer) {
        renderer.resetView();
    }
}

// Show status messages to the user
function showStatusMessage(message, type = 'info') {
    // Create status container if it doesn't exist
    let statusContainer = document.getElementById('status-container');
    if (!statusContainer) {
        statusContainer = document.createElement('div');
        statusContainer.id = 'status-container';
        statusContainer.style.marginTop = '10px';
        statusContainer.style.padding = '10px';
        statusContainer.style.borderRadius = '4px';
        statusContainer.style.fontWeight = 'bold';
        
        // Insert after file input
        const inputSection = document.querySelector('.input-section');
        inputSection.appendChild(statusContainer);
    }
    
    // Set message and style based on type
    statusContainer.textContent = message;
    
    // Style based on message type
    if (type === 'error') {
        statusContainer.style.backgroundColor = '#ffebee';
        statusContainer.style.color = '#c62828';
        statusContainer.style.border = '1px solid #ef9a9a';
    } else if (type === 'success') {
        statusContainer.style.backgroundColor = '#e8f5e9';
        statusContainer.style.color = '#2e7d32';
        statusContainer.style.border = '1px solid #a5d6a7';
    } else { // info
        statusContainer.style.backgroundColor = '#e3f2fd';
        statusContainer.style.color = '#1565c0';
        statusContainer.style.border = '1px solid #90caf9';
    }
    
    // Scroll to message
    statusContainer.scrollIntoView({ behavior: 'smooth' });
}

// Event listener for when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
}); 