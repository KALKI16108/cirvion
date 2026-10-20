const https = require('https');

function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch(e) {
          resolve(data);
        }
      });
    }).on('error', reject);
  });
}

async function run() {
  const cat = await get('https://raw.githubusercontent.com/ards-project/ard-spec/main/spec/schemas/ai-catalog.schema.json');
  console.log('AI Catalog Root Properties:', Object.keys(cat.properties));
  console.log('AI Catalog $defs keys:', Object.keys(cat.$defs || {}));
  console.log('catalogEntry schema:');
  console.log(JSON.stringify(cat.$defs ? cat.$defs.catalogEntry : 'no $defs', null, 2));

  const ardManifest = await get('https://raw.githubusercontent.com/ards-project/ard-spec/main/spec/schemas/ard-manifest.schema.json');
  console.log('\nard-manifest.schema.json:');
  console.log(JSON.stringify(ardManifest, null, 2).substring(0, 1500));
}

run();
