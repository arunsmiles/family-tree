// Tree Builder Module for Family Tree Visualization
import * as d3 from 'd3';

// Debug logs flag
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[TreeBuilder] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

export class TreeBuilder {
    constructor(familyTree, config) {
        this.familyTree = familyTree;
        this.config = config;
        
        // Store root person ID
        this.rootPersonId = this.config.rootPersonId || this.familyTree.rootPersonId;
        
        // Track processed couples/individuals to avoid infinite recursion
        this.processedCouples = new Set();
        
        // Track generation for each couple (for information only, not filtering)
        this.coupleGenerations = new Map();
        
        debugLog(`Initialized TreeBuilder with ${familyTree.individuals.length} individuals`);
    }
    
    /**
     * Convert family tree data to D3 hierarchy format
     * @returns {Object} - D3 hierarchy object
     */
    buildHierarchy() {
        debugLog('Converting family tree to hierarchy with root person ID:', this.rootPersonId);
        
        // Reset the processed couples set and generations map
        this.processedCouples.clear();
        this.coupleGenerations.clear();
        
        // Find the root person in the individuals array
        let rootPerson = this.familyTree.individuals.find(i => i.id === this.rootPersonId);
        
        if (!rootPerson) {
            debugLog('Root person not found, using first person in data');
            rootPerson = this.familyTree.individuals[0];
        }
        
        // Create a root node
        const root = {
            id: 'family-root',
            name: 'Family Root',
            children: []
        };
        
        // Create family units for root person - one for each spouse
        if (rootPerson.spouses && rootPerson.spouses.length > 0) {
            // Create one node for each spouse
            rootPerson.spouses.forEach(spouseId => {
                const spouse = this.familyTree.individuals.find(i => i.id === spouseId);
                if (spouse) {
                    // Create a unique ID for this couple
                    const ids = [rootPerson.id, spouse.id].sort();
                    const coupleId = `couple-${ids[0]}-${ids[1]}`;
                    
                    // Store generation 0 for this couple (for info only)
                    this.coupleGenerations.set(coupleId, 0);
                    
                    const familyUnit = this.createFamilyUnit(rootPerson, spouse);
                    root.children.push(familyUnit);
                    
                    // Process children from this marriage
                    if (this.config.showOnlyDirectFamily) {
                        this.processDirectChildrenForMarriage(familyUnit, rootPerson, spouse, 1);
                    } else {
                        this.processDescendantsForMarriage(familyUnit, rootPerson, spouse, new Set([rootPerson.id, spouse.id]), 1);
                    }
                }
            });
        }
        
        // If no spouses, create a unit for just the root person
        if (root.children.length === 0) {
            const singleId = `single-${rootPerson.id}`;
            
            // Store generation 0 for this individual (for info only)
            this.coupleGenerations.set(singleId, 0);
            
            const singleUnit = this.createFamilyUnit(rootPerson, null);
            root.children.push(singleUnit);
            
            // Process children (for single parent)
            if (this.config.showOnlyDirectFamily) {
                this.processDirectChildren(singleUnit, rootPerson, 1);
            } else {
                this.processDescendants(singleUnit, rootPerson, new Set([rootPerson.id]), 1);
            }
        }
        
        debugLog('Hierarchy built with structure', { 
            rootId: root.id, 
            childrenCount: root.children.length
        });
        
        return d3.hierarchy(root);
    }
    
    /**
     * Process direct children for a specific marriage
     * @param {Object} parentUnit - Parent family unit
     * @param {Object} person - Person data
     * @param {Object} spouse - Spouse data
     * @param {Number} generation - Current generation level
     */
    processDirectChildrenForMarriage(parentUnit, person, spouse, generation) {
        debugLog(`Processing direct children for marriage of ${person.id} and ${spouse ? spouse.id : 'null'} at generation ${generation}`);
        
        // Get direct children
        const fatherId = parentUnit.coupleInfo.fatherId;
        const motherId = parentUnit.coupleInfo.motherId;
        
        // Find children that belong to this marriage
        const childrenOfMarriage = this.familyTree.individuals.filter(individual => {
            // Match children where both parents match
            const hasMatchingFather = !fatherId || individual.parents.includes(fatherId);
            const hasMatchingMother = !motherId || individual.parents.includes(motherId);
            
            return hasMatchingFather && hasMatchingMother && individual.id !== person.id && individual.id !== (spouse ? spouse.id : null);
        });
        
        // Sort children by birth order if available
        const sortedChildren = [...childrenOfMarriage].sort((a, b) => {
            if (a.birthOrder && b.birthOrder) {
                return a.birthOrder - b.birthOrder;
            }
            return 0;
        });
        
        // Process each child
        sortedChildren.forEach(child => {
            debugLog(`Processing child ${child.id} of marriage ${parentUnit.id}`);
            
            // If child has multiple spouses, create a node for each spouse
            if (child.spouses && child.spouses.length > 0) {
                child.spouses.forEach(spouseId => {
                    const childSpouse = this.familyTree.individuals.find(i => i.id === spouseId);
                    if (childSpouse) {
                        // Create a unique ID for this couple
                        const ids = [child.id, childSpouse.id].sort();
                        const coupleId = `couple-${ids[0]}-${ids[1]}`;
                        
                        // Store generation info (for information only)
                        this.coupleGenerations.set(coupleId, generation);
                        
                        const childUnit = this.createFamilyUnit(child, childSpouse);
                        parentUnit.children.push(childUnit);
                        
                        // Process grandchildren from this marriage
                        this.processDirectChildrenForMarriage(childUnit, child, childSpouse, generation + 1);
                    }
                });
            } else {
                // Single child
                const singleId = `single-${child.id}`;
                
                // Store generation info (for information only)
                this.coupleGenerations.set(singleId, generation);
                
                const childUnit = this.createFamilyUnit(child, null);
                parentUnit.children.push(childUnit);
                
                // Process grandchildren
                this.processDirectChildren(childUnit, child, generation + 1);
            }
        });
    }
    
    /**
     * Process direct children for a single person (without specific spouse)
     * @param {Object} parentUnit - Parent family unit
     * @param {Object} person - Person data
     * @param {Number} generation - Current generation level
     */
    processDirectChildren(parentUnit, person, generation) {
        debugLog(`Processing direct children for single person ${person.id} at generation ${generation}`);
        
        // Get direct children that do not belong to any specific marriage
        const childrenOfPerson = this.familyTree.individuals.filter(individual => {
            return individual.parents.includes(person.id) && individual.id !== person.id;
        });
        
        // Sort children by birth order if available
        const sortedChildren = [...childrenOfPerson].sort((a, b) => {
            if (a.birthOrder && b.birthOrder) {
                return a.birthOrder - b.birthOrder;
            }
            return 0;
        });
        
        // Process each child
        sortedChildren.forEach(child => {
            debugLog(`Processing child ${child.id} of single parent ${person.id}`);
            
            // If child has multiple spouses, create a node for each spouse
            if (child.spouses && child.spouses.length > 0) {
                child.spouses.forEach(spouseId => {
                    const childSpouse = this.familyTree.individuals.find(i => i.id === spouseId);
                    if (childSpouse) {
                        // Create a unique ID for this couple
                        const ids = [child.id, childSpouse.id].sort();
                        const coupleId = `couple-${ids[0]}-${ids[1]}`;
                        
                        // Store generation info (for information only)
                        this.coupleGenerations.set(coupleId, generation);
                        
                        const childUnit = this.createFamilyUnit(child, childSpouse);
                        parentUnit.children.push(childUnit);
                        
                        // Process grandchildren from this marriage
                        this.processDirectChildrenForMarriage(childUnit, child, childSpouse, generation + 1);
                    }
                });
            } else {
                // Single child
                const singleId = `single-${child.id}`;
                
                // Store generation info (for information only)
                this.coupleGenerations.set(singleId, generation);
                
                const childUnit = this.createFamilyUnit(child, null);
                parentUnit.children.push(childUnit);
                
                // Process grandchildren
                this.processDirectChildren(childUnit, child, generation + 1);
            }
        });
    }
    
    /**
     * Process all descendants recursively for a specific marriage
     * @param {Object} parentUnit - Parent family unit
     * @param {Object} person - Person data
     * @param {Object} spouse - Spouse data
     * @param {Set} processedIds - Set of already processed IDs
     * @param {Number} generation - Current generation level
     */
    processDescendantsForMarriage(parentUnit, person, spouse, processedIds, generation) {
        debugLog(`Processing descendants for marriage of ${person.id} and ${spouse ? spouse.id : 'null'} at generation ${generation}`);
        
        // Get direct children of this marriage
        const fatherId = parentUnit.coupleInfo.fatherId;
        const motherId = parentUnit.coupleInfo.motherId;
        
        // Find children that belong to this marriage
        const childrenOfMarriage = this.familyTree.individuals.filter(individual => {
            // Skip if already processed (to avoid infinite recursion)
            if (processedIds.has(individual.id)) return false;
            
            // Match children where both parents match
            const hasMatchingFather = !fatherId || individual.parents.includes(fatherId);
            const hasMatchingMother = !motherId || individual.parents.includes(motherId);
            
            return hasMatchingFather && hasMatchingMother && individual.id !== person.id && individual.id !== (spouse ? spouse.id : null);
        });
        
        // Sort children by birth order if available
        const sortedChildren = [...childrenOfMarriage].sort((a, b) => {
            if (a.birthOrder && b.birthOrder) {
                return a.birthOrder - b.birthOrder;
            }
            return 0;
        });
        
        // Process each child
        sortedChildren.forEach(child => {
            // Mark as processed to avoid infinite recursion
            processedIds.add(child.id);
            
            // If child has multiple spouses, create a node for each spouse
            if (child.spouses && child.spouses.length > 0) {
                child.spouses.forEach(spouseId => {
                    const childSpouse = this.familyTree.individuals.find(i => i.id === spouseId);
                    if (childSpouse) {
                        // Create a unique ID for this couple
                        const ids = [child.id, childSpouse.id].sort();
                        const coupleId = `couple-${ids[0]}-${ids[1]}`;
                        
                        // Store generation info (for information only)
                        this.coupleGenerations.set(coupleId, generation);
                        
                        const childUnit = this.createFamilyUnit(child, childSpouse);
                        parentUnit.children.push(childUnit);
                        
                        // Process descendants from this marriage
                        const updatedProcessedIds = new Set(processedIds);
                        updatedProcessedIds.add(childSpouse.id);
                        this.processDescendantsForMarriage(childUnit, child, childSpouse, updatedProcessedIds, generation + 1);
                    }
                });
            } else {
                // Single child
                const singleId = `single-${child.id}`;
                
                // Store generation info (for information only)
                this.coupleGenerations.set(singleId, generation);
                
                const childUnit = this.createFamilyUnit(child, null);
                parentUnit.children.push(childUnit);
                
                // Process descendants
                this.processDescendants(childUnit, child, new Set(processedIds), generation + 1);
            }
        });
    }
    
    /**
     * Process all descendants recursively (for single parent)
     * @param {Object} parentUnit - Parent family unit
     * @param {Object} person - Person data
     * @param {Set} processedIds - Set of already processed IDs
     * @param {Number} generation - Current generation level
     */
    processDescendants(parentUnit, person, processedIds, generation) {
        debugLog(`Processing all descendants for person ${person.id} at generation ${generation}`);
        
        // Get all children of this person
        const childrenOfPerson = this.familyTree.individuals.filter(individual => {
            // Skip if already processed (to avoid infinite recursion)
            if (processedIds.has(individual.id)) return false;
            
            return individual.parents.includes(person.id) && individual.id !== person.id;
        });
        
        // Sort children by birth order if available
        const sortedChildren = [...childrenOfPerson].sort((a, b) => {
            if (a.birthOrder && b.birthOrder) {
                return a.birthOrder - b.birthOrder;
            }
            return 0;
        });
        
        // Process each child
        sortedChildren.forEach(child => {
            // Mark as processed to avoid infinite recursion
            processedIds.add(child.id);
            
            // If child has multiple spouses, create a node for each spouse
            if (child.spouses && child.spouses.length > 0) {
                child.spouses.forEach(spouseId => {
                    const childSpouse = this.familyTree.individuals.find(i => i.id === spouseId);
                    if (childSpouse) {
                        // Create a unique ID for this couple
                        const ids = [child.id, childSpouse.id].sort();
                        const coupleId = `couple-${ids[0]}-${ids[1]}`;
                        
                        // Store generation info (for information only)
                        this.coupleGenerations.set(coupleId, generation);
                        
                        const childUnit = this.createFamilyUnit(child, childSpouse);
                        parentUnit.children.push(childUnit);
                        
                        // Process descendants from this marriage
                        const updatedProcessedIds = new Set(processedIds);
                        updatedProcessedIds.add(childSpouse.id);
                        this.processDescendantsForMarriage(childUnit, child, childSpouse, updatedProcessedIds, generation + 1);
                    }
                });
            } else {
                // Single child
                const singleId = `single-${child.id}`;
                
                // Store generation info (for information only)
                this.coupleGenerations.set(singleId, generation);
                
                const childUnit = this.createFamilyUnit(child, null);
                parentUnit.children.push(childUnit);
                
                // Process descendants
                this.processDescendants(childUnit, child, new Set(processedIds), generation + 1);
            }
        });
    }
    
    /**
     * Create a family unit (a person with a specific spouse)
     * @param {Object} person - Person data
     * @param {Object} spouse - Spouse data (or null)
     * @returns {Object} - Family unit object
     */
    createFamilyUnit(person, spouse) {
        const spouseText = spouse ? ` with ${spouse.name}` : ` (single)`;
        debugLog(`Creating family unit for person ${person.id}${spouseText}`);
        
        // Create a unique ID for this couple
        let coupleId;
        if (spouse) {
            // Sort IDs to ensure consistency regardless of order
            const ids = [person.id, spouse.id].sort();
            coupleId = `couple-${ids[0]}-${ids[1]}`;
        } else {
            coupleId = `single-${person.id}`;
        }
        
        // Create family unit
        const familyUnit = {
            id: coupleId,
            name: spouse ? `${person.name} & ${spouse.name}` : person.name,
            person: person,
            spouse: spouse,
            children: [],
            // Store couple info for linking children correctly
            coupleInfo: {
                fatherId: person.gender === 'male' ? person.id : (spouse ? spouse.id : null),
                motherId: person.gender === 'female' ? person.id : (spouse ? spouse.id : null)
            }
        };
        
        return familyUnit;
    }
} 