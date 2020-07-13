var fs = require('fs');

function pReadFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', function(err, data) {
            if (err) {
                reject(err);
            };
            resolve(data);
        });
    });
};

pReadFile('./callback-hell/a.txt')
    .then(function(data) {
        console.log(data);
    }, function(err) {
        console.log(err)
    })
    .then(function(data) {
        console.log(data);
        return pReadFile('./callback-hell/c.txt');
    }, function(err) { console.log(err) })
    .then(function(data) {
        console.log(data)
    }, function(err) {
        console.log(err)
    })