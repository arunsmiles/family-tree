// Family Tree Builder module
import { detectLanguage } from './csvParser.js';

// Debug logs flag - set to true to see debug messages
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[FamilyTreeBuilder] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

/**
 * Build a family tree data structure from parsed CSV data
 * @param {Array} csvData - Array of individual records from CSV
 * @param {String} rootPersonId - ID of the person to use as the root
 * @returns {Object} Family tree data structure
 */
export function buildFamilyTree(csvData, rootPersonId = null) {
    debugLog('Starting family tree construction', { rootPersonId });
    
    if (!csvData || csvData.length === 0) {
        throw new Error('No data provided for building family tree');
    }
    
    // Step 1: Create a map of all individuals by ID
    debugLog('Creating individuals map');
    let individualsMap = new Map();
    
    csvData.forEach(individual => {
        // Create a deep copy to avoid modifying the original data
        const individualCopy = JSON.parse(JSON.stringify(individual));
        
        // Initialize relationships
        individualCopy.parents = [];
        individualCopy.children = [];
        individualCopy.spouses = [];
        
        // Normalize gender
        individualCopy.gender = normalizeGender(individualCopy.gender);
        
        // Add to map
        individualsMap.set(individualCopy.id, individualCopy);
    });
    
    debugLog(`Created individuals map with ${individualsMap.size} individuals`);
    
    // Step 2: Build relationships
    debugLog('Building relationships');
    csvData.forEach(individual => {
        // Skip if the individual isn't in our map
        if (!individualsMap.has(individual.id)) {
            return;
        }
        
        const currentPerson = individualsMap.get(individual.id);
        
        // Add parent relationships
        if (individual.father_id && individualsMap.has(individual.father_id)) {
            // Add father to current person's parents
            currentPerson.parents.push(individual.father_id);
            
            // Add current person to father's children
            const father = individualsMap.get(individual.father_id);
            if (!father.children.includes(individual.id)) {
                father.children.push(individual.id);
            }
        }
        
        if (individual.mother_id && individualsMap.has(individual.mother_id)) {
            // Add mother to current person's parents
            currentPerson.parents.push(individual.mother_id);
            
            // Add current person to mother's children
            const mother = individualsMap.get(individual.mother_id);
            if (!mother.children.includes(individual.id)) {
                mother.children.push(individual.id);
            }
        }
        
        // Add spouse relationships (if available)
        if (individual.spouse_id && individualsMap.has(individual.spouse_id)) {
            // Add spouse to current person's spouses
            if (!currentPerson.spouses.includes(individual.spouse_id)) {
                currentPerson.spouses.push(individual.spouse_id);
            }
            
            // Add current person to spouse's spouses
            const spouse = individualsMap.get(individual.spouse_id);
            if (!spouse.spouses.includes(individual.id)) {
                spouse.spouses.push(individual.id);
            }
        }
    });
    
    // Find the root person or select the first individual if not specified
    if (!rootPersonId || !individualsMap.has(rootPersonId)) {
        debugLog('No valid root person ID provided, using default selection');
        // If no valid root ID is provided, find a person without parents or use the first person
        const peopleWithoutParents = Array.from(individualsMap.values())
            .filter(person => person.parents.length === 0);
        
        if (peopleWithoutParents.length > 0) {
            rootPersonId = peopleWithoutParents[0].id;
            debugLog(`Selected person without parents as root: ${rootPersonId}`);
        } else {
            rootPersonId = csvData[0].id;
            debugLog(`Selected first person as root: ${rootPersonId}`);
        }
    }
    
    // If we're only showing direct family of the root person,
    // filter the map to include only the root, their children, and related individuals
    if (rootPersonId) {
        debugLog(`Filtering family tree for root person: ${rootPersonId}`);
        
        // Get the root person
        const rootPerson = individualsMap.get(rootPersonId);
        
        if (!rootPerson) {
            throw new Error(`Root person with ID ${rootPersonId} not found in data`);
        }
        
        // Create a new map with only relevant individuals
        const filteredMap = new Map();
        const processedIds = new Set();
        
        // Function to recursively add a person and all their descendants to the filtered map
        function addPersonAndDescendants(personId) {
            // Skip if already processed to avoid infinite recursion
            if (processedIds.has(personId)) return;
            processedIds.add(personId);
            
            // Add the person
            const person = individualsMap.get(personId);
            if (!person) return;
            
            filteredMap.set(personId, person);
            
            // Add all spouses
            person.spouses.forEach(spouseId => {
                if (individualsMap.has(spouseId) && !processedIds.has(spouseId)) {
                    filteredMap.set(spouseId, individualsMap.get(spouseId));
                    processedIds.add(spouseId);
                }
            });
            
            // Recursively add all children and their descendants
            person.children.forEach(childId => {
                addPersonAndDescendants(childId);
            });
        }
        
        // Start with the root person
        addPersonAndDescendants(rootPersonId);
        
        // Use the filtered map instead of the full map
        individualsMap = filteredMap;
        debugLog(`Filtered family tree to ${individualsMap.size} individuals`);
    }
    
    // Step 3: Calculate generations using new rules
    debugLog('Calculating generations using new rules');
    
    // Initialize all generations to null
    individualsMap.forEach(person => {
        person.generation = null;
    });
    
    // First pass: Assign generation 0 to all people with no parents and no spouses
    debugLog('First pass: assigning gen 0 to people with no parents and no spouses');
    individualsMap.forEach(person => {
        if (person.parents.length === 0 && person.spouses.length === 0) {
            person.generation = 0;
            debugLog(`Assigned gen 0 to person ${person.id} (no parents, no spouse)`);
        }
    });
    
    // Multiple passes to handle dependencies
    let changed = true;
    let iterations = 0;
    const MAX_ITERATIONS = 10; // Prevent infinite loops
    
    while (changed && iterations < MAX_ITERATIONS) {
        changed = false;
        iterations++;
        debugLog(`Generation calculation pass #${iterations}`);
        
        // Second pass: Assign generations to people with parents
        individualsMap.forEach(person => {
            // Skip if already assigned
            if (person.generation !== null) return;
            
            // Rule: If a person has parents, their gen = father's gen + 1
            if (person.parents.length > 0) {
                // Try to find father or mother with known generation
                let parentWithGen = null;
                
                for (const parentId of person.parents) {
                    const parent = individualsMap.get(parentId);
                    if (parent && parent.gender === 'male' && parent.generation !== null) {
                        // Found father with known generation
                        person.generation = parent.generation + 1;
                        changed = true;
                        debugLog(`Assigned gen ${person.generation} to person ${person.id} (father's gen + 1)`);
                        break;
                    } else if (parent && parent.gender === 'female' && parent.generation !== null && !parentWithGen) {
                        // Found mother with known generation, but keep looking for father
                        parentWithGen = parent;
                    }
                }
                
                // If no father found but mother found, use mother's generation
                if (person.generation === null && parentWithGen) {
                    person.generation = parentWithGen.generation + 1;
                    changed = true;
                    debugLog(`Assigned gen ${person.generation} to person ${person.id} (mother's gen + 1)`);
                }
            }
        });
        
        // Third pass: Assign generations to people with no parents but with spouses
        individualsMap.forEach(person => {
            // Skip if already assigned
            if (person.generation !== null) return;
            
            // Rule: If no parents but has spouse, gen = spouse's gen
            if (person.parents.length === 0 && person.spouses.length > 0) {
                // Look for a spouse with known generation
                for (const spouseId of person.spouses) {
                    const spouse = individualsMap.get(spouseId);
                    if (spouse && spouse.generation !== null) {
                        person.generation = spouse.generation;
                        changed = true;
                        debugLog(`Assigned gen ${person.generation} to person ${person.id} (same as spouse)`);
                        break;
                    }
                }
            }
        });
        
        // If we've done multiple passes and still have unassigned generations,
        // we might have cycles or incomplete data
        if (iterations === MAX_ITERATIONS - 1) {
            debugLog('Maximum iteration count reached, assigning default generation 0 to remaining individuals');
            individualsMap.forEach(person => {
                if (person.generation === null) {
                    person.generation = 0;
                    debugLog(`Assigned default gen 0 to person ${person.id} (couldn't determine otherwise)`);
                }
            });
        }
    }
    
    debugLog(`Generation calculation completed in ${iterations} iterations`);
    
    // Step 4: Calculate child orders (birth order)
    debugLog('Calculating child orders');
    // Get all families (parent pairs)
    const families = new Map();
    
    // Create a map to track original order in CSV file
    const orderMap = new Map();
    csvData.forEach((person, index) => {
        orderMap.set(person.id, index);
    });
    
    individualsMap.forEach(person => {
        // Skip if person has no parents
        if (person.parents.length === 0) return;
        
        // Sort parents to create a consistent family key
        const familyKey = [...person.parents].sort().join(':');
        
        // Add to family group
        if (!families.has(familyKey)) {
            families.set(familyKey, []);
        }
        families.get(familyKey).push(person);
    });
    
    // Sort children in each family by birth date (nulls first) and assign order
    families.forEach(children => {
        // Sort children by birth date with nulls first, then by original CSV order
        children.sort((a, b) => {
            // If both have no birth date, sort by original order in CSV
            if (!a.birth_date && !b.birth_date) {
                return orderMap.get(a.id) - orderMap.get(b.id);
            }
            
            // Nulls first: if a has no birth date, it comes first
            if (!a.birth_date) return -1;
            if (!b.birth_date) return 1;
            
            // Parse dates (assuming format is YYYY-MM-DD or similar)
            const dateA = new Date(a.birth_date);
            const dateB = new Date(b.birth_date);
            
            // If dates are equal, use original CSV order
            if (dateA.getTime() === dateB.getTime()) {
                return orderMap.get(a.id) - orderMap.get(b.id);
            }
            
            return dateA - dateB;
        });
        
        // Assign birth order
        children.forEach((child, index) => {
            child.birthOrder = index + 1;
            child.totalSiblings = children.length;
        });
    });
    
    // Count some statistics for debugging
    let countWithParents = 0;
    let countWithChildren = 0;
    let countWithSpouses = 0;
    
    individualsMap.forEach(person => {
        if (person.parents.length > 0) countWithParents++;
        if (person.children.length > 0) countWithChildren++;
        if (person.spouses.length > 0) countWithSpouses++;
    });
    
    debugLog('Family tree statistics', {
        individuals: individualsMap.size,
        withParents: countWithParents,
        withChildren: countWithChildren,
        withSpouses: countWithSpouses
    });
    
    // Find minimum and maximum generation
    let minGeneration = Infinity;
    let maxGeneration = -Infinity;
    
    individualsMap.forEach(person => {
        if (person.generation !== undefined) {
            minGeneration = Math.min(minGeneration, person.generation);
            maxGeneration = Math.max(maxGeneration, person.generation);
        }
    });
    
    const generations = maxGeneration - minGeneration + 1;
    debugLog(`Found ${generations} generations (min: ${minGeneration}, max: ${maxGeneration})`);
    
    // Return the family tree data structure
    return {
        individuals: Array.from(individualsMap.values()),
        rootPersonId: rootPersonId,
        generations: generations,
        minGeneration: minGeneration,
        maxGeneration: maxGeneration
    };
}

// Create a map of individuals from CSV data
function createIndividualsMap(csvData) {
    const individualsMap = {};
    
    csvData.forEach(record => {
        // Basic individual information
        const individual = {
            id: record.id,
            name: record.name,
            gender: normalizeGender(record.gender),
            spouseName: record.spouse_name || null,
            fatherName: record.father_name || null,
            motherName: record.mother_name || null,
            birthDate: record.birth_date,
            deathDate: record.death_date,
            nativePlace: record.native_place || null,
            
            // IDs for relationships
            fatherId: record.father_id || null,
            motherId: record.mother_id || null,
            spouseId: record.spouse_id || null,
            
            // Relationship collections
            parents: [],
            children: [],
            spouses: [],
            
            // For tree building
            generation: null,
            language: detectLanguage(record.name),
            hasSpouse: !!record.spouse_name || !!record.spouse_id
        };
        
        individualsMap[record.id] = individual;
    });
    
    return individualsMap;
}

// Normalize gender values
function normalizeGender(gender) {
    if (!gender) return 'unknown';
    
    const normalizedGender = gender.toString().trim().toLowerCase();
    
    if (normalizedGender === 'm' || normalizedGender === 'male' || normalizedGender === 'ம' || normalizedGender === 'ஆண்') {
        return 'male';
    } else if (normalizedGender === 'f' || normalizedGender === 'female' || normalizedGender === 'பெ' || normalizedGender === 'பெண்') {
        return 'female';
    } else {
        return 'unknown';
    }
}

// Build relationships between individuals
function buildRelationships(individualsMap) {
    // Process parent-child relationships
    Object.values(individualsMap).forEach(individual => {
        // Add parent-child relationships by ID
        addParentChildRelationshipById(individualsMap, individual, 'father');
        addParentChildRelationshipById(individualsMap, individual, 'mother');
        
        // Add spouse relationships by ID
        addSpouseRelationshipById(individualsMap, individual);
    });
    
    // After ID-based relationships are established,
    // try to resolve relationships by name if IDs aren't available
    Object.values(individualsMap).forEach(individual => {
        // Add parent-child relationships by name
        addParentChildRelationshipByName(individualsMap, individual, 'father');
        addParentChildRelationshipByName(individualsMap, individual, 'mother');
        
        // Add spouse relationships by name
        addSpouseRelationshipByName(individualsMap, individual);
    });
}

// Add parent-child relationship by ID
function addParentChildRelationshipById(individualsMap, individual, parentType) {
    const parentIdKey = parentType + 'Id';
    const parentId = individual[parentIdKey];
    
    if (parentId && individualsMap[parentId]) {
        const parent = individualsMap[parentId];
        
        // Add parent to individual's parents
        if (!individual.parents.includes(parent)) {
            individual.parents.push(parent);
        }
        
        // Add individual to parent's children
        if (!parent.children.includes(individual)) {
            parent.children.push(individual);
        }
    }
}

// Add parent-child relationship by name
function addParentChildRelationshipByName(individualsMap, individual, parentType) {
    // Skip if relationship already established by ID
    if (individual.parents.length > 0) return;
    
    const parentNameKey = parentType + 'Name';
    const parentName = individual[parentNameKey];
    
    if (parentName) {
        // Find parent by name (might be ambiguous, just take first match)
        const parent = Object.values(individualsMap).find(p => 
            p.name.toLowerCase() === parentName.toLowerCase() && 
            (parentType === 'father' ? p.gender === 'male' : p.gender === 'female')
        );
        
        if (parent) {
            // Add parent to individual's parents
            if (!individual.parents.includes(parent)) {
                individual.parents.push(parent);
            }
            
            // Add individual to parent's children
            if (!parent.children.includes(individual)) {
                parent.children.push(individual);
            }
        }
    }
}

// Add spouse relationship by ID
function addSpouseRelationshipById(individualsMap, individual) {
    const spouseId = individual.spouseId;
    
    if (spouseId && individualsMap[spouseId]) {
        const spouse = individualsMap[spouseId];
        
        // Add spouse to individual's spouses
        if (!individual.spouses.includes(spouse)) {
            individual.spouses.push(spouse);
        }
        
        // Add individual to spouse's spouses
        if (!spouse.spouses.includes(individual)) {
            spouse.spouses.push(individual);
        }
    }
}

// Add spouse relationship by name
function addSpouseRelationshipByName(individualsMap, individual) {
    // Skip if relationship already established by ID
    if (individual.spouses.length > 0) return;
    
    const spouseName = individual.spouseName;
    
    if (spouseName) {
        // Find spouse by name (might be ambiguous, just take first match)
        const spouse = Object.values(individualsMap).find(p => 
            p.name.toLowerCase() === spouseName.toLowerCase() && 
            p.gender !== individual.gender
        );
        
        if (spouse) {
            // Add spouse to individual's spouses
            if (!individual.spouses.includes(spouse)) {
                individual.spouses.push(spouse);
            }
            
            // Add individual to spouse's spouses
            if (!spouse.spouses.includes(individual)) {
                spouse.spouses.push(individual);
            }
        }
    }
}

// Calculate generation levels for each individual
function calculateGenerations(individualsMap) {
    // Find individuals with no parents (root nodes)
    const rootNodes = Object.values(individualsMap).filter(individual => 
        individual.parents.length === 0
    );
    
    // If no root nodes, try to find oldest individuals
    if (rootNodes.length === 0) {
        // Just assign generation 0 to all
        Object.values(individualsMap).forEach(individual => {
            individual.generation = 0;
        });
        
        return;
    }
    
    // Set generation 0 for root nodes
    rootNodes.forEach(individual => {
        individual.generation = 0;
    });
    
    // Process generations starting from root nodes
    let hasChanges = true;
    let maxIterations = 100; // Safety limit
    
    while (hasChanges && maxIterations > 0) {
        hasChanges = false;
        maxIterations--;
        
        Object.values(individualsMap).forEach(individual => {
            // Skip individuals with already assigned generations
            if (individual.generation !== null) {
                // Calculate children's generation
                individual.children.forEach(child => {
                    const newGeneration = individual.generation + 1;
                    
                    if (child.generation === null || child.generation < newGeneration) {
                        child.generation = newGeneration;
                        hasChanges = true;
                    }
                });
                
                // Ensure spouses are at the same generation
                individual.spouses.forEach(spouse => {
                    if (spouse.generation === null) {
                        spouse.generation = individual.generation;
                        hasChanges = true;
                    } else if (spouse.generation !== individual.generation) {
                        // Adjust generations for consistency if they differ
                        const maxGen = Math.max(spouse.generation, individual.generation);
                        spouse.generation = maxGen;
                        individual.generation = maxGen;
                        hasChanges = true;
                    }
                });
            }
        });
    }
    
    // Handle any missed individuals (assign them to generation 0)
    Object.values(individualsMap).forEach(individual => {
        if (individual.generation === null) {
            individual.generation = 0;
        }
    });
}

// Find the maximum generation in the tree
function findMaxGeneration(individualsMap) {
    let maxGeneration = 0;
    
    Object.values(individualsMap).forEach(individual => {
        if (individual.generation > maxGeneration) {
            maxGeneration = individual.generation;
        }
    });
    
    return maxGeneration;
}

export default {
    buildFamilyTree
}; 