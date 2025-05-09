import { join } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Edit this path to the root of the project you want to scan
export const projectRootPath = '../../branch/neuronet-consensus';

const __dirname = dirname(fileURLToPath(
    import.meta.url));

export const outputPaths = {
    content: join(__dirname, 'output', 'contentPrinted.txt'),
    tree: join(__dirname, 'output', 'treePrinted.txt'),
    combined: join(__dirname, 'output', 'projectSnapshotPrinted.txt')
};

// Ignore Patterns
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
    // 'lib',
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
    /*
    'README.md',
    'README.txt',
    'README',*/

    // Procfile
    'Procfile',

    // Latest dump
    'latest.dump',
    '.dump',

    // Runtime
    'runtime.txt',

    // Txt
    '.txt',

    'i18n/',

    // webpack
    'webpack',

    // next
    'next',
    'next-env.d.ts',
    'next-env.d.ts.map',
    'next-env.d.ts.map.json',
    'next-env.d.ts.map.json.map',
    'next-env.d.ts.map.json.map.json',

    // tailwind
    'tailwind.config.js',
    'postcss.config.js',
    'tailwind.config.ts',
    'tailwind.config.ts.map',
    'tailwind.config.ts.map.json',
    'tailwind.config.ts.map.json.map',

    // tsconfig
    'tsconfig.json',
    'tsconfig.app.json',
    'tsconfig.tsbuildinfo',
    'tsconfig.tsbuildinfo.json',
    'tsconfig.tsbuildinfo.json.map',
    'tsconfig.tsbuildinfo.json.map.json',

    // edgedb
    'edgedb.toml',
    'edgeql-js.d.ts',
    'edgedb.toml',
    'edgedb.toml.map',
    'edgedb.toml.map.json',
    'edgedb.toml.map.json.map',
    'migrations',
    'edgeql-js',
    'route_client-reference-manifest.js',
    'DS_Store',
    '.next',

    'public',
    'tailwind.config.js',
    'tsconfig.app.json',
    'tsconfig.json',
    'tsconfig.tsbuildinfo',
    'pnpm-lock.yaml',
    'pnpm-workspace.yaml',
    'postcss.config.js',
    '.yarn',
    'node_modules',
    'package-lock.json',
    'yarn.lock',
    'tsconfig.json',
    'tsconfig.app.json',
    '.yarn/',
    'unplugged/',
    'unplugged/node_modules/',
    'unplugged/node_modules/@img-sharp-darwin-arm64-npm-0.33.5-c319591c53/',
    'unplugged/node_modules/@img-sharp-darwin-arm64-npm-0.33.5-c319591c53/node_modules/',
    'unplugged/node_modules/@img-sharp-darwin-arm64-npm-0.33.5-c319591c53/node_modules/core-js/',
    'unplugged/node_modules/@img-sharp-darwin-arm64-npm-0.33.5-c319591c53/node_modules/core-js/library/',

    '/release',
    '.fingerprint',
    'fingerprint.txt',
    'fingerprint.json',
    'fingerprint.js',
    'fingerprint.ts',
    'fingerprint.d.ts',
    'fingerprint.d.ts.map',
    'fingerprint.d.ts.map.json',
    'release',
    'release.txt',
    'release.json',
    'release.js',
    'release.ts',
    'release.d.ts',
    'release.d.ts.map',
    'release.d.ts.map.json',
    'deps',
    'deps.json',
    'deps.js',
    'deps.ts',
    'deps.d.ts',
    'deps.d.ts.map',
    'deps.d.ts.map.json',
    '.o',
    '.o.d.ts',
    '.o.d.ts.map',
    '.o.d.ts.map.json',
    '.o.json',
    '.o.js',
    '.o.ts',
    'incremental',
    'incremental.json',
    'incremental.js',
    'incremental.ts',
    'incremental.d.ts',
    'incremental.d.ts.map',
    'incremental.d.ts.map.json',
];