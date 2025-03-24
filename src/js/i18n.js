// Internationalization module for the Family Tree Visualization application
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Debug logger
const DEBUG = true;
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[i18n] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

// Translations
const resources = {
    en: {
        translation: {
            // Application title and headers
            appTitle: "Family Tree Visualization",
            inputTitle: "Input Data",
            configTitle: "Configuration",
            layoutTitle: "Layout Options",
            visualTitle: "Visual Options",
            exportTitle: "Export Options",
            visTitle: "Family Tree Visualization",
            
            // Input section
            fileLabel: "Choose CSV File:",
            loadSample: "Load Sample Data",
            
            // Configuration - Layout
            orientation: "Orientation:",
            topDown: "Top Down",
            bottomUp: "Bottom Up",
            leftRight: "Left to Right",
            rightLeft: "Right to Left",
            nodeSize: "Node Size:",
            nodeSpacing: "Node Spacing:",
            
            // Configuration - Visual
            colorScheme: "Color Scheme:",
            default: "Default",
            genderBased: "Gender-Based",
            generationBased: "Generation-Based",
            custom: "Custom",
            fontSize: "Font Size:",
            lineStyle: "Line Style:",
            straight: "Straight",
            curved: "Curved",
            angled: "Angled",
            
            // Configuration - Export
            svgWidth: "SVG Width (pixels):",
            svgHeight: "SVG Height (pixels):",
            
            // Controls
            generateTree: "Generate Tree",
            exportSVG: "Export SVG",
            resetView: "Reset View",
            
            // Languages
            language: "Language:",
            
            // Node information
            born: "Born:",
            died: "Died:",
            age: "Age:",
            nativePlace: "Native Place:",
            spouse: "Spouse:",
            father: "Father:",
            mother: "Mother:",
            
            // Relationship terminology
            son: "Son",
            daughter: "Daughter",
            husband: "Husband",
            wife: "Wife",
            
            // Alerts and messages
            uploadFirst: "Please upload a CSV file or load sample data first.",
            generateFirst: "Please generate a family tree first.",
            parseError: "Error parsing CSV file:",
            generateError: "Error generating family tree:",
            exportError: "Error exporting SVG:",
            
            // Footer
            footerText: "Family Tree Visualization Tool - Multilingual Support"
        }
    },
    ta: {
        translation: {
            // Application title and headers
            appTitle: "குடும்ப மர காட்சிப்படுத்தல்",
            inputTitle: "உள்ளீட்டு தரவு",
            configTitle: "கட்டமைப்பு",
            layoutTitle: "அமைப்பு விருப்பங்கள்",
            visualTitle: "காட்சி விருப்பங்கள்",
            exportTitle: "ஏற்றுமதி விருப்பங்கள்",
            visTitle: "குடும்ப மர காட்சி",
            
            // Input section
            fileLabel: "CSV கோப்பைத் தேர்ந்தெடுக்கவும்:",
            loadSample: "மாதிரி தரவை ஏற்றவும்",
            
            // Configuration - Layout
            orientation: "அமைப்பு:",
            topDown: "மேலிருந்து கீழ்",
            bottomUp: "கீழிருந்து மேல்",
            leftRight: "இடமிருந்து வலம்",
            rightLeft: "வலமிருந்து இடம்",
            nodeSize: "முனை அளவு:",
            nodeSpacing: "முனை இடைவெளி:",
            
            // Configuration - Visual
            colorScheme: "வண்ண திட்டம்:",
            default: "இயல்புநிலை",
            genderBased: "பாலின அடிப்படையில்",
            generationBased: "தலைமுறை அடிப்படையில்",
            custom: "தனிப்பயன்",
            fontSize: "எழுத்து அளவு:",
            lineStyle: "கோட்டு பாணி:",
            straight: "நேரான",
            curved: "வளைந்த",
            angled: "கோணமான",
            
            // Configuration - Export
            svgWidth: "SVG அகலம் (பிக்சல்கள்):",
            svgHeight: "SVG உயரம் (பிக்சல்கள்):",
            
            // Controls
            generateTree: "மரத்தை உருவாக்கு",
            exportSVG: "SVG ஏற்றுமதி",
            resetView: "காட்சியை மீட்டமை",
            
            // Languages
            language: "மொழி:",
            
            // Node information
            born: "பிறந்த தேதி:",
            died: "இறந்த தேதி:",
            age: "வயது:",
            nativePlace: "சொந்த ஊர்:",
            spouse: "துணைவர்:",
            father: "தந்தை:",
            mother: "தாய்:",
            
            // Relationship terminology
            son: "மகன்",
            daughter: "மகள்",
            husband: "கணவர்",
            wife: "மனைவி",
            
            // Alerts and messages
            uploadFirst: "முதலில் CSV கோப்பை பதிவேற்றவும் அல்லது மாதிரி தரவை ஏற்றவும்.",
            generateFirst: "முதலில் குடும்ப மரத்தை உருவாக்கவும்.",
            parseError: "CSV கோப்பை பகுப்பாய்வதில் பிழை:",
            generateError: "குடும்ப மரத்தை உருவாக்குவதில் பிழை:",
            exportError: "SVG ஏற்றுமதியில் பிழை:",
            
            // Footer
            footerText: "குடும்ப மர காட்சிப்படுத்தல் கருவி - பல மொழி ஆதரவு"
        }
    }
};

// Initialize i18next
export async function initI18n() {
    debugLog('Initializing i18next');
    
    try {
        await i18next
            .use(LanguageDetector)
            .init({
                resources,
                fallbackLng: 'en',
                debug: false,
                interpolation: {
                    escapeValue: false // not needed for HTML
                }
            });
        
        debugLog('i18next initialized successfully');
        return i18next;
    } catch (error) {
        debugLog('Error initializing i18next', error);
        console.error('Error initializing i18next:', error);
        
        // Provide a fallback implementation to prevent app from crashing
        return {
            t: (key, options = {}) => {
                // Simple fallback to get from resources directly
                const lang = options.lng || 'en';
                try {
                    return resources[lang]?.translation[key] || resources.en.translation[key] || key;
                } catch (e) {
                    return key;
                }
            },
            language: 'en',
            changeLanguage: (lang) => { /* no-op */ }
        };
    }
}

// Translate all elements with translation keys
export function translate() {
    debugLog('Translating UI elements');
    
    // Helper function to safely update element text
    const safelySetText = (elementId, translationKey) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = i18next.t(translationKey);
        } else {
            debugLog(`Element with ID '${elementId}' not found for translation key '${translationKey}'`);
        }
    };
    
    // Helper function to safely update label text
    const safelySetLabelText = (forAttribute, translationKey) => {
        const label = document.querySelector(`label[for="${forAttribute}"]`);
        if (label) {
            label.textContent = i18next.t(translationKey);
        } else {
            debugLog(`Label for '${forAttribute}' not found for translation key '${translationKey}'`);
        }
    };
    
    // Helper function to safely update select options
    const safelySetSelectOptions = (selectId, optionIndices, translationKeys) => {
        const select = document.getElementById(selectId);
        if (!select) {
            debugLog(`Select with ID '${selectId}' not found`);
            return;
        }
        
        optionIndices.forEach((index, i) => {
            if (select.options[index]) {
                select.options[index].textContent = i18next.t(translationKeys[i]);
            } else {
                debugLog(`Option at index ${index} not found in select '${selectId}'`);
            }
        });
    };
    
    try {
        // App title and section titles
        safelySetText('app-title', 'appTitle');
        safelySetText('input-title', 'inputTitle');
        safelySetText('config-title', 'configTitle');
        safelySetText('layout-title', 'layoutTitle');
        safelySetText('visual-title', 'visualTitle');
        safelySetText('export-title', 'exportTitle');
        safelySetText('vis-title', 'visTitle');
        safelySetText('root-person-label', 'rootPersonLabel');
        
        // Labels
        safelySetLabelText('language-select', 'language');
        safelySetLabelText('csv-file', 'fileLabel');
        safelySetLabelText('root-person', 'rootPersonLabel');
        
        // Buttons
        safelySetText('load-sample', 'loadSample');
        safelySetText('generate-tree', 'generateTree');
        safelySetText('export-svg', 'exportSVG');
        safelySetText('reset-view', 'resetView');
        
        // Configuration options
        safelySetLabelText('orientation', 'orientation');
        safelySetLabelText('node-size', 'nodeSize');
        safelySetLabelText('node-spacing', 'nodeSpacing');
        safelySetLabelText('color-scheme', 'colorScheme');
        safelySetLabelText('font-size', 'fontSize');
        safelySetLabelText('line-style', 'lineStyle');
        safelySetLabelText('svg-width', 'svgWidth');
        safelySetLabelText('svg-height', 'svgHeight');
        
        // Orientation options
        safelySetSelectOptions(
            'orientation', 
            [0, 1, 2, 3], 
            ['topDown', 'bottomUp', 'leftRight', 'rightLeft']
        );
        
        // Color scheme options
        safelySetSelectOptions(
            'color-scheme', 
            [0, 1, 2], 
            ['gender', 'generation', 'default']
        );
        
        // Line style options
        safelySetSelectOptions(
            'line-style', 
            [0, 1, 2], 
            ['straight', 'curved', 'orthogonal']
        );
        
        debugLog('Translation complete');
    } catch (error) {
        debugLog('Error during translation', error);
        console.error('Translation error:', error);
    }
}

// Shorthand for getting translations
export function t(key, options = {}) {
    try {
        return i18next.t(key, options);
    } catch (error) {
        debugLog(`Error translating key: ${key}`, error);
        return key; // Return the key itself as fallback
    }
}

// Get current language
export function getCurrentLanguage() {
    return i18next.language;
}

// Change language
export function changeLanguage(lang) {
    return i18next.changeLanguage(lang);
}

export default {
    initI18n,
    translate,
    t,
    getCurrentLanguage,
    changeLanguage
}; 