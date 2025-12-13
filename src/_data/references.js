const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const referencesPath = path.join(__dirname, 'references')

module.exports = () => {
  return fs.readdirSync(referencesPath)
    .map(file => matter(fs.readFileSync(`${referencesPath}/${file}`, 'utf8')));
};