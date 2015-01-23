/**
 * Created by Administrator on 2015/1/18.
 */
var db = require('../util/Db');
var conf = require('../util/conf');

function getUserBlogByPageNum(option,callBack){
    db.open(function(err,db){
        if(err){
            console.log(err);
        }else{
            db.collection("blog",function(err,collection){
                collection.find({'uid':option.uid}).sort({createTime:-1}).limit(conf.pageSize).skip((option.pageNum-1)*conf.pageSize).toArray(function(err,docs){
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}
function getBlogByPageNum(pageNum,callBack){
    db.open(function(err,db){
        if(err){
            console.log(err);
        }else{
            db.collection("blog",function(err,collection){
                collection.find({}).sort({createTime:-1}).limit(conf.pageSize).skip((pageNum-1)*conf.pageSize).toArray(function(err,docs){
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}
function addBlog(option,callBack){
    db.open(function (err,db) {//连接数据库
        if(err){
            console.log(err);
        }else{
            db.collection("blog", function (err,collection) {
                collection.insert({title:option.title,content:option.content,uid:option.uid,uname:option.uname,createTime:option.createTime}, function (err,docs) {
                    db.close();
                    callBack(err,docs);
                });
            });
        }
    });
}

exports.getUserBlogByPageNum = getUserBlogByPageNum;
exports.addBlog = addBlog;
exports.getBlogByPageNum = getBlogByPageNum;