// Tree Renderer module using d3.js for Family Tree Visualization
import * as d3 from 'd3';
import { t } from './i18n.js';
import { NodeRenderer } from './modules/NodeRenderer.js';
import { LinkRenderer } from './modules/LinkRenderer.js';
import { TreeBuilder } from './modules/TreeBuilder.js';
import { TreeLayout } from './modules/TreeLayout.js';
import { exportSVG } from './modules/ExportUtils.js';

// Debug logs flag - set to true to see debug messages
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[TreeRenderer] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

// Render the family tree using d3.js
export function renderFamilyTree(familyTree, container, config) {
    debugLog('Starting tree rendering');

    if (!familyTree || !familyTree.individuals || familyTree.individuals.length === 0) {
        throw new Error('Invalid family tree data provided');
    }
    
    if (!container) {
        throw new Error('No container element provided for rendering');
    }
    
    // Default configuration
    const defaultConfig = {
        orientation: 'top-down',
        nodeSize: 1.5,
        nodeSpacing: 3.5,
        colorScheme: 'gender',
        fontSize: 14,
        lineStyle: 'straight',
        svgWidth: 2000,
        svgHeight: 1500,
        language: 'en',
        rootPersonId: null,
        showOnlyDirectFamily: true
    };
    
    // Merge with provided config
    const renderConfig = { ...defaultConfig, ...config };
    debugLog('Rendering with config', renderConfig);
    
    // Create the renderer object
    const renderer = new FamilyTreeRenderer(familyTree, container, renderConfig);
    
    // Render the tree
    try {
        renderer.render();
        debugLog('Tree rendering complete');
    } catch (error) {
        debugLog('Error during tree rendering', error);
        throw error;
    }
    
    return renderer;
}

// Family Tree Renderer class
class FamilyTreeRenderer {
    constructor(familyTree, container, config) {
        this.familyTree = familyTree;
        this.container = container;
        this.config = config;
        
        // D3 selections
        this.svg = null;
        this.treeGroup = null;
        this.nodesGroup = null;
        this.linksGroup = null;
        
        // Module instances
        this.treeBuilder = new TreeBuilder(familyTree, config);
        this.treeLayout = new TreeLayout(config);
        this.nodeRenderer = new NodeRenderer(config);
        this.linkRenderer = new LinkRenderer(config);
        
        // Node dimensions for export
        this.nodeWidth = 220;
        this.nodeHeight = 140;
        
        // Keep track of hierarchy data and root node
        this.hierarchyData = null;
        this.root = null;
        
        debugLog(`Initialized renderer with ${familyTree.individuals.length} individuals`);
    }
    
    // Main render method
    render() {
        debugLog('Starting rendering');
        
        // Create SVG container
        this.createSvg();
        
        // Build hierarchy from family tree data
        this.hierarchyData = this.treeBuilder.buildHierarchy();
        debugLog('Created hierarchy data', { nodes: this.hierarchyData.descendants().length });
        
        // Apply the tree layout
        this.root = this.treeLayout.applyLayout(this.hierarchyData);
        
        // Create links between nodes
        this.linkRenderer.createLinks(this.linksGroup, this.root);
        
        // Create nodes
        this.nodeRenderer.createNodes(this.nodesGroup, this.root.descendants(), this.treeLayout.isHorizontalOrientation());
        
        // Add marriage links
        this.linkRenderer.createMarriageLinks(this.linksGroup, this.root.descendants(), this.treeLayout.isHorizontalOrientation());
        
        // Set up zoom behavior
        this.treeLayout.setupZoom(this.svg, this.treeGroup);
        
        // Initial centering
        this.resetView();
        
        debugLog('Rendering complete');
    }
    
    // Create SVG container
    createSvg() {
        // Clear existing SVG
        d3.select(this.container).selectAll('svg').remove();
        
        // Create new SVG
        this.svg = d3.select(this.container)
            .append('svg')
            .attr('width', this.config.svgWidth)
            .attr('height', this.config.svgHeight)
            .attr('viewBox', `0 0 ${this.config.svgWidth} ${this.config.svgHeight}`)
            .attr('class', 'family-tree-svg');
        
        // Add defs for markers
        const defs = this.svg.append('defs');
        
        // Add parent-child marker
        defs.append('marker')
            .attr('id', 'arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 8)
            .attr('refY', 0)
            .attr('markerWidth', 6)
            .attr('markerHeight', 6)
            .attr('orient', 'auto')
            .append('path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr('class', 'arrow-head');
        
        // Create container groups
        this.treeGroup = this.svg.append('g')
            .attr('class', 'tree-group')
            .attr('transform', `translate(${this.config.svgWidth / 2}, 60)`);
        
        this.linksGroup = this.treeGroup.append('g')
            .attr('class', 'links-group');
        
        this.nodesGroup = this.treeGroup.append('g')
            .attr('class', 'nodes-group');
    }
    
    // Reset view to fit the tree
    resetView() {
        this.treeLayout.resetView(this.svg, this.treeGroup, this.root);
    }
    
    // Update language of the visualization
    updateLanguage(language) {
        this.config.language = language;
        this.render();
    }
    
    // Export SVG to file
    exportSVG(splitIntoPages = false, exportAsPdf = false) {
        exportSVG(this.svg, this.nodeWidth, this.nodeHeight, splitIntoPages, exportAsPdf);
    }
}

export default {
    renderFamilyTree
}; 