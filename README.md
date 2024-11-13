# Repository Content Printer

A Node.js utility that recursively traverses directories and creates a single content.txt file containing the contents of all relevant files, while respecting common gitignore patterns and maintaining a 2000-line limit.

## Features

- 📁 Recursively processes directories and files
- 🚫 Automatically skips common development artifacts (similar to .gitignore)
- ⚡ Processes upper-level files before diving into subdirectories
- 📊 Enforces a 2000-line limit on output
- 💡 Smart file filtering (ignores binaries, logs, temp files, etc.)
- 📝 Creates a single consolidated output file
- ✨ Progress indicators and completion status

## Installation

1. Clone the repository:

```
git clone https://github.com/mollybeach/repositoryContentPrinter.git
cd repositoryContentPrinter
```

## Usage

1. Modify the `projectRoot` variable in `repositoryContentPrinter.mjs` to point to your target directory:

```
const projectRoot = '../dandelionCoiffure/docs';
```

2. Run the script:

```
node repositoryContentPrinter.mjs
```

3. Check the generated `content.txt` file in the same directory as the script.

## Output Format

The generated content.txt file follows this structure:

```
ext
=== File: /path/to/file1.ext ===
[content of file1]
=== Directory: /path/to/directory ===
=== File: /path/to/directory/file2.ext ===
[content of file2]
```

## Ignored Patterns

The script automatically ignores common development files and directories, including:
- Dependencies (node_modules, bower_components, etc.)
- Build outputs (dist, build, etc.)
- Environment files (.env, .secret, etc.)
- IDE files (.vscode, .idea, etc.)
- Logs and temporary files
- Compiled binaries
- Package files
- Database files
- And more...

## Console Output

The script provides real-time feedback:
- 🚀 Start of processing
- ✅ Successfully processed files
- ❌ Error notifications
- 📊 Line count updates
- ✨ Completion status

## Limitations

- Maximum output of 2000 lines
- Text files only (binary files are ignored)
- Files must be UTF-8 encoded

## Error Handling

The script includes comprehensive error handling for:
- File reading errors
- Directory access issues
- Line limit exceeded
- Invalid file encodings

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT

## Author

@mollybeach