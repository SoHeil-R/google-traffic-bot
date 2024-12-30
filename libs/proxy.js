const fs = require('fs');

module.exports = function () {
    const proxyList = []; // Fixed typo: changed 'porxyList' to 'proxyList'
    const path = "./proxy/";

    return new Promise(function (resolve, reject) {
        fs.readdir(path, (err, files) => {
            if (err) {
                console.error("Error reading directory:", err);
                return resolve([]); // Resolve with an empty array on error
            }

            if (files && files.length > 0) {
                let pendingFiles = files.length; // Track the number of pending reads
                files.forEach((fileName) => {
                    fs.readFile(`${path}${fileName}`, 'utf8', (error, data) => {
                        if (error) {
                            console.error("Error reading file:", error);
                        } else {
                            const plist = data.toString().split("\n"); // Split file content by newlines
                            proxyList.push(...plist); // Add all proxies to the proxyList
                        }

                        // Decrement pending files and resolve when all files are processed
                        pendingFiles--;
                        if (pendingFiles === 0) {
                            resolve(proxyList);
                        }
                    });
                });
            } else {
                resolve([]); // Resolve with an empty array if no files are in the directory
            }
        });
    });
};
