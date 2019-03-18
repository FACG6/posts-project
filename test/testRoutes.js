const testFolder = './test';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
  files.forEach((file) => {
    if (file !== 'testRoutes.js') {
      require(`./${file}`);
    }
    return false;
  });
});
