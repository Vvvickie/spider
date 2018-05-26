var http = require('http')
var fs = require('fs');
var cheerio = require('cheerio');

var url = "http://noi.openjudge.cn/ch0105/";

var ch = url.split('ch')[1].split('/')[0];

var idList = [];


exports.getIdLists = function(url) {

        var p = new Promise(function(resolve, reject) {
            http.get(url, function (res) {

                var html = '';        //用来存储请求网页的整个html内容
                res.setEncoding('utf-8'); //防止中文乱码
                //监听data事件，每次取一块数据
                res.on('data', function (chunk) {
                    html += chunk;
                });

                res.on('end', function () {

                    var $ = cheerio.load(html);

                    $('.problem-id a').map((index, item) => {
                        idList.push(item.children[0].data);

                    });
                    //传回idList
                    resolve(idList);
                });

            }).on('error', function (err) {
                console.log(err);
            });
        });

        return p;

}

//getIdLists(url);


