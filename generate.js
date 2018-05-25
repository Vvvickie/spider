var fs = require("fs");


var divs = [];

fs.readFile('data/1.1编程基础之输入输出.json', function (err, data) {
    if (err) {
        return console.error(err);
    }



    var questions = JSON.parse(data.toString()).questions;

    //console.log(questions);


    questions.map((item,i) =>{

      console.log(item.id);


        var QDescription = '\n    <section class="Q-description">';

        var description = item.description;

        var descriptionItems = description.split("\n");

        //descriptionItems.map((item,i) => {return '<p class="Q-details">'+item+'</p>'});

        for(var i = 0;i<descriptionItems.length;i++){
            descriptionItems[i] = '\n        <p class="Q-details">'+ descriptionItems[i]+ '</p>';
            QDescription += descriptionItems[i];
        }

        var img = item.img;

        if(img){
            QDescription = QDescription + '\n        <img src="imgs/'+img+'" alt="" CLASS="Q1-img">'
        }

        QDescription += '\n    </section>';

        var QInput = '\n    <section class="input">\n' +
            '        <div >\n' +
            '            <h5 class="input-title">输入格式</h5>';

        var inputTipItems = item.inputTip.split('\n');

        for(var i = 0;i<inputTipItems.length;i++){
            inputTipItems[i] = '\n            <p class="input-example">'+ inputTipItems[i] +'</p>';
            QInput += inputTipItems[i];
        }

        QInput += '\n        </div>\n'+'        <div class="input-style">\n' +
            '            <h5 class="input-title">输入样例</h5>';

        var inputExamplesItems = item.inputExample.split('\n');

        for(var i = 0; i<inputExamplesItems.length;i++){
            inputExamplesItems[i] = '\n            <p class="input-example">'+ inputExamplesItems[i] +'</p>';
            QInput += inputExamplesItems[i];
        }

        QInput += '\n        </div>\n' +
            '    </section>';
        //console.log(QInput);

        var QOutput = '\n    <section class="output">\n' +
            '        <div >\n' +
            '            <h5 class="input-title">输出格式</h5>';

        var outputTipItems = item.outputTip.split('\n');

        for(var i = 0;i<outputTipItems.length;i++){
            outputTipItems[i] = '\n            <p class="input-example">'+outputTipItems[i] + '</p>';
            QOutput += outputTipItems[i];
        }

        QOutput += '\n        </div>\n' +
            '        <div class="input-style">\n' +
            '            <h5 class="input-title">输出样例</h5>';

        var outputExampleItems = item.outputExample.split('\n');

        for(var i = 0;i<outputExampleItems.length;i++){
            outputExampleItems[i] = '\n            <p class="input-example">' + outputExampleItems[i] + '</p>';
            QOutput += outputExampleItems[i];
        }

        QOutput += '\n        </div>\n' +
            '    </section>';

        var divItem = '<div class="Q-container">\n' +
            '\n' +
            '    <h3 class="Q-head3">题目描述</h3>'+QDescription+'\n    <h3 class="Q-head3">输入INPUT：'+item.inputStyle+'</h3>'+QInput+'\n    <h3 class="Q-head3">输出OUTPUT：'+item.outputStyle+'</h3>'+QOutput+'\n</div>';
        divs.push(divItem);


    })

    divs.map((divItem,i) =>{
        fs.writeFile('divs/Q'+i+'.txt', divItem,  function(err) {
            if (err) {
                return console.error(err);
            }

        });
    })

});

