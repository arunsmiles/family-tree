// Tree Layout Module for Family Tree Visualization
import * as d3 from 'd3';

// Debug logs flag
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[TreeLayout] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

export class TreeLayout {
    constructor(config) {
        this.config = config;
        
        // Default node dimensions
        this.nodeWidth = 220;
        this.nodeHeight = 140;
        
        // Layout settings
        this.transform = null;
        this.treeLayout = null;
        
        // Set up the tree layout
        this.setupTreeLayout();
        
        debugLog('Initialized TreeLayout with config', config);
    }
    
    /**
     * Set up the tree layout with appropriate node sizing and spacing
     */
    setupTreeLayout() {
        debugLog('Setting up tree layout');
        
        // Set up the tree layout with node sizing
        const baseNodeSize = [
            this.nodeWidth * this.config.nodeSize,
            this.nodeHeight * this.config.nodeSize
        ];
        
        // Apply spacing to avoid overlapping
        const nodeSize = [
            baseNodeSize[0] * this.config.nodeSpacing,
            baseNodeSize[1] * this.config.nodeSpacing
        ];
        
        // Create the layout
        this.treeLayout = d3.tree()
            .nodeSize(nodeSize)
            .separation((a, b) => {
                // Increase separation between nodes
                return a.parent === b.parent ? 1.2 : 1.5;
            });
            
        // Set up orientation-specific transforms
        this.setupOrientation();
        
        debugLog('Tree layout configured', { 
            nodeSize, 
            orientation: this.config.orientation 
        });
    }
    
    /**
     * Setup appropriate transforms based on orientation
     */
    setupOrientation() {
        // Adjust layout based on orientation
        switch (this.config.orientation) {
            case 'top-down':
                // Default orientation, no transform needed
                this.transform = d => d;
                break;
            case 'bottom-up':
                // Flip y coordinates
                this.transform = d => {
                    d.y = -d.y;
                    return d;
                };
                break;
            case 'left-right':
                // Swap x and y
                this.transform = d => {
                    const temp = d.x;
                    d.x = d.y;
                    d.y = temp;
                    return d;
                };
                break;
            case 'right-left':
                // Swap x and y, then flip both
                this.transform = d => {
                    const temp = d.x;
                    d.x = -d.y;
                    d.y = temp;
                    return d;
                };
                break;
            default:
                // Default to top-down
                this.transform = d => d;
        }
    }
    
    /**
     * Apply tree layout to hierarchy data
     * @param {Object} hierarchyData - D3 hierarchy data
     * @returns {Object} - Root node with layout applied
     */
    applyLayout(hierarchyData) {
        debugLog('Applying tree layout to hierarchy data');
        
        // Sort to ensure breadth-first (level-order) traversal
        // This ensures all siblings in a generation are processed together
        hierarchyData.sort((a, b) => {
            // First sort by depth (generation level)
            const depthDiff = a.depth - b.depth;
            if (depthDiff !== 0) return depthDiff;
            
            // If same depth, preserve original order
            return 0;
        });
        
        // Apply the tree layout
        const root = this.treeLayout(hierarchyData);
        
        // Apply transforms based on orientation
        root.each(d => {
            if (this.transform) {
                this.transform(d);
            }
        });
        
        return root;
    }
    
    /**
     * Check if the tree orientation is horizontal
     * @returns {Boolean} - True if orientation is horizontal
     */
    isHorizontalOrientation() {
        return this.config.orientation === 'left-right' || this.config.orientation === 'right-left';
    }
    
    /**
     * Set up zoom behavior for the SVG
     * @param {Selection} svg - D3 selection for SVG
     * @param {Selection} treeGroup - D3 selection for tree group
     */
    setupZoom(svg, treeGroup) {
        debugLog('Setting up zoom behavior');
        
        const zoom = d3.zoom()
            .scaleExtent([0.1, 3])
            .on('zoom', (event) => {
                treeGroup.attr('transform', event.transform);
            });
            
        svg.call(zoom);
    }
    
    /**
     * Reset view to fit the tree
     * @param {Selection} svg - D3 selection for SVG
     * @param {Selection} treeGroup - D3 selection for tree group
     * @param {Object} root - D3 hierarchy root node
     */
    resetView(svg, treeGroup, root) {
        debugLog('Resetting view to fit tree');
        
        // Get descendants excluding the family root node
        const nodes = root.descendants().filter(d => d.data.id !== 'family-root');
        
        if (nodes.length === 0) return;
        
        // Calculate bounds
        let minX = Infinity;
        let maxX = -Infinity;
        let minY = Infinity;
        let maxY = -Infinity;
        
        nodes.forEach(node => {
            const x = this.isHorizontalOrientation() ? node.y : node.x;
            const y = this.isHorizontalOrientation() ? node.x : node.y;
            
            minX = Math.min(minX, x - this.nodeWidth/2);
            maxX = Math.max(maxX, x + this.nodeWidth/2);
            minY = Math.min(minY, y - this.nodeHeight/2);
            maxY = Math.max(maxY, y + this.nodeHeight/2);
        });
        
        // Add padding
        const padding = 50;
        minX -= padding;
        maxX += padding;
        minY -= padding;
        maxY += padding;
        
        // Calculate dimensions
        const width = maxX - minX;
        const height = maxY - minY;
        
        // Calculate scale to fit
        const scale = Math.min(
            this.config.svgWidth / width,
            this.config.svgHeight / height,
            1 // Limit max scale to 1
        );
        
        // Calculate transform
        const translateX = this.config.svgWidth / 2 - (minX + width / 2) * scale;
        const translateY = this.config.svgHeight / 2 - (minY + height / 2) * scale;
        
        // Apply transform
        const transform = d3.zoomIdentity
            .translate(translateX, translateY)
            .scale(scale);
            
        svg.transition()
            .duration(750)
            .call(d3.zoom().transform, transform);
    }
} 