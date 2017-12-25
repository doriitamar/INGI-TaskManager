const {promisify} = require('util');
const r = require('request')
const request = promisify(r);

module.exports.initTask = async (courseId, task) => {
    task.author = "";
    task.context = "";
    task.evaluate = "best";
    task.stored_submissions = 0;
    task.submission_limit = {amount: -1, period: -1};
    task.weight = 1.0;
    
    // Get order
    let {body} = await request("http://localhost:1269/api/courses/"+courseId+"/tasks");
    task.order = (JSON.parse(body)).length;

    return task;
}

