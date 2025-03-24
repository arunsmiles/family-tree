// Configuration Manager for Family Tree Visualization
import { t } from './i18n.js';

// Set up configuration options and event handlers
export function setupConfig() {
    setupInputHandlers();
    loadSavedConfig();
}

// Set up event handlers for configuration inputs
function setupInputHandlers() {
    // Layout options
    setupRangeInput('node-size', 'node-size-value', (value) => `${value}x`);
    setupRangeInput('node-spacing', 'node-spacing-value', (value) => `${value}x`);
    
    // Visual options
    setupRangeInput('font-size', 'font-size-value', (value) => `${value}px`);
    
    // Export options
    document.getElementById('svg-width').addEventListener('change', saveConfig);
    document.getElementById('svg-height').addEventListener('change', saveConfig);
    
    // Other select inputs
    document.getElementById('orientation').addEventListener('change', saveConfig);
    document.getElementById('color-scheme').addEventListener('change', saveConfig);
    document.getElementById('line-style').addEventListener('change', saveConfig);
}

// Set up a range input with a value display
function setupRangeInput(inputId, valueDisplayId, formatter = (value) => value) {
    const input = document.getElementById(inputId);
    
    // Create value display if it doesn't exist
    let valueDisplay = document.getElementById(valueDisplayId);
    if (!valueDisplay) {
        valueDisplay = document.createElement('span');
        valueDisplay.id = valueDisplayId;
        valueDisplay.className = 'range-value';
        input.parentNode.insertBefore(valueDisplay, input.nextSibling);
    }
    
    // Initial value
    valueDisplay.textContent = formatter(input.value);
    
    // Update on input
    input.addEventListener('input', () => {
        valueDisplay.textContent = formatter(input.value);
    });
    
    // Save config on change
    input.addEventListener('change', saveConfig);
}

// Get current configuration from UI
export function getCurrentConfig() {
    return {
        orientation: document.getElementById('orientation').value,
        nodeSize: parseFloat(document.getElementById('node-size').value),
        nodeSpacing: parseFloat(document.getElementById('node-spacing').value),
        colorScheme: document.getElementById('color-scheme').value,
        fontSize: parseInt(document.getElementById('font-size').value),
        lineStyle: document.getElementById('line-style').value,
        svgWidth: parseInt(document.getElementById('svg-width').value),
        svgHeight: parseInt(document.getElementById('svg-height').value)
    };
}

// Save configuration to localStorage
function saveConfig() {
    try {
        const config = getCurrentConfig();
        localStorage.setItem('familyTreeConfig', JSON.stringify(config));
    } catch (e) {
        console.warn('Failed to save configuration:', e);
    }
}

// Load saved configuration from localStorage
function loadSavedConfig() {
    try {
        const savedConfig = localStorage.getItem('familyTreeConfig');
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            applyConfig(config);
        }
    } catch (e) {
        console.warn('Failed to load saved configuration:', e);
    }
}

// Apply configuration to UI elements
function applyConfig(config) {
    if (config.orientation) {
        document.getElementById('orientation').value = config.orientation;
    }
    
    if (config.nodeSize) {
        document.getElementById('node-size').value = config.nodeSize;
    }
    
    if (config.nodeSpacing) {
        document.getElementById('node-spacing').value = config.nodeSpacing;
    }
    
    if (config.colorScheme) {
        document.getElementById('color-scheme').value = config.colorScheme;
    }
    
    if (config.fontSize) {
        document.getElementById('font-size').value = config.fontSize;
    }
    
    if (config.lineStyle) {
        document.getElementById('line-style').value = config.lineStyle;
    }
    
    if (config.svgWidth) {
        document.getElementById('svg-width').value = config.svgWidth;
    }
    
    if (config.svgHeight) {
        document.getElementById('svg-height').value = config.svgHeight;
    }
    
    // Update range value displays
    document.getElementById('node-size-value').textContent = `${config.nodeSize}x`;
    document.getElementById('node-spacing-value').textContent = `${config.nodeSpacing}x`;
    document.getElementById('font-size-value').textContent = `${config.fontSize}px`;
}

// Export functions
export default {
    setupConfig,
    getCurrentConfig
}; 