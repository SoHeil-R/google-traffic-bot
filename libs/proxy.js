const fs = require('fs');

module.exports = function(){
    var porxyList = []
    const path = "./proxy/"
    return new Promise(function(resolve, reject) {
        fs.readdir(path, (e, file) =>{
            if (file.length > 0)
                file.forEach(value => {
                    fs.readFile(path + value, (error, file) =>{
                        var plist = file.toString().split("\n")
                        plist.forEach((p)=>{
                            porxyList.push(p)
                        })
                        resolve(porxyList)
                    })
                });
            else
                resolve([])
        })
    })
}