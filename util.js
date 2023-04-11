const fs = require('fs');
const request = require('request');
const progress = require('request-progress');

const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

const downloadFile = (filename, url, callback, progressCallback) => {
    const oldPath = randomString(32);
    const file = fs.createWriteStream(oldPath);

    // The options argument is optional so you can omit it
    progress(request(url), {
        // throttle: 2000,                    // Throttle the progress event to 2000ms, defaults to 1000ms
        // delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms
        // lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length
    })
        .on('progress', function (state) {
            if (progressCallback)
                progressCallback(state);
        })
        .on('error', function (err) {
            console.error(err);
            // Do something with err
        })
        .on('end', function () {
            file.close();
            fs.renameSync(oldPath, filename);
            callback(filename, url);
        })
        .pipe(file);
};

module.exports = {
    randomString,
    downloadFile
};