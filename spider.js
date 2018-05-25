var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var url = "http://noi.openjudge.cn/ch0112/01/";

var idList = ['01','02','03','04','05','06','07','08','09','10'];
//初始url

var questions =[];

var index = 1;

function fetchPage(x) {
    //封装了一层函数
    startRequest(x);

}


function startRequest(x) {



    //采用http模块向服务器发起一次get请求
    http.get(x, function (res) {




        var html = '';        //用来存储请求网页的整个html内容
        res.setEncoding('utf-8'); //防止中文乱码
        //监听data事件，每次取一块数据
        res.on('data', function (chunk) {
            html += chunk;
        });
        //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
        res.on('end', function () {

            var $ = cheerio.load(html,{decodeEntities: false}); //采用cheerio模块解析html

            var id = $('.problem-statistics dl dd:nth-of-type(1)').text();

            var category = $('.contest-title-tab h2:nth-of-type(2)').text();

            var title = $('#pageTitle H2:nth-of-type(1)').text();

            var timeLimited = $('.problem-params dd:nth-of-type(1)').text();

            var spaceLimited = $('.problem-params dd:nth-of-type(2)').text();

            var description = $('.problem-content dd:nth-of-type(1)').html();

            console.log(id);

            var img =  $('.problem-content img');

            var inputTip = $('.problem-content dd:nth-of-type(2)').text();


            var inputStyle = $('.problem-content dt:nth-of-type(2)').text();

            var outputTip = $('.problem-content dt:nth-of-type(3)').text();

            var outputStyle = $('.problem-content dd:nth-of-type(3)').text();

            var inputExample = $('.problem-content dd:nth-of-type(4)').html();

            var outputExample = $('.problem-content dd:nth-of-type(5)').html();

            var tip = $('.problem-content dd:nth-of-type(6)').text();

            // if(img === undefined){
            //     img = "";
            // }


            var question_item = {

                id:id,
                category:category,
                title:title,
                description:description,
                img:"",
                inputTip:inputTip,
                inputStyle:inputStyle,
                outputTip:outputTip,
                outputStyle:outputStyle,
                inputExample:inputExample,
                outputExample:outputExample,
                tip:tip,
                timeLimited:timeLimited,
                spaceLimited:spaceLimited
            };


            //savedContent($, question_item.category)

            if(img[0]){savedImg($,category,question_item.id);}

            questions.push(question_item);

            //console.log(question_item.id);

            if(idList.length>1) {
                index++;

                var indexstr;

                if (index === 0) {

                    savedContent($, category, questions);
                } else if (index < idList.length) {
                    indexstr = idList[index - 1].toString();
                }
                else if (index === idList.length) {
                    indexstr = idList[index - 1].toString();
                    index = -1;
                }

                var nextLink = "http://noi.openjudge.cn/ch0112/" + indexstr + '/';


                if (index != 0) {
                    console.log(nextLink);
                    fetchPage(nextLink);
                }
            }
            else if(idList.length === 1){
                savedContent($, category, questions);
            }


        });

    }).on('error', function (err) {
        console.log(err);
    });

}

function savedContent($, category,questions) {

    //console.log(questions);

    fs.writeFile('./data/'+category+'.json', JSON.stringify(questions,null,2),  function(err) {
        if (err) {
            return console.error(err);
        }

    });


}

//该函数的作用：在本地存储所爬取到的图片资源
function savedImg($, category,id) {

    $('.problem-content img').each(function (index, item) {

        var img_filename = 'Q'+ id +'_'+ index+ '.jpg';

        var img_src = item.attribs.src; //获取图片的url

        if(img_src){

//采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        request(img_src).pipe(fs.createWriteStream('./image/'+img_filename));}     //通过流的方式，把图片写到本地/image目录下，并用新闻的标题和图片的标题作为图片的名称。
    })
}
fetchPage(url);