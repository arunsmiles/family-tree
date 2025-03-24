// Link Renderer Module for Family Tree Visualization
import * as d3 from 'd3';

// Debug logs flag
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[LinkRenderer] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

export class LinkRenderer {
    constructor(config) {
        this.config = config;
        
        // Node dimensions for link positioning
        this.nodeWidth = 220;
        this.nodeHeight = 140;
        
        debugLog('Initialized LinkRenderer with config', config);
    }
    
    /**
     * Create links between parent and child nodes
     * @param {Selection} linksGroup - D3 selection for the links group
     * @param {Object} root - D3 hierarchy root node
     */
    createLinks(linksGroup, root) {
        debugLog('Creating parent-child links');
        
        // Skip the first link (from invisible root to family root)
        const links = root.links().filter(link => link.source.data.id !== 'family-root');
        
        // Generate link paths based on lineStyle and orientation
        const linkGenerator = this.getLinkGenerator();
        
        // Create links
        linksGroup.selectAll('.link')
            .data(links)
            .enter()
            .append('path')
            .attr('class', 'link')
            .attr('d', linkGenerator);
    }
    
    /**
     * Create marriage links for nodes with spouses
     * @param {Selection} linksGroup - D3 selection for the links group
     * @param {Array} nodes - Array of hierarchy nodes
     * @param {Boolean} isHorizontal - Whether the layout is horizontal
     */
    createMarriageLinks(linksGroup, nodes, isHorizontal) {
        // Filter nodes that have spouses
        const nodesWithSpouses = nodes.filter(d => 
            d.data.id !== 'family-root' && 
            d.data.spouse
        );
        
        debugLog(`Creating marriage links for ${nodesWithSpouses.length} nodes with spouses`);
        
        // Process each node
        nodesWithSpouses.forEach(node => {
            try {
                debugLog(`Creating marriage link for node ${node.data.id}`);
                
                // Create the line generator for marriage links
                const lineGenerator = d3.line()
                    .x(d => d.x)
                    .y(d => d.y);
                
                // Create points based on orientation
                let points = [];
                
                if (isHorizontal) {
                    // For horizontal layouts
                    points = [
                        { x: node.y - this.nodeWidth/4, y: node.x },
                        { x: node.y + this.nodeWidth/4, y: node.x }
                    ];
                } else {
                    // For vertical layouts
                    points = [
                        { x: node.x - this.nodeWidth/4, y: node.y },
                        { x: node.x + this.nodeWidth/4, y: node.y }
                    ];
                }
                
                // Create marriage link
                linksGroup.append('path')
                    .attr('class', 'link-marriage')
                    .attr('d', lineGenerator(points));
            } catch (error) {
                debugLog(`Error creating marriage link for node ${node.data.id}`, error);
            }
        });
    }
    
    /**
     * Get appropriate link generator based on orientation and line style
     * @returns {Function} - Link generator function
     */
    getLinkGenerator() {
        const orientation = this.config.orientation;
        const lineStyle = this.config.lineStyle;
        
        let linkGenerator;
        
        // Check if layout is horizontal
        const isHorizontalOrientation = this.isHorizontalOrientation();
        
        if (isHorizontalOrientation) {
            // For horizontal layouts (left-right, right-left)
            linkGenerator = d3.linkHorizontal()
                .x(d => d.y)
                .y(d => d.x);
        } else {
            // For vertical layouts (top-down, bottom-up)
            linkGenerator = d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y);
        }
        
        // Apply different curve types based on line style
        if (lineStyle === 'curved') {
            // For curved lines, create a custom generator with a basis curve
            return (d) => {
                const source = { x: d.source.x, y: d.source.y };
                const target = { x: d.target.x, y: d.target.y };
                
                // Create control points for a smooth curve
                let path;
                if (isHorizontalOrientation) {
                    const midY = (source.y + target.y) / 2;
                    path = d3.line()
                        .x(d => d.y)
                        .y(d => d.x)
                        .curve(d3.curveBasis)([
                            { x: source.x, y: source.y },
                            { x: source.x, y: midY },
                            { x: target.x, y: midY },
                            { x: target.x, y: target.y }
                        ]);
                } else {
                    const midX = (source.x + target.x) / 2;
                    path = d3.line()
                        .curve(d3.curveBasis)([
                            { x: source.x, y: source.y },
                            { x: midX, y: source.y },
                            { x: midX, y: target.y },
                            { x: target.x, y: target.y }
                        ]);
                }
                
                return path;
            };
        } else if (lineStyle === 'orthogonal' || lineStyle === 'angled') {
            // For orthogonal/angled lines, use step curve
            return (d) => {
                const source = { x: d.source.x, y: d.source.y };
                const target = { x: d.target.x, y: d.target.y };
                
                let path;
                if (isHorizontalOrientation) {
                    path = d3.line()
                        .x(d => d.y)
                        .y(d => d.x)
                        .curve(d3.curveStep)([source, target]);
                } else {
                    path = d3.line()
                        .curve(d3.curveStep)([source, target]);
                }
                
                return path;
            };
        }
        
        // Default: straight lines
        return linkGenerator;
    }
    
    /**
     * Check if the tree orientation is horizontal
     * @returns {Boolean} - True if orientation is horizontal
     */
    isHorizontalOrientation() {
        return this.config.orientation === 'left-right' || this.config.orientation === 'right-left';
    }
} 