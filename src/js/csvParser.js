// CSV parser module for Family Tree Visualization
import Papa from 'papaparse';

// Debug logs flag - set to true to see debug messages
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[CSVParser] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

// CSV field definitions
const REQUIRED_FIELDS = [
    'id',
    'name',
    'gender'
];

const OPTIONAL_FIELDS = [
    'spouse_name',
    'father_name',
    'mother_name',
    'birth_date',
    'death_date',
    'native_place',
    'father_id',
    'mother_id',
    'spouse_id'
];

// Parse CSV data into structured format
export function parseCSV(csvData) {
    debugLog('Starting CSV parsing');
    
    try {
        // Determine if csvData is a File object or a string
        let isFile = csvData instanceof File;
        debugLog(`Input is ${isFile ? 'a File object' : 'a string'}`);
        
        if (isFile) {
            // Handle File object
            return parseCSVFile(csvData);
        } else {
            // Handle string data
            return parseCSVString(csvData);
        }
    } catch (error) {
        debugLog('Error in parseCSV', error);
        throw error;
    }
}

// Parse CSV from a File object
function parseCSVFile(file) {
    debugLog(`Parsing CSV file: ${file.name}`);
    
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            trimHeaders: true,
            transform: (value) => value.trim(),
            complete: function(results) {
                try {
                    debugLog(`Papa parse complete with ${results.data.length} rows`);
                    
                    // Check for parsing errors
                    if (results.errors && results.errors.length > 0) {
                        // Log the errors
                        debugLog('CSV parsing errors found', results.errors);
                        
                        // Check if errors are critical
                        const criticalErrors = results.errors.filter(e => e.type !== 'FieldMismatch');
                        if (criticalErrors.length > 0) {
                            reject(new Error(`CSV parsing error: ${criticalErrors[0].message}`));
                            return;
                        }
                        
                        // If only FieldMismatch errors, we can proceed with warning
                        debugLog('Non-critical parsing errors found, proceeding with data');
                    }
                    
                    // Validate required fields
                    validateCSVFields(results.meta.fields);
                    
                    // Process and validate the data
                    const processedData = processCSVData(results.data);
                    
                    debugLog(`Successfully parsed ${processedData.length} rows from CSV`);
                    
                    resolve(processedData);
                } catch (error) {
                    debugLog('Error during CSV parsing', error);
                    reject(error);
                }
            },
            error: function(error) {
                debugLog('Error during CSV parsing', error);
                reject(error);
            }
        });
    });
}

// Parse CSV from a string
function parseCSVString(csvString) {
    debugLog('Parsing CSV from string');
    
    try {
        const result = Papa.parse(csvString, {
            header: true,
            skipEmptyLines: true,
            trimHeaders: true,
            transform: (value) => value.trim()
        });
        
        if (result.errors && result.errors.length > 0) {
            debugLog('CSV parsing errors found', result.errors);
            const criticalErrors = result.errors.filter(e => e.type !== 'FieldMismatch');
            if (criticalErrors.length > 0) {
                throw new Error(`CSV parsing error: ${criticalErrors[0].message}`);
            }
        }
        
        // Validate required fields
        validateCSVFields(result.meta.fields);
        
        // Process data
        const processedData = processCSVData(result.data);
        debugLog(`Successfully parsed ${processedData.length} rows from CSV string`);
        
        return processedData;
    } catch (error) {
        debugLog('Error parsing CSV string', error);
        throw error;
    }
}

// Validate that CSV has required fields
function validateCSVFields(fields) {
    debugLog('Validating CSV fields', fields);
    
    const requiredFields = ['id', 'name', 'gender'];
    const missingFields = requiredFields.filter(field => !fields.includes(field));
    
    if (missingFields.length > 0) {
        throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }
    
    debugLog('All required fields present');
}

// Process CSV data after parsing
function processCSVData(data) {
    debugLog(`Processing ${data.length} rows of CSV data`);
    
    const processedData = data.map(row => {
        try {
            return {
                id: row.id,
                name: row.name.trim(),
                gender: row.gender.trim(),
                spouse_name: row.spouse_name ? row.spouse_name.trim() : null,
                father_name: row.father_name ? row.father_name.trim() : null,
                mother_name: row.mother_name ? row.mother_name.trim() : null,
                birth_date: row.birth_date ? row.birth_date.trim() : null,
                death_date: row.death_date ? row.death_date.trim() : null,
                native_place: row.native_place ? row.native_place.trim() : null,
                father_id: row.father_id ? row.father_id.trim() : null,
                mother_id: row.mother_id ? row.mother_id.trim() : null,
                spouse_id: row.spouse_id ? row.spouse_id.trim() : null
            };
        } catch (error) {
            debugLog('Error processing row', { row, error });
            throw new Error(`Error processing row with ID ${row.id || 'unknown'}: ${error.message}`);
        }
    });
    
    debugLog(`Successfully processed ${processedData.length} rows`);
    return processedData;
}

// Detect language from text (simplified version)
export function detectLanguage(text) {
    if (!text) return 'en';
    
    // Check for Tamil characters (basic check)
    const tamilPattern = /[\u0B80-\u0BFF]/;
    if (tamilPattern.test(text)) {
        return 'ta';
    }
    
    // Default to English
    return 'en';
}

// Format date according to locale
export function formatDate(date, locale = 'en') {
    if (!date) return '';
    
    if (typeof date === 'string') {
        return date;
    }
    
    try {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(locale === 'ta' ? 'ta-IN' : locale, options);
    } catch (e) {
        console.warn('Date formatting error:', e);
        return date.toISOString().split('T')[0];
    }
}

// Calculate age based on birth and death dates
export function calculateAge(birthDate, deathDate = null) {
    if (!birthDate) return null;
    
    if (typeof birthDate === 'string') {
        return null; // Can't calculate with string dates
    }
    
    const endDate = deathDate || new Date();
    
    let age = endDate.getFullYear() - birthDate.getFullYear();
    
    // Adjust age if birthday hasn't occurred yet this year
    const m = endDate.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && endDate.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}

export default {
    parseCSV,
    detectLanguage,
    formatDate,
    calculateAge
}; 