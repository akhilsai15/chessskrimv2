const fs = require('fs');
let file = fs.readFileSync('src/components/VeilSettings.tsx', 'utf8');
file = file.replace(/className={\\`([^`]+)\\`}/g, 'className={`$1`}');
fs.writeFileSync('src/components/VeilSettings.tsx', file);
