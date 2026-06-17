const fs = require('fs');

const file = fs.readFileSync('src/components/VoiceRoom.tsx', 'utf8');

const sIdx = file.indexOf('function VoiceRoomControls');
const eIdx = file.indexOf('      {/* All Listeners Bottom Sheet */}');

const chunk = file.substring(sIdx, eIdx);

const withCall = file.slice(0, sIdx) + '      <VoiceRoomControls room={room} atmColor={atmColor} />\n\n' + file.slice(eIdx);

const mainIdx = withCall.indexOf('function MainRoom');

const finalCode = withCall.slice(0, mainIdx) + chunk + '\n\n' + withCall.slice(mainIdx);

fs.writeFileSync('src/components/VoiceRoom.tsx', finalCode);
console.log('done');
