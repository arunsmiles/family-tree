// Node Renderer Module for Family Tree Visualization
import * as d3 from 'd3';
import { t } from '../i18n.js';

// Debug logs flag
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[NodeRenderer] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

export class NodeRenderer {
    constructor(config) {
        this.config = config;
        
        // Node dimensions
        this.nodeWidth = 220;  // Width of node box
        this.nodeHeight = 140; // Height of node box
        
        debugLog('Initialized NodeRenderer with config', config);
    }
    
    /**
     * Create nodes for each family unit
     * @param {Selection} nodesGroup - D3 selection for the nodes group
     * @param {Array} nodes - Array of hierarchy nodes
     * @param {Boolean} isHorizontal - Whether the layout is horizontal (left-right/right-left)
     */
    createNodes(nodesGroup, nodes, isHorizontal) {
        debugLog('Creating nodes', { nodeCount: nodes.length });
        
        // Create node groups
        const nodeGroups = nodesGroup.selectAll('.node')
            .data(nodes)
            .enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', d => {
                return isHorizontal ? 
                    `translate(${d.y},${d.x})` : 
                    `translate(${d.x},${d.y})`;
            });
        
        // Create nodes for each unit
        nodeGroups.each((d, i, groups) => {
            const nodeGroup = d3.select(groups[i]);
            const familyUnit = d.data;
            
            // Skip family root node
            if (familyUnit.id === 'family-root') return;
            
            // Create box for the family unit
            this.createFamilyBox(nodeGroup, familyUnit, d);
        });
    }
    
    /**
     * Create a family box representing a person or couple
     * @param {Selection} nodeGroup - D3 selection for the node group
     * @param {Object} familyUnit - Data for the family unit
     * @param {Object} nodeData - D3 hierarchy node data with parent information
     */
    createFamilyBox(nodeGroup, familyUnit, nodeData) {
        debugLog(`Creating family box for unit ${familyUnit.id}`);
        
        // Get the main person and spouse
        let person = familyUnit.person;
        let spouse = familyUnit.spouse;
        
        if (!person) {
            debugLog(`No person found for family unit ${familyUnit.id}`);
            return;
        }
        
        // Determine husband and wife for proper display order
        let husband, wife;
        if (person.gender === 'male') {
            husband = person;
            wife = spouse;
        } else {
            husband = spouse;
            wife = person;
        }
        
        // Determine relationship class based on parent-child relationship
        // Default to traditional gender class if it's a root node (no parent)
        let relationClass = '';
        if (!nodeData.parent || nodeData.parent.data.id === 'family-root') {
            // Root node, use traditional gender-based coloring
            relationClass = (husband && !wife) ? 'male-node' : 
                           (!husband && wife) ? 'female-node' : 
                           'couple-node';
        } else {
            // Determine relationship based on the gender of the person connecting this node to its parent
            relationClass = this.determineRelationClass(nodeData, familyUnit);
        }
        
        // Create box with dimensions
        const boxWidth = this.nodeWidth;
        const boxHeight = this.nodeHeight;
        
        // Add box
        nodeGroup.append('rect')
            .attr('x', -boxWidth/2)
            .attr('y', -boxHeight/2)
            .attr('width', boxWidth)
            .attr('height', boxHeight)
            .attr('class', `node-box ${relationClass}`);
        
        // Calculate dimensions for photo and text sections
        const photoWidth = boxWidth / 4;
        const textWidth = boxWidth * 3/4;
        
        // Add photo section
        const photoGroup = nodeGroup.append('g')
            .attr('class', 'photo-section')
            .attr('transform', `translate(${-boxWidth/2 + photoWidth/2}, 0)`);
        
        // Add person silhouette based on who is present
        if (husband && wife) {
            // Couple silhouette
            photoGroup.append('g')
                .attr('class', 'couple-silhouette')
                .attr('transform', 'scale(0.5)')
                .append('path')
                .attr('d', 'M-25,-20 C-25,-30 -15,-40 -5,-40 C5,-40 15,-30 15,-20 C15,-10 5,0 -5,0 L-5,20 M15,-20 C15,-30 25,-40 35,-40 C45,-40 55,-30 55,-20 C55,-10 45,0 35,0 L35,20');
        } else if (husband) {
            // Male silhouette
            photoGroup.append('g')
                .attr('class', 'male-silhouette')
                .attr('transform', 'scale(2) translate(-15, -5)')
                .append('path')
                .attr('d', 'M15,-5 C17.761,-5 20,-2.761 20,0 C20,2.761 17.761,5 15,5 C12.239,5 10,2.761 10,0 C10,-2.761 12.239,-5 15,-5 Z M15,7 C10.029,7 6,11.029 6,16 L24,16 C24,11.029 19.971,7 15,7 Z');
        } else if (wife) {
            // Female silhouette
            photoGroup.append('g')
                .attr('class', 'female-silhouette')
                .attr('transform', 'scale(2) translate(-15, -5)')
                .append('path')
                .attr('d', 'M15,-5 C17.761,-5 20,-2.761 20,0 C20,2.761 17.761,5 15,5 C12.239,5 10,2.761 10,0 C10,-2.761 12.239,-5 15,-5 Z M15,7 C10.029,7 6,11.029 6,16 L24,16 C24,11.029 19.971,7 15,7 Z');
        }
        
        // Create text group in the right 3/4 of the box with padding
        const textGroup = nodeGroup.append('g')
            .attr('class', 'text-content')
            .attr('transform', `translate(0, ${-boxHeight/2 + 16})`);
        
        let yOffset = 0;
        
        // Husband's name (if present)
        if (husband) {
            const husbandNameText = textGroup.append('text')
                .attr('class', 'name')
                .attr('y', yOffset)
                .attr('text-anchor', 'middle')
                .text(husband.name || t('unknown', { lng: this.config.language }));
            
            const nameLines = this.wrapText(husbandNameText, textWidth - 20);
            yOffset += 16 + (nameLines - 1) * 16; // Increased line spacing for wrapped names
            
            // Husband's lifespan with age calculation
            let husbandLifespanText = '';
            if (husband.birth_date && husband.birth_date !== 'undefined') {
                husbandLifespanText = husband.birth_date;
                
                if (husband.death_date && husband.death_date !== 'undefined') {
                    husbandLifespanText += ` - ${husband.death_date}`;
                }
            }
            
            if (husbandLifespanText) {
                const husbandLifespan = textGroup.append('text')
                    .attr('class', 'lifespan')
                    .attr('y', yOffset)
                    .attr('text-anchor', 'middle')
                    .text(husbandLifespanText);
                
                const lifespanLines = this.wrapText(husbandLifespan, textWidth - 20);
                yOffset += 14 + (lifespanLines - 1) * 14; // Increased line spacing for wrapped dates
            } else {
                // Add some spacing even if no lifespan
                yOffset += 6;
            }
        }
        
        // Wife's name (if present)
        if (wife) {
            // If there's a husband and wife, add a small divider
            if (husband) {
                textGroup.append('line')
                    .attr('class', 'spouse-divider')
                    .attr('x1', -textWidth/2 + 10)
                    .attr('y1', yOffset - 2)
                    .attr('x2', textWidth/2 - 10)
                    .attr('y2', yOffset - 2);
                yOffset += 12; // Increased spacing after divider
            }
            
            const wifeNameText = textGroup.append('text')
                .attr('class', 'spouse-name')
                .attr('y', yOffset)
                .attr('text-anchor', 'middle')
                .text(wife.name || t('unknown', { lng: this.config.language }));
            
            const nameLines = this.wrapText(wifeNameText, textWidth - 20);
            yOffset += 16 + (nameLines - 1) * 16; // Increased line spacing for wrapped names
            
            // Wife's lifespan with age calculation
            let wifeLifespanText = '';
            if (wife.birth_date && wife.birth_date !== 'undefined') {
                wifeLifespanText = wife.birth_date;
                
                if (wife.death_date && wife.death_date !== 'undefined') {
                    wifeLifespanText += ` - ${wife.death_date}`;
                }
            }
            
            if (wifeLifespanText) {
                const wifeLifespan = textGroup.append('text')
                    .attr('class', 'spouse-lifespan')
                    .attr('y', yOffset)
                    .attr('text-anchor', 'middle')
                    .text(wifeLifespanText);
                
                const lifespanLines = this.wrapText(wifeLifespan, textWidth - 20);
                yOffset += 14 + (lifespanLines - 1) * 14; // Increased line spacing for wrapped dates
            } else {
                // Add some spacing even if no lifespan
                yOffset += 6;
            }
        }
    }
    
    /**
     * Determine the relationship class for child-parent connections
     * @param {Object} nodeData - D3 hierarchy node data
     * @param {Object} familyUnit - Family unit data
     * @returns {String} - CSS class representing relationship
     */
    determineRelationClass(nodeData, familyUnit) {
        // Skip if no parent data
        if (!nodeData.parent || !nodeData.parent.data || !nodeData.parent.data.coupleInfo) {
            return 'couple-node';
        }
        
        const parentUnit = nodeData.parent.data;
        
        // Get the current person's ID
        const person = familyUnit.person;
        if (!person) return 'couple-node';
        
        // Find out which parent(s) connect this person to the parent unit
        const fatherId = parentUnit.coupleInfo.fatherId;
        const motherId = parentUnit.coupleInfo.motherId;
        
        // Check if this person's parents include the father/mother from parent unit
        const isConnectedByFather = person.parents.includes(fatherId);
        const isConnectedByMother = person.parents.includes(motherId);
        
        if (isConnectedByFather && !isConnectedByMother) {
            // Father's son or daughter?
            return person.gender === 'male' ? 'boy-child-node' : 'girl-child-node';
        } else if (isConnectedByMother && !isConnectedByFather) {
            // Mother's son or daughter?
            return person.gender === 'male' ? 'boy-child-node' : 'girl-child-node';
        } else if (isConnectedByFather && isConnectedByMother) {
            // Both parents, use person's gender
            return person.gender === 'male' ? 'boy-child-node' : 'girl-child-node';
        }
        
        // Default case
        return 'couple-node';
    }
    
    /**
     * Calculate age from birth date string
     * @param {String} birthDateString - Birth date in format YYYY or YYYY-MM-DD
     * @returns {Number|null} - Age or null if can't be calculated
     */
    calculateAge(birthDateString) {
        if (!birthDateString) return null;
        
        try {
            // Handle just year format (e.g., "1980")
            if (/^\d{4}$/.test(birthDateString)) {
                const birthYear = parseInt(birthDateString, 10);
                const currentYear = new Date().getFullYear();
                return currentYear - birthYear;
            }
            
            // Handle date formats like YYYY-MM-DD or MM/DD/YYYY
            const birthDate = new Date(birthDateString);
            if (isNaN(birthDate.getTime())) {
                // If invalid date
                return null;
            }
            
            // Calculate age
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            // Adjust age if birthday hasn't occurred yet this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age;
        } catch (error) {
            debugLog('Error calculating age', { birthDateString, error });
            return null;
        }
    }
    
    /**
     * Wrap text to fit within specified width
     * @param {Selection} text - D3 selection for text element
     * @param {Number} width - Max width for text
     * @returns {Number} - Number of lines created
     */
    wrapText(text, width) {
        let lineCount = 1;
        
        text.each(function() {
            const textElement = d3.select(this);
            const words = textElement.text().split(/\s+/).reverse();
            const lineHeight = 1.3; // Increased line height for better spacing
            const y = textElement.attr("y");
            const dy = parseFloat(textElement.attr("dy") || 0);
            const textAnchor = textElement.attr("text-anchor") || "start";
            const x = textElement.attr("x") || 0;
            
            let line = [];
            let lineNumber = 0;
            let word = words.pop();
            let tspan = textElement.text(null)
                .append("tspan")
                .attr("x", x)
                .attr("y", y)
                .attr("dy", dy + "em")
                .attr("text-anchor", textAnchor);
            
            while (word) {
                line.push(word);
                tspan.text(line.join(" "));
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = textElement.append("tspan")
                        .attr("x", x)
                        .attr("y", y)
                        .attr("dy", ++lineNumber * lineHeight + dy + "em")
                        .attr("text-anchor", textAnchor)
                        .text(word);
                    lineCount++;
                }
                word = words.pop();
            }
        });
        
        return lineCount;
    }
    
    /**
     * Get color for a person based on gender or other attributes
     * @param {Object} person - Person data
     * @returns {String} - Color code
     */
    getPersonColor(person) {
        if (!person) return '#757575'; // Gray for unknown
        
        if (this.config.colorScheme === 'gender') {
            // Gender-based colors
            const gender = person.gender ? person.gender.toLowerCase() : '';
            if (gender === 'male') {
                return 'var(--tree-male-color)'; 
            } else if (gender === 'female') {
                return 'var(--tree-female-color)';
            } else {
                return '#757575'; // Gray for unknown
            }
        } else if (this.config.colorScheme === 'generation') {
            // Generation-based colors
            const generations = ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2', '#00796b'];
            const genIndex = person.generation % generations.length;
            return generations[genIndex];
        } else if (this.config.colorScheme === 'tree') {
            // Tree-like colors
            return 'var(--tree-node-stroke)'; 
        } else {
            // Default color
            return '#2196f3';
        }
    }
} 