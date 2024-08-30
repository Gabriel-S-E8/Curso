const fs = require('fs'); // File system

fs.readFile('arquivi.txt', 'utf8', (err, data) => {

    if (err) {
        console.error(err);
        return;
    }
    console.log(data);

})

