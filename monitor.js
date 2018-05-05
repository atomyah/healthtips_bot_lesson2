var https = require('https');

module.exports = function (context, myTimer) {

function checkAlive() {
    var URL = 'https://healthtipsbot.azurewebsites.net/'

    // httpsでリクエスト送信
    var req = https.request(URL, function (res) {
        var code = res.statusCode;
        if (code != 200) {  // 200番正常レスポンス以外の場合
            var message = "\n*【未病状態】* \n" + URL + " looks no good condition.\n- STATUS CODE " + code;
            context.log(message);
        }
        else{   // 正常な場合
            var message = URL + " : " + code;
            context.log(message);
            context.done();
        }
    });
    req.on('error', function (error) {  // エラー
        var message = "\n*【危篤状態】* \n" + URL + " is not been reached packets.";
        message += "\n - ERROR MESSAGE : " + error.message + "\n";
        context.log(message);
        context.done();
    });
    req.end();
}

checkAlive();


};
