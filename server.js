var http = require('http');
var url = require('url');
var parsePage = require('./parsePage');
var sendFileSafe = require('./sendFileSafe');
var path = require('path');
var fs = require('fs');
var mongodb = require('mongodb');
var database = require('./database.js');
var ROOT = __dirname + '/public';

var server = new http.Server(function(req, res){
    var parsedUrl = url.parse(req.url, true);
    var pathname = parsedUrl.pathname;

    if(pathname === '/fb' || pathname === '/fb/results') {
        sendFileSafe('index.html', res, ROOT);
    }
    else if(pathname ==='/article'){
        parseArticle(parsedUrl, res);
    }
    else if(pathname === '/sendChanges' && req.method === 'POST'){
        let body = '';
        req.on('readable', function(){
            let piece = req.read();
            if(!piece){
                return;
            }
            body += piece;
        });
        req.on('end', function(){
            try{
                database.addEdit(body, res);
            }catch(e) {
                res.end('Invalid data');
            }
        });
    }
    else if(pathname === '/result'){
            database.findEdits(res);
    }
    else if(pathname === '/update' && req.method === 'POST'){
        let body = '';
        req.on('readable', function(){
            let piece = req.read();
            if(!piece){
                return;
            }
            body += piece;
        });
        req.on('end', function(){
            try{
                database.updateEdit(body, res);
            }catch(e){
                res.statusCode('403');
                res.end('Invalid data');
            }
        });
    }
    else{
        sendFileSafe(pathname, res, ROOT)
    }

}).listen(3000, 'localhost', function(){
    console.log('Listening on http://localhost:3000');
});

function parseArticle(parsedUrl, res){
    let articleURL = parsedUrl.query.url;

    if(!articleURL) {
        res.end('Please, provide article URL');
        return;
    }

    let opt ={
        url: articleURL,
        encoding: 'utf-8',
    };

    try{
        parsePage(res, opt);
    }catch(e){
        res.statusCode = 500;
        res.end("Server can not parse page by this URL");
    }
}



