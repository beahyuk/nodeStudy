var fs = require('fs');

fs.readFile('a.txt', 'utf-8', function(err, data) {
    if (err) {
        // return console.log(err);
        throw err
    };
    console.log(data);
    fs.readFile('b.txt', 'utf-8', function(err, data) {
        if (err) {
            return console.log(err);
        };
        console.log(data);
        fs.readFile('c.txt', 'utf-8', function(err, data) {
            if (err) {
                return console.log(err);
            };
            console.log(data)
        });
    });
});