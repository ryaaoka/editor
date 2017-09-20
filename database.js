var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/bezvozyuk_project';


exports.findEdits = function(res) {
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var findDocuments = function(db, callback) {
            // Get the documents collection
            var collection = db.collection('edits');

            // Find documents
            collection.find({isApproved:false}).toArray((function(err, docs) {
                assert.equal(err, null);
                callback(docs);
            }));
        }

        findDocuments(db, function(docs){
            db.close();
            res.end(JSON.stringify(docs));
        });
    });
};

exports.addEdit= function(data, res){
        try {
            data = JSON.parse(data);
        }catch(e){
            throw e;
        }

        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            var insertDocuments = function (db, callback) {
                // Get the documents collection
                var collection = db.collection('edits');

                // Insert documents
                collection.insertMany([
                    {
                        articleURL: data.articleURL,
                        originalText: data.originalText,
                        usersText: data.usersText,
                        isApproved: false
                    }
                ], function (err, result) {
                    assert.equal(err, null);
                    assert.equal(1, result.result.n);
                    assert.equal(1, result.ops.length);
                    console.log("Inserted 1 document into the document collection");
                    callback();
                });
            };

            insertDocuments(db, function(){
                db.close();
                res.end('Data received');
            });
        });
};

exports.updateEdit = function(data, res){
    try {
        data = JSON.parse(data);
    }catch(e){
        throw e;
    }

    var ObjectId = require('mongodb').ObjectId;
    var id = ObjectId(data.id);

    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        if (data.isApproved == false) {
            deleteDocument(db, function(){
                db.close();
                res.statusCode = 200;
                res.end('Succesfully removed');
                return;
            })
        }

        updateDocument(db, function(){
            db.close();
            res.statusCode = 200;
            res.end('Succesfully updated');
            return;
        });
    });


    var updateDocument = function(db, callback) {
        var collection = db.collection('edits');

        collection.updateOne({ _id : id }
            , { $set: { isApproved : true } }, function(err, result) {
                console.log("Updated the document");
                callback(result);
            });
    };

    var deleteDocument = function(db, callback) {
        var collection = db.collection('edits');

        collection.deleteOne({ _id : id }, function(err, result) {
            console.log("Removed the document");
            callback(result);
        });
    }
};

