var http = require('http')
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var url = "http://noi.openjudge.cn/ch0105/";

var ch = url.split('ch')[1].split('/')[0];


var idList = [];

function getIdLists(url) {

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

                //resolve(idList);

                fs.writeFile('./data/idList'+ch+'.txt', idList,  function(err) {
                    if (err) {
                        return console.error(err);
                    }

                });
            });


        }).on('error', function (err) {
            console.log(err);
        });
    // });
}

getIdLists(url);

// async function test () {
//     let idListanswer = getIdLists(url);
//     console.log(idListanswer);
// }
//
// test();