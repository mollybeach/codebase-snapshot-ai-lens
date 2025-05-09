# Codebase Snapshot AI Lens

A Node.js utility for generating comprehensive project documentation snapshots optimized for AI assistance. This tool analyzes repository content, creates file listings, and generates detailed project snapshots while respecting common gitignore patterns

## Description
This project provides a powerful tool for developers to generate detailed documentation snapshots of their repositories, specifically designed to share codebase context with AI assistants. It recursively analyzes project structures, creates file listings, and generates comprehensive project snapshots while respecting common gitignore patterns and maintaining configurable limits. The generated snapshots are formatted to provide AI models with clear, structured insights into your codebase.

## Features

### Content Analysis
- 📄 Creates a consolidated file containing all project content
- 📊 Enforces a 2000-line limit on output
- 🚫 Skips binary files and common development artifacts
- ✨ Provides real-time processing feedback

### Directory Structure
- 🌳 Generates visual directory structure trees
- 📁 Shows hierarchical file organization
- 🔍 Supports custom ignore patterns
- 🎯 Creates clean, formatted output

### Project Documentation
- 📸 Creates comprehensive project snapshots
- 📝 Extracts project documentation from README
- 🛠️ Lists project dependencies and technologies
- 🔄 Combines tree structure and content into one view

## Installation

1. Clone the repository:
```bash
git clone https://github.com/mollybeach/project-snapshot-printer.git
cd project-snapshot-printer
```

## Usage

Generate a complete project snapshot:
```bash
node repo-scanners/projectSnapshotPrinter.mjs
```

## Configuration

Modify `config.mjs` to customize:
- Project root path
- Output file locations
- Ignore patterns
- Line limits

## Output Files

The tool generates three main output files in the `output` directory:
- `contentPrinted.txt`: Full content of all processed files
- `treePrinted.txt`: Visual directory structure
- `projectSnapshotPrinted.txt`: Combined project snapshot

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Author

@mollybeach

## Project Structure

```
./project-snapshot-printer/
├── .git/
├── output/
│   ├── contentPrinted.txt
│   ├── projectSnapshotPrinted.txt
│   └── treePrinted.txt
├── repo-scanners/
│   ├── contentPrinter.mjs
│   ├── projectSnapshotPrinter.mjs
│   └── treePrinter.mjs
├── .DS_Store
├── config.mjs
└── README.md

```
