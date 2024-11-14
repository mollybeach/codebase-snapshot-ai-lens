import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { outputPaths } from '../config.mjs';
import { createFileStructureFile } from './treePrinter.mjs';
import { printDirectoryContent } from './contentPrinter.mjs';
import { projectRootPath } from '../config.mjs';

    function isUltimateRoot(path) {
        console.log('🔍 Checking if path is ultimate root:', path);
    
        // Count the number of slashes in the path
        const slashCount = (path.match(/\//g) || []).length;
        
        // If there's more than one slash, get everything before the second slash
        if (slashCount > 1) {
            console.log('🔍 Path contains multiple slashes, finding ultimate root');
            const pathParts = path.split('/');
            const ultimateRoot = pathParts[0] + '/' + pathParts[1];
            console.log('🔍 Ultimate root found:', ultimateRoot);
            return ultimateRoot;
        }
        
        // If one or no slashes, return the path as is
        console.log('🔍 Path is already ultimate root:', path);
        return path;
}

// Helper function to determine snapshot type
function getSnapshotType(path) {
    const segments = path.split('/');
    const currentDir = segments.filter(Boolean).pop();
    
    if (segments.filter(Boolean).length <= 1) {
        return 'Full Project';
    }
    return `Partial Project (${currentDir} directory)`;
}

// Helper function to get context description
function getContextDescription(path) {
    const segments = path.split('/');
    const currentDir = segments.filter(Boolean).pop();
    
    if (segments.filter(Boolean).length <= 1) {
        return 'the complete project structure';
    }
    return `only the ${currentDir} directory and its contents`;
}

// Function to find and parse README.md from project root
function findAndParseReadme(startPath) {
    const readmePath = join(startPath, 'README.md');
    console.log('\n🔍 Looking for README at:', readmePath);
    
    if (existsSync(readmePath)) {
        try {
            const content = readFileSync(readmePath, 'utf8');
            console.log('📖 Successfully read README.md');
            const lines = content.split('\n');
            
            let hashA = '';
            let contentA = '';
            let hashB = '';
            let contentB = '';
            let hashC = '';
            let contentC = '';
            let hashD = '';
            
            let currentContent = '';
            let hashCount = 0;
            let isCollectingContentC = false;
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i];
                
                // Check for # or ## (but not ###)
                if (line.match(/^#{1,2}\s/) && !line.match(/^#{3,}\s/)) {
                    hashCount++;
                    
                    if (hashCount === 1) {
                        hashA = line;
                    } else if (hashCount === 2) {
                        contentA = currentContent.trim();
                        hashB = line;
                    } else if (hashCount === 3) {
                        contentB = currentContent.trim();
                        hashC = line;
                        isCollectingContentC = true;
                    } else if (hashCount === 4) {
                        hashD = line;
                        contentC = currentContent.trim();
                        break;
                    }
                    currentContent = '';
                } else {
                    currentContent += line + '\n';
                }
            }
            
            // Handle case where we don't hit a fourth heading
            if (hashCount === 1) {
                contentA = currentContent.trim();
            } else if (hashCount === 2) {
                contentB = currentContent.trim();
            } else if (hashCount === 3) {
                contentC = currentContent.trim();
            }
            
            const result = {
                hashA: hashA.replace(/^#+\s+/, '').trim(),
                contentA: contentA,
                hashB: hashB.replace(/^#+\s+/, '').trim(),
                contentB: contentB,
                hashC: hashC.replace(/^#+\s+/, '').trim(),
                contentC: contentC
            };
            
            console.log('\n📝 Parsed sections:', {
                hashA: result.hashA,
                hashB: result.hashB,
                hashC: result.hashC,
                hashD: hashD.replace(/^#+\s+/, '').trim()
            });
            
            return result;
            
        } catch (error) {
            console.error('❌ Error parsing README:', error);
            return null;
        }
    }
    console.log('❌ README.md not found');
    return null;
}

// Function to find the nearest package.json
function findNearestPackageJson(startPath) {
    console.log('\n🔍 Starting package.json search from:', startPath);
    let currentPath = startPath;
    
    while (currentPath !== '/') {
        const packagePath = join(currentPath, 'package.json');
        console.log('Checking for package.json at:', packagePath);
        
        if (existsSync(packagePath)) {
            console.log('✅ Found package.json at:', packagePath);
            try {
                const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));
                console.log('📦 Successfully parsed package.json');
                const technologies = {
                    dependencies: packageJson.dependencies || {},
                    devDependencies: packageJson.devDependencies || {},
                    path: packagePath
                };
                return technologies;
            } catch (error) {
                console.error('❌ Error parsing package.json:', error);
                console.error('At path:', packagePath);
                return null;
            }
        }
        
        const previousPath = currentPath;
        currentPath = dirname(currentPath);
        console.log('⬆️  Moving up to parent directory:', currentPath);
        
        // Prevent infinite loop
        if (currentPath === previousPath) {
            console.log('🛑 Reached root directory, stopping search');
            break;
        }
    }
    
    console.log('❌ No package.json found in project hierarchy');
    return null;
}

// Function to format technologies
function formatTechnologies(technologies) {
    if (!technologies) return 'No package.json found in project hierarchy';
    
    const { dependencies, devDependencies, path } = technologies;
    let output = '';
    
    output += '=================================\n';
    output += '      PROJECT TECHNOLOGIES\n';
    output += '=================================\n';
    output += `Located package.json: ${path}\n\n`;

    if (Object.keys(dependencies).length > 0) {
        output += '📦 Main Dependencies\n';
        output += '-------------------\n';
        Object.entries(dependencies)
            .sort(([a], [b]) => a.localeCompare(b))
            .forEach(([name, version]) => {
                output += `• ${name.padEnd(20)} ${version}\n`;
            });
    }
    
    if (Object.keys(devDependencies).length > 0) {
        output += '\n🛠️  Dev Dependencies\n';
        output += '-------------------\n';
        Object.entries(devDependencies)
            .sort(([a], [b]) => a.localeCompare(b))
            .forEach(([name, version]) => {
                output += `• ${name.padEnd(20)} ${version}\n`;
            });
    }
    
    return output + '\n';
}

async function generateprojectSnapshot() {
    console.log('\n🚀 Starting combined tree and content generation...\n');

    // Step 1: Generate tree structure
    console.log('📁 Generating tree structure...');
    createFileStructureFile(projectRootPath);

    // Step 2: Generate content
    console.log('\n📄 Generating content...');
    const success = printDirectoryContent(projectRootPath);

    // Step 3: Combine the files
    console.log('\n🔄 Combining files...');
    try {
        const treeContent = readFileSync(outputPaths.tree, 'utf8');
        console.log('Successfully read tree content');
        const fileContent = readFileSync(outputPaths.content, 'utf8');
        console.log('Successfully read file content');
        const technologies = findNearestPackageJson(projectRootPath);
        console.log('Successfully found nearest package.json');
        const readmeInfo = findAndParseReadme(isUltimateRoot(projectRootPath));
        console.log('Successfully parsed README.md');
        
        const combinedContent = `# Project Snapshot of ${readmeInfo?.hashA || 'Unknown Project'}

${readmeInfo?.contentA || ''}

## ${readmeInfo?.hashB || 'Description'}
${readmeInfo?.contentB || 'No description available'}

## ${readmeInfo?.hashC || 'Features'}
${readmeInfo?.contentC || 'No features listed'}

This is an automated project snapshot generated for AI assistance.

## Project Context
- Full Path: ${projectRootPath}
- Type: ${getSnapshotType(projectRootPath)}
- Generated: ${new Date().toLocaleString()}

## Important Notes
- This snapshot shows ${getContextDescription(projectRootPath)}
- Files over 2000 lines are truncated
- Binary files and dependencies are excluded

${formatTechnologies(technologies)}
=================================
           FILE TREE
=================================
Directory structure for: ${projectRootPath}

${treeContent}

=================================
         FILE CONTENTS
=================================
File contents for: ${projectRootPath}
Each file is preceded by its full path.

${fileContent}

=================================
       ADDITIONAL NOTES
=================================
- Generated using repository-content-printer
- Node modules and build outputs excluded
- See config.mjs for complete ignore list
`;

        writeFileSync(outputPaths.combined, combinedContent);
        
        console.log('\n✨ Combined file generated successfully!');
        console.log(`📝 Results saved to: ${outputPaths.combined}\n`);
    } catch (error) {
        console.error('❌ Error combining files:', error);
    }
}

// Run the combined generation
generateprojectSnapshot(); 