/**
 * Created by Administrator on 2015/1/18.
 */
var db = require('../util/Db');
var ObjectID = require('mongodb').ObjectID;
var conf = require('../util/conf');

function getUsersByPageNum(pageNum,callBack){
    db.open(function(err,db){
        if(err){
            console.log(err);
        }else{
            db.collection("user",function(err,collection){
                collection.find({}).limit(conf.pageSize).skip((pageNum-1)*conf.pageSize).toArray(function(err,docs){
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}
function getUserById(uid,callBack){
    db.open(function(err,db){
        if(err){
            console.log(err);
        }else{
            db.collection("user",function(err,collection){
                collection.find({_id:new ObjectID(uid)}).toArray(function(err,docs){
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}
function getUserByName(username,callBack){
    db.open(function(err,db){
        if(err){
            console.log(err);
        }else{
            db.collection("user",function(err,collection){
                collection.find({'username':username}).toArray(function(err,docs){
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}
function getUserByNameAndPass(option,callBack){
    db.open(function(err,db){
        if(err){
            console.log(err);
        }else{
            db.collection("user",function(err,collection){
                collection.find({'username':option.username,'password':option.password}).toArray(function(err,docs){
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}
function addUser(option,callBack){
    db.open(function (err,db) {//连接数据库
        if(err){
            console.log(err);
        }else{
            db.collection("user", function (err,collection) {
                collection.insert({username:option.username,password:option.password,email:option.email}, function (err,docs) {
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}

exports.getUsersByPageNum = getUsersByPageNum;
exports.getUserByName = getUserByName;
exports.addUser = addUser;
exports.getUserByNameAndPass = getUserByNameAndPass;
exports.getUserById = getUserById;
