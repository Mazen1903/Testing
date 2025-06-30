const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

// Add support for .cjs files (required for Firebase v11+)
defaultConfig.resolver.sourceExts.push('cjs');

// Disable package exports (helps with Firebase compatibility)
defaultConfig.resolver.unstable_enablePackageExports = false;

module.exports = defaultConfig; 