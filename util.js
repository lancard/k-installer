const fs = require('fs');
const https = require('https');

const randomString = (length) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';

    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
};

const downloadFile = (filename, url, callback) => {
    const oldPath = randomString(32);
    const file = fs.createWriteStream(oldPath);
    https.get(url, function (response) {
        response.pipe(file);

        // after download completed close filestream
        file.on("finish", () => {
            file.close();
            fs.renameSync(oldPath, filename);
            console.log(`Download Completed: ${filename} <- ${url}`);
            callback(filename, url);
        });
    });
};

module.exports = {
    randomString,
    downloadFile
};