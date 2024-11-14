import { readdirSync, statSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { projectRootPath, ignorePatterns, outputPaths } from '../config.mjs';

console.log(outputPaths.content);

export function shouldIgnore(path) {
    const normalizedPath = path.toLowerCase();
    
    // Check if the path contains any of the ignore patterns
    return ignorePatterns.some(pattern => {
        // Check if pattern is in the path
        if (normalizedPath.includes(pattern.toLowerCase())) {
            return true;
        }
        
        // Check for file extensions
        if (pattern.startsWith('.') && normalizedPath.endsWith(pattern.toLowerCase())) {
            return true;
        }
        
        return false;
    });
}

export function checkLineCount(filePath) {
    try {
        const content = readFileSync(filePath, 'utf8');
        return content.split('\n').length;
    } catch (error) {
        console.error(`Error checking line count: ${error.message}`);
        return 0;
    }
}

export function appendToFile(contentPrintedPath, newContent) {
    try {
        // Check current line count
        const currentLines = checkLineCount(contentPrintedPath);
        const newLines = newContent.split('\n').length;
        
        // If adding this content would exceed 2000 lines, return false
        if (currentLines + newLines > 2000) {
            console.log('\n📊 Reached 2000 lines limit!');
            console.log(`✨ Processing complete with ${currentLines} lines`);
            console.log('📝 Results saved to: content.txt\n');
            return false;
        }
        
        // Otherwise, append the content and return true
        writeFileSync(contentPrintedPath, newContent, { flag: 'a' });
        return true;
    } catch (error) {
        console.error(`Error appending to file: ${error.message}`);
        return false;
    }
}

export function printDirectoryContent(directoryPath, level = 0) {
    try {
        if (checkLineCount(outputPaths.content) >= 2000) {
            console.log('\n📊 Already at 2000 lines limit!');
            console.log('✨ Processing complete');
            console.log(`📝 Results saved to: ${outputPaths.content}\n`);
            return false;
        }

        // Check if the directory itself should be ignored
        if (shouldIgnore(directoryPath)) {
            console.log(`Skipping ignored directory: ${directoryPath}`);
            return true;
        }

        const files = readdirSync(directoryPath);
        
        // Process files first
        for (const file of files) {
            const filePath = join(directoryPath, file);
            
            // Skip if file should be ignored
            if (shouldIgnore(filePath)) {
                console.log(`Skipping ignored file: ${filePath}`);
                continue;
            }

            const stats = statSync(filePath);
            
            if (stats.isFile()) {
                const header = `\n\n=== File: ${filePath} ===\n`;
                if (!appendToFile(outputPaths.content, header)) {
                    return false;
                }
                
                try {
                    const fileContent = readFileSync(filePath, 'utf8');
                    if (!appendToFile(outputPaths.content, fileContent + '\n')) {
                        return false;
                    }
                    console.log(`✅ Successfully added: ${filePath}`);
                } catch (error) {
                    const errorMsg = `Error reading file: ${error.message}\n`;
                    if (!appendToFile(outputPaths.content, errorMsg)) {
                        return false;
                    }
                    console.error(`❌ Error processing: ${filePath}`);
                }
            }
        }

        // Then process directories
        for (const file of files) {
            const filePath = join(directoryPath, file);
            
            // Skip if directory should be ignored
            if (shouldIgnore(filePath)) {
                console.log(`Skipping ignored directory: ${filePath}`);
                continue;
            }

            const stats = statSync(filePath);
            
            if (stats.isDirectory()) {
                const header = `\n\n=== Directory: ${filePath} ===\n`;
                if (!appendToFile(outputPaths.content, header)) {
                    return false;
                }
                
                if (!printDirectoryContent(filePath, level + 1)) {
                    return false;
                }
            }
        }
        
        return true;
    } catch (error) {
        console.error(`Error processing directory ${directoryPath}: ${error.message}`);
        return false;
    }
}

// Clear the content.txt file before starting
console.log(outputPaths.content);
writeFileSync(outputPaths.content, '');

const projectRoot = projectRootPath;
// Start processing and handle completion
console.log('\n🚀 Starting file processing...\n');

const success = printDirectoryContent(projectRoot);

if (success) {
    const finalLineCount = checkLineCount(outputPaths.content);
    console.log('\n✨ Processing complete!');
    console.log(`📊 Total lines processed: ${finalLineCount}`);
    console.log('📝 Results saved to: content.txt\n');
} else {
    const finalLineCount = checkLineCount(outputPaths.content);
    if (finalLineCount >= 2000) {
        // Don't need to print anything here as the message is already shown
    } else {
        console.log(`✨ Processing complete with ${finalLineCount} lines`);
        console.log('📝 Results saved to: content.txt\n');
    }
}