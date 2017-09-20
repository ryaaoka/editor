var fs = require('fs');
var path = require('path');

module.exports = function (filePath, res, root){
    try{
        filePath = decodeURIComponent(filePath);
    }catch(e){
        res.statusCode = 400;
        res.end("Bad request");
        return;
    }

    if(~filePath.indexOf('\0')){
        res.statusCode = 400;
        res.end("Bad request");
        return;
    }

    ROOT = path.normalize(root);
    filePath = path.normalize(path.join(ROOT, filePath));
    if (filePath.indexOf(ROOT) !== 0){
        res.statusCode = 404;
        res.end("File not found");
        return;
    }
    fs.stat(filePath, function(err, stats){
        if(err || !stats.isFile()){
            res.statusCode = 404;
            res.end("File not found");
            return;
        }
        sendFile(filePath, res);
    });

    function sendFile(filePath, res){
        fs.readFile(filePath, function(err, content){
            if(err){
                throw(err);
            }
            var MimeLookup = require('mime-lookup');
            var mime = new MimeLookup(require('mime-db')).lookup(filePath);
            res.setHeader('Content-Type', mime+'; charset=utf-8');
            res.end(content);
        });
    }

}

