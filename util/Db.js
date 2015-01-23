/**
 * Created by Administrator on 2015/1/19.
 */
var mongo=require("mongodb");
var host="localhost";
var port=mongo.Connection.DEFAULT_PORT;
var server=new mongo.Server(host,port,{auto_reconnect:true});//创建数据库所在的服务器服务器
var db=new mongo.Db("test",server,{safe:true});//创建数据库对象

module.exports = db;