const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, '../dist/styles.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

const escapedCSS = cssContent
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\${/g, '\\${');

const distFiles = ['dist/index.js', 'dist/index.mjs'];

distFiles.forEach(file => {
    const filePath = path.join(__dirname, '../', file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf-8');
        content = content.replace('__CSS_PLACEHOLDER__', escapedCSS);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`✅ Injected CSS into ${file}`);
    }
});

console.log('✨ CSS injection complete!');
