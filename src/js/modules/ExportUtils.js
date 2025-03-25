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

// A4 paper dimensions in pixels at 96 DPI
const A4_WIDTH_PX = 794;  // 210mm at 96 DPI
const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI

// A4 paper dimensions in millimeters for PDF
const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;

// Page overlap in pixels to help with alignment when stitching pages together
const PAGE_OVERLAP = 50;

/**
 * Export the SVG as a file
 * @param {Selection} svg - D3 selection for the SVG
 * @param {Number} nodeWidth - Width of a node
 * @param {Number} nodeHeight - Height of a node
 * @param {Boolean} splitIntoPages - Whether to split the SVG into A4 pages
 * @param {Boolean} exportAsPdf - Whether to export as PDF instead of SVG
 */
export function exportSVG(svg, nodeWidth, nodeHeight, splitIntoPages = false, exportAsPdf = false) {
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
            
            /* Page grid styling */
            .page-grid {
                stroke: #aaa;
                stroke-width: 1px;
                stroke-dasharray: 5, 5;
                fill: none;
            }
            
            .page-number {
                font-size: 12px;
                fill: #666;
                text-anchor: middle;
                dominant-baseline: middle;
            }
        `;
        svgCopy.insertBefore(style, svgCopy.firstChild);
        
        // Add Google Fonts link for Tamil support
        const link = document.createElement('link');
        link.setAttribute('href', 'https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil&display=swap');
        link.setAttribute('rel', 'stylesheet');
        svgCopy.insertBefore(link, svgCopy.firstChild);
        
        if (splitIntoPages) {
            // Calculate number of pages needed
            const effectivePageWidth = A4_WIDTH_PX - PAGE_OVERLAP;
            const effectivePageHeight = A4_HEIGHT_PX - PAGE_OVERLAP;
            
            const pagesX = Math.ceil(width / effectivePageWidth);
            const pagesY = Math.ceil(height / effectivePageHeight);
            
            debugLog('Page calculation', { pagesX, pagesY, totalPages: pagesX * pagesY });
            
            // Add grid to show page boundaries
            const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            gridGroup.setAttribute('class', 'page-grid-group');
            
            // Generate separate SVGs for each page
            const svgPages = [];
            let pageIndex = 0;
            
            for (let y = 0; y < pagesY; y++) {
                for (let x = 0; x < pagesX; x++) {
                    // Calculate page position
                    const pageX = x * effectivePageWidth;
                    const pageY = y * effectivePageHeight;
                    
                    // Draw page grid on complete SVG
                    const pageRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                    pageRect.setAttribute('class', 'page-grid');
                    pageRect.setAttribute('x', pageX);
                    pageRect.setAttribute('y', pageY);
                    pageRect.setAttribute('width', A4_WIDTH_PX);
                    pageRect.setAttribute('height', A4_HEIGHT_PX);
                    gridGroup.appendChild(pageRect);
                    
                    // Add page number
                    const pageNumber = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    pageNumber.setAttribute('class', 'page-number');
                    pageNumber.setAttribute('x', pageX + A4_WIDTH_PX / 2);
                    pageNumber.setAttribute('y', pageY + A4_HEIGHT_PX - 15);
                    pageNumber.textContent = `Page ${++pageIndex} (${x+1},${y+1}) of ${pagesX*pagesY}`;
                    gridGroup.appendChild(pageNumber);
                    
                    // Create page SVG
                    const pageSvg = svgCopy.cloneNode(true);
                    pageSvg.setAttribute('viewBox', `${pageX} ${pageY} ${A4_WIDTH_PX} ${A4_HEIGHT_PX}`);
                    pageSvg.setAttribute('width', A4_WIDTH_PX);
                    pageSvg.setAttribute('height', A4_HEIGHT_PX);
                    
                    // Add page identifier
                    const pageIdentifier = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                    pageIdentifier.setAttribute('x', A4_WIDTH_PX / 2);
                    pageIdentifier.setAttribute('y', A4_HEIGHT_PX - 15);
                    pageIdentifier.setAttribute('class', 'page-number');
                    pageIdentifier.textContent = `Page ${pageIndex} (${x+1},${y+1}) of ${pagesX*pagesY}`;
                    pageSvg.appendChild(pageIdentifier);
                    
                    // Add overlap guides to help with alignment
                    if (x > 0) {
                        const leftGuide = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        leftGuide.setAttribute('x', pageX);
                        leftGuide.setAttribute('y', pageY);
                        leftGuide.setAttribute('width', PAGE_OVERLAP);
                        leftGuide.setAttribute('height', A4_HEIGHT_PX);
                        leftGuide.setAttribute('fill', 'rgba(255, 255, 0, 0.1)');
                        leftGuide.setAttribute('stroke', 'none');
                        pageSvg.appendChild(leftGuide);
                    }
                    
                    if (y > 0) {
                        const topGuide = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                        topGuide.setAttribute('x', pageX);
                        topGuide.setAttribute('y', pageY);
                        topGuide.setAttribute('width', A4_WIDTH_PX);
                        topGuide.setAttribute('height', PAGE_OVERLAP);
                        topGuide.setAttribute('fill', 'rgba(255, 255, 0, 0.1)');
                        topGuide.setAttribute('stroke', 'none');
                        pageSvg.appendChild(topGuide);
                    }
                    
                    svgPages.push({
                        svg: pageSvg,
                        x: x + 1,
                        y: y + 1,
                        index: pageIndex
                    });
                }
            }
            
            // Add grid to main SVG
            svgCopy.appendChild(gridGroup);
            
            if (exportAsPdf) {
                // Export as PDF with all pages included
                exportSvgAsPdf(svgPages, pagesX, pagesY);
            } else {
                // Convert to string and add XML declaration
                const serializer = new XMLSerializer();
                let svgString = serializer.serializeToString(svgCopy);
                svgString = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + svgString;
                
                // Create a blob link for full SVG download with grid overlay
                const blob = new Blob([svgString], {type: 'image/svg+xml'});
                const url = URL.createObjectURL(blob);
                
                const a = document.createElement('a');
                a.href = url;
                a.download = 'family-tree-with-grid.svg';
                document.body.appendChild(a);
                a.click();
                
                // Create a zip file containing all page SVGs
                import('jszip').then(JSZip => {
                    const zip = new JSZip.default();
                    
                    // Add each page to the zip
                    svgPages.forEach(page => {
                        const pageStr = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + 
                                    serializer.serializeToString(page.svg);
                        zip.file(`family-tree-page-${page.index}-(${page.x},${page.y}).svg`, pageStr);
                    });
                    
                    // Add a README.txt with instructions for printing
                    const readme = `Family Tree - Printable Pages
                    
This zip file contains ${svgPages.length} SVG files that can be printed on A4 paper.
Each file has a grid position (X,Y) in its filename to help with assembly.

Printing Instructions:
1. Print each SVG file on A4 paper.
2. Trim the overlapping margins (shown with light yellow background) on the right/bottom edges.
3. Align the pages according to their (X,Y) grid positions.
4. Tape or glue the pages together to form the complete family tree.

The overlay yellow areas show overlap between pages to help with alignment.`;
                    
                    zip.file('README.txt', readme);
                    
                    // Generate and download the zip file
                    zip.generateAsync({type: 'blob'}).then(zipBlob => {
                        const zipUrl = URL.createObjectURL(zipBlob);
                        const zipLink = document.createElement('a');
                        zipLink.href = zipUrl;
                        zipLink.download = 'family-tree-printable-pages.zip';
                        document.body.appendChild(zipLink);
                        zipLink.click();
                        
                        // Clean up
                        setTimeout(() => {
                            document.body.removeChild(zipLink);
                            URL.revokeObjectURL(zipUrl);
                        }, 100);
                    });
                }).catch(error => {
                    console.error('Error creating zip file:', error);
                    // Fall back to downloading individual SVGs
                    svgPages.forEach(page => {
                        const pageStr = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n' + 
                                    serializer.serializeToString(page.svg);
                        const pageBlob = new Blob([pageStr], {type: 'image/svg+xml'});
                        const pageUrl = URL.createObjectURL(pageBlob);
                        const pageLink = document.createElement('a');
                        pageLink.href = pageUrl;
                        pageLink.download = `family-tree-page-${page.index}-(${page.x},${page.y}).svg`;
                        document.body.appendChild(pageLink);
                        pageLink.click();
                        
                        // Clean up
                        setTimeout(() => {
                            document.body.removeChild(pageLink);
                            URL.revokeObjectURL(pageUrl);
                        }, 100);
                    });
                });
                
                debugLog('SVG export with pagination complete');
            }
        } else {
            // Standard single SVG export
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
        }
    } catch (error) {
        console.error('Error exporting SVG:', error);
    }
} 

/**
 * Export SVG pages as a PDF document
 * @param {Array} svgPages - Array of SVG page objects
 * @param {Number} pagesX - Number of pages in horizontal direction
 * @param {Number} pagesY - Number of pages in vertical direction
 */
async function exportSvgAsPdf(svgPages, pagesX, pagesY) {
    debugLog('Starting PDF export');
    
    try {
        // Show loading message
        const loadingDiv = document.createElement('div');
        loadingDiv.style.position = 'fixed';
        loadingDiv.style.top = '0';
        loadingDiv.style.left = '0';
        loadingDiv.style.width = '100%';
        loadingDiv.style.height = '100%';
        loadingDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
        loadingDiv.style.color = 'white';
        loadingDiv.style.display = 'flex';
        loadingDiv.style.flexDirection = 'column';
        loadingDiv.style.alignItems = 'center';
        loadingDiv.style.justifyContent = 'center';
        loadingDiv.style.zIndex = '9999';
        loadingDiv.innerHTML = `
            <h2>Generating PDF...</h2>
            <p>This may take a few moments, please wait.</p>
            <p id="pdf-progress">Preparing...</p>
        `;
        document.body.appendChild(loadingDiv);
        
        // Import required libraries
        const jsPDF = (await import('jspdf')).default;
        const html2canvas = await import('html2canvas');
        
        // Create PDF document
        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });
        
        // Create cover page with instructions first
        const totalPages = svgPages.length;
        pdf.setFontSize(20);
        pdf.text('Family Tree - Complete Layout', 105, 20, { align: 'center' });
        pdf.setFontSize(12);
        pdf.text(`This PDF contains ${totalPages} pages that form the complete family tree.`, 105, 30, { align: 'center' });
        pdf.text(`Pages are arranged in a ${pagesX}×${pagesY} grid.`, 105, 40, { align: 'center' });
        
        // Draw the page grid layout on the cover
        const gridStartX = 30;
        const gridStartY = 60;
        const cellWidth = (A4_WIDTH_MM - 60) / pagesX;
        const cellHeight = cellWidth * (A4_HEIGHT_MM / A4_WIDTH_MM);
        const gridEndY = gridStartY + (cellHeight * pagesY);
        
        if (gridEndY < A4_HEIGHT_MM - 30) {
            pdf.setDrawColor(150, 150, 150);
            pdf.setFillColor(240, 240, 240);
            
            // Draw cells for each page
            let pageNum = 1;
            for (let y = 0; y < pagesY; y++) {
                for (let x = 0; x < pagesX; x++) {
                    const cellX = gridStartX + (x * cellWidth);
                    const cellY = gridStartY + (y * cellHeight);
                    
                    pdf.setFillColor(240, 240, 240);
                    pdf.rect(cellX, cellY, cellWidth, cellHeight, 'FD');
                    
                    // Add page number to cell
                    pdf.setFontSize(8);
                    pdf.text(`Page ${pageNum}`, cellX + cellWidth/2, cellY + cellHeight/2, { align: 'center' });
                    pageNum++;
                }
            }
            
            // Add assembly instructions
            pdf.setFontSize(12);
            pdf.text('Assembly Instructions:', 105, gridEndY + 20, { align: 'center' });
            pdf.setFontSize(10);
            pdf.text('1. Print all pages at 100% scale (no scaling).', 105, gridEndY + 30, { align: 'center' });
            pdf.text('2. Arrange pages according to the grid layout shown above.', 105, gridEndY + 38, { align: 'center' });
            pdf.text('3. Trim the overlapping regions and tape pages together.', 105, gridEndY + 46, { align: 'center' });
        }
        
        // Now add a new page for the first family tree page
        pdf.addPage();
        
        // Create a container for rendering SVGs
        const renderContainer = document.createElement('div');
        renderContainer.style.position = 'absolute';
        renderContainer.style.top = '0';
        renderContainer.style.left = '0';
        renderContainer.style.width = `${A4_WIDTH_PX}px`;
        renderContainer.style.height = `${A4_HEIGHT_PX}px`;
        renderContainer.style.overflow = 'hidden';
        renderContainer.style.backgroundColor = 'white';
        renderContainer.style.zIndex = '-9999';
        document.body.appendChild(renderContainer);
        
        // Process each SVG page
        for (let i = 0; i < svgPages.length; i++) {
            const page = svgPages[i];
            
            // Update progress message
            document.getElementById('pdf-progress').textContent = `Processing page ${i+1} of ${svgPages.length}`;
            
            try {
                // Clear container for each page
                renderContainer.innerHTML = '';
                
                // Get SVG string
                const svgString = new XMLSerializer().serializeToString(page.svg);
                
                // Add the SVG directly to the container using innerHTML
                // This avoids issues with loading images and security restrictions
                renderContainer.innerHTML = svgString;
                
                // Make sure SVG fills the container
                const svgElement = renderContainer.querySelector('svg');
                if (svgElement) {
                    svgElement.setAttribute('width', '100%');
                    svgElement.setAttribute('height', '100%');
                    svgElement.style.display = 'block';
                    // Add styles to ensure all elements are visible
                    const styleElement = document.createElement('style');
                    styleElement.textContent = `
                        * { visibility: visible !important; }
                        svg { background-color: white; }
                    `;
                    svgElement.appendChild(styleElement);
                }
                
                // Allow time for the SVG to render (longer timeout for better rendering)
                await new Promise(resolve => setTimeout(resolve, 250));
                
                // Render to canvas
                const canvas = await html2canvas(renderContainer, {
                    useCORS: true,
                    scale: 2, // Higher quality
                    allowTaint: true,
                    backgroundColor: 'white',
                    logging: false,
                    // Force html2canvas to use the specified dimensions
                    width: A4_WIDTH_PX,
                    height: A4_HEIGHT_PX
                });
                
                // Add a new page for each page except the first one
                if (i > 0) {
                    pdf.addPage();
                }
                
                // Add the image to the PDF
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, '', 'FAST');
                
                // Add page number to help with assembly
                pdf.setTextColor(100, 100, 100);
                pdf.setFontSize(8);
                pdf.text(`Page ${i+1} (${page.x},${page.y})`, A4_WIDTH_MM - 20, A4_HEIGHT_MM - 5, { align: 'right' });
                
                // Allow UI to update
                await new Promise(resolve => setTimeout(resolve, 0));
            } catch (err) {
                console.error(`Error processing page ${i+1}:`, err);
                debugLog(`Error on page ${i+1}`, err);
                
                // Add an error page instead
                if (i > 0) {
                    pdf.addPage();
                }
                pdf.setFillColor(255, 240, 240);
                pdf.rect(0, 0, A4_WIDTH_MM, A4_HEIGHT_MM, 'F');
                pdf.setTextColor(200, 0, 0);
                pdf.setFontSize(16);
                pdf.text(`Error rendering page ${i+1}`, 105, 50, { align: 'center' });
                pdf.setFontSize(12);
                pdf.text(err.message || 'Unknown error', 105, 70, { align: 'center' });
            }
        }
        
        // Remove the render container
        document.body.removeChild(renderContainer);
        
        // Save the PDF file
        pdf.save('family-tree-complete.pdf');
        
        // Remove loading message
        document.body.removeChild(loadingDiv);
        
        debugLog('PDF export complete');
    } catch (error) {
        console.error('Error creating PDF:', error);
        alert('Error generating PDF: ' + error.message);
        
        // Remove loading message if it exists
        const loadingDiv = document.querySelector('div[style*="position: fixed"]');
        if (loadingDiv) {
            document.body.removeChild(loadingDiv);
        }
        
        // Remove render container if it exists
        const renderContainer = document.querySelector('div[style*="z-index: -9999"]');
        if (renderContainer) {
            document.body.removeChild(renderContainer);
        }
    }
} 