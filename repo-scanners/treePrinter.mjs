import { readdirSync, statSync, writeFileSync } from 'fs';
import { join, basename } from 'path';
import { projectRootPath, ignorePatterns, outputPaths } from '../config.mjs';

export function shouldSkipRecursion(path) {
    const dirName = basename(path);
    return ignorePatterns.some(pattern => 
        dirName === pattern || 
        path.includes(`/${pattern}/`)
    );
}

// Function to get the file structure recursively
export function gettreeStructure(dir, level = 0) {
    let structure = '';
    
    // Get all files and directories within the directory
    const items = readdirSync(dir);
    
    // Separate and sort directories and files
    const directories = items
        .filter(item => statSync(join(dir, item)).isDirectory())
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    const files = items
        .filter(item => statSync(join(dir, item)).isFile())
        .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    
    // Process directories first
    directories.forEach((item, index) => {
        const fullPath = join(dir, item);
        const isLast = index === directories.length - 1 && files.length === 0;
        
        // Add directory to structure
        structure += `${'│   '.repeat(level)}${isLast ? '└── ' : '├── '}${item}/\n`;
        
        if (!shouldSkipRecursion(fullPath)) {
            structure += gettreeStructure(fullPath, level + 1);
        }
    });
    
    // Then process files
    files.forEach((item, index) => {
        const isLast = index === files.length - 1;
        structure += `${'│   '.repeat(level)}${isLast ? '└── ' : '├── '}${item}\n`;
    });
    
    return structure;
}

// Function to create the treeStructure.txt
export function createFileStructureFile(rootDir) {
    // Initialize/clear the tree file
    writeFileSync(outputPaths.tree, '');
    
    const structure = `## Project Structure

\`\`\`
${basename(rootDir)}/\n${gettreeStructure(rootDir)}
\`\`\``;
    
    // Write to file using the configured path
    writeFileSync(outputPaths.tree, structure, 'utf-8');
    console.log(structure);
    console.log(`Tree structure saved to: ${outputPaths.tree}`);
}

// Optional: Move this to a separate file
const projectRoot = projectRootPath;
createFileStructureFile(projectRoot);

