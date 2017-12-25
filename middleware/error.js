var moment = require('moment');

module.exports.handleError = (err, req, res, next) => {
    var str = "";
    str += "********** Error **********\n";
    str += "Time: " + moment().format('DD-MM-YYYY HH:mm') + "\n";
    str += "Url: " + req.url + "\n";
    
    if (err.logMessage) {
        str += "Log message: " + err.logMessage + "\n";
    }
    
    if (err.error) {
        str += "Error: " + JSON.stringify(err.error) + "\n";
    }
    
    if (err.message) {
        str += "Error: " + JSON.stringify(err.message) + "\n";
    }
    
    if (err.stack) {
        str += "Error stack: " + JSON.stringify(err.stack) + "\n";
    }
    
    console.error(str);
    
    res.status(500);
    res.render('error', {
        message: err.showMessage,
        error: {}
    });
};