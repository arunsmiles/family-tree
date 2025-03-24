// Export Utils Module for Family Tree Visualization
import * as d3 from 'd3';

// Debug logs flag
const DEBUG = true;

// Debug logging function
function debugLog(message, data = null) {
    if (DEBUG) {
        console.log(`[ExportUtils] ${message}`);
        if (data) {
            console.log(data);
        }
    }
}

/**
 * Export the SVG as a file
 * @param {Selection} svg - D3 selection for the SVG
 * @param {Number} nodeWidth - Width of a node
 * @param {Number} nodeHeight - Height of a node
 */
export function exportSVG(svg, nodeWidth, nodeHeight) {
    debugLog('Exporting SVG');
    
    if (!svg || svg.empty()) {
        console.error('No SVG to export');
        return;
    }

    try {
        // Create a clone of the SVG for export
        const svgCopy = svg.node().cloneNode(true);
        
        // Get the transform from the original treeGroup
        const treeGroup = d3.select(svgCopy).select('.tree-group');
        if (treeGroup.empty()) {
            console.error('No tree group found in SVG');
            return;
        }
        
        // Keep the current transform
        const originalTransform = treeGroup.attr('transform');
        
        // Calculate actual tree dimensions
        const nodes = d3.select(svgCopy).selectAll('.node');
        if (nodes.empty()) {
            console.error('No nodes found in SVG');
            return;
        }
        
        // Calculate bounds
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        
        nodes.each(function() {
            const node = d3.select(this);
            const transform = node.attr('transform');
            
            // Parse the transform to get x and y
            // Handle different transform formats
            let x, y;
            
            if (transform.startsWith('translate(')) {
                try {
                    // Regular format: translate(x,y)
                    const parts = transform.substring(10, transform.length - 1).split(',');
                    x = parseFloat(parts[0]);
                    y = parseFloat(parts[1]);
                } catch (e) {
                    debugLog('Error parsing transform', { transform, error: e });
                    return;
                }
            } else {
                // If the transform format is different, use getScreenCTM
                // This is a fallback approach
                try {
                    const ctm = this.getScreenCTM();
                    if (ctm) {
                        x = ctm.e;
                        y = ctm.f;
                    } else {
                        return;
                    }
                } catch (e) {
                    debugLog('Error getting CTM', { error: e });
                    return;
                }
            }
            
            // Use node dimensions
            const halfWidth = nodeWidth / 2;
            const halfHeight = nodeHeight / 2;
            
            minX = Math.min(minX, x - halfWidth);
            minY = Math.min(minY, y - halfHeight);
            maxX = Math.max(maxX, x + halfWidth);
            maxY = Math.max(maxY, y + halfHeight);
        });
        
        // Add padding
        const padding = 80;
        minX -= padding;
        minY -= padding;
        maxX += padding;
        maxY += padding;
        
        // Calculate dimensions
        const width = maxX - minX;
        const height = maxY - minY;
        
        debugLog('SVG bounds calculated', { minX, minY, maxX, maxY, width, height });
        
        // Reset transform on the tree group to use the natural positions
        treeGroup.attr('transform', `translate(${-minX}, ${-minY})`);
        
        // Set viewBox to focus on content
        svgCopy.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svgCopy.setAttribute('width', width);
        svgCopy.setAttribute('height', height);
        
        // Add stylesheet for downloaded SVG
        const style = document.createElement('style');
        style.textContent = `
            /* Node styling */
            .node-box {
                stroke: #5d4037;
                stroke-width: 2px;
                fill: #8bc34a;
                rx: 5px;
                ry: 5px;
            }
            
            /* Gender-specific styling */
            .male-node {
                fill: #8BC34A;
            }
            
            .female-node {
                fill: #F8BBD0;
            }
            
            /* Couple node */
            .couple-node {
                fill: #8BC34A;
            }
            
            /* Relationship-based styling */
            .boy-child-node {
                fill: #8BC34A;
            }
            
            .girl-child-node {
                fill: #F8BBD0;
            }
            
            /* Text styling */
            .name {
                font-weight: bold;
                font-size: 14px;
                fill: #212121;
            }
            
            .spouse-name {
                font-size: 14px;
                fill: #212121;
            }
            
            .lifespan, .spouse-lifespan, .native-place, .birth-order {
                font-size: 12px;
                fill: #757575;
            }
            
            /* Links styling */
            .link {
                fill: none;
                stroke: #795548;
                stroke-width: 4px;
                stroke-linecap: round;
            }
            
            .link-marriage {
                fill: none;
                stroke: #795548;
                stroke-width: 3px;
                stroke-dasharray: 5, 5;
            }
            
            /* Silhouette styling */
            .male-silhouette path,
            .female-silhouette path,
            .couple-silhouette path {
                fill: #444;
                stroke: #212121;
                stroke-width: 0.5px;
            }
            
            /* Spouse divider */
            .spouse-divider {
                stroke: #757575;
                stroke-width: 1px;
                stroke-dasharray: 2, 2;
            }
            
            /* Text positioning */
            .text-content {
                text-anchor: middle;
            }
            .node text, .node tspan {
                text-anchor: middle;
            }
        `;
        svgCopy.insertBefore(style, svgCopy.firstChild);
        
        // Add Google Fonts link for Tamil support
        const link = document.createElement('link');
        link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil&display=swap');
        link.setAttribute('rel', 'stylesheet');
        svgCopy.insertBefore(link, svgCopy.firstChild);
        
        // Convert to string and add XML declaration
        const serializer = new XMLSerializer();
        let svgString = serializer.serializeToString(svgCopy);
        svgString = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgString;
        
        // Create a blob link for download
        const blob = new Blob([svgString], {type: 'image/svg+xml'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'family-tree.svg';
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            debugLog('SVG export complete');
        }, 100);
    } catch (error) {
        console.error('Error exporting SVG:', error);
    }
} 