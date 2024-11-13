export const ignorePatterns = [
    // Dependencies
    'node_modules', 'bower_components', 'jspm_packages', 'package-lock.json', 'yarn.lock',
    // Build outputs
    'dist', 'build', 'out', '.min.js', '.min.css',
    // Environment and secrets
    '.env', '.pem', '.secret',
    // IDE and Editor files
    '.idea', '.vscode', '.swp', '.swo', '.DS_Store', 'Thumbs.db', '.project', '.classpath', 
    '.sublime-workspace', '.sublime-project',
    // Logs
    'logs', '.log', 'npm-debug.log', 'yarn-debug.log', 'yarn-error.log',
    // Testing and Coverage
    'coverage', '.nyc_output', '.jest', '__tests__',
    // Temp files
    'tmp', 'temp', '.temp', '.tmp',
    // Compiled files
    '.com', '.class', '.dll', '.exe', '.o', '.so',
    // Package files
    '.7z', '.dmg', '.gz', '.iso', '.jar', '.rar', '.tar', '.zip',
    // Database
    '.sqlite', '.db',
    // Mobile
    '.gradle', 'local.properties', '.apk', '.aab', '.ipa',
    // Python
    '__pycache, __pycache__', '.py[cod]', '.Python', 'env', 'venv', 'pip-log.txt',
    // Ruby
    '.gem', '.bundle', 'vendor',
    // OS specific
    '.DS_Store', '.AppleDouble', '.LSOverride', 'Icon', '._',
    'Thumbs.db', 'ehthumbs.db', 'Desktop.ini',
    // Git files
    '.git',
    '.gitignore',
    '.gitattributes',
    '.gitmodules',
    '.github',
    '.gitlab',
    '.gitkeep',

    // Package managers and dependencies
    'node_modules',
    'bower_components',
    'jspm_packages',
    'package-lock.json',
    'yarn.lock',
    'vendor',

    // Build and output directories
    'dist',
    'build',
    'out',
    '.min.js',
    '.min.css',

    // Deployment directories
    'deployment',
    '.deploy',
    '.kubernetes',
    '.k8s',
    'helm',
    'terraform',
    '.terraform',

    // Environment and configuration
    '.env',
    '.pem',
    '.secret',

    // IDE and editor files
    '.idea',
    '.vscode',
    '.swp',
    '.swo',
    '.DS_Store',
    'Thumbs.db',

    // Logs and coverage
    'logs',
    '.log',
    'coverage',
    '.nyc_output',

    // Temporary files
    'tmp',
    'temp',
    '.temp',
    '.tmp',

    // Python specific
    'python3.9',
    'site-packages',
    'env',
    '__pycache__',
    'lib',
    'include',
    'bin',
    'migrations',
    'python3',

    // Localization and static
    'LC_MESSAGES',
    'locale',
    'static',

    // Package files
    'package.json', 
    'package-lock.json',
    'yarn.lock',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',

    // License
    'LICENSE.txt',
    'LICENSE',
    'LICENSE.md',
    'LICENSE.markdown',

    // Readme
    'README.md',
    'README.txt',
    'README',

    // Procfile
    'Procfile',

    // Latest dump
    'latest.dump',
    '.dump',

    // Runtime
    'runtime.txt',

    // Txt
    '.txt',
];