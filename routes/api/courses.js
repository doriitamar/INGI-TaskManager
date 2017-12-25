'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth').auth;
const request = require('request').defaults({jar: true});
const {promisify} = require('util');
const fs = require('fs');
const mkdir = promisify(require('mkdirp'));
const writeFile = promisify(fs.writeFile);
const moment = require('moment');
const taskCtrl = require('../../controllers/task.ctrl');
const yaml = require('js-yaml');
const runGen = require('run-gen');

/**
 * @api {post} http://INGINIOUS_PATH/external
 * @apiDescription Send and evaluate a task
 * To see an example and parameters navigate in your browser to http://INGINIOUS_PATH/external
 * @apiName Evaluate
 * @apiGroup Inginious
 * 
 */


/**
 * @api {get} /api/courses All courses
 * @apiDescription Get all info about all courses
 * @apiName GetAllCourses
 * @apiGroup Courses
 */
router.get('/', auth, function(req, res) {
  request(`http://${consts.INGI_URL}/api/v0/courses`, (request, response, body) => {
    res.json(JSON.parse(body));
  })
});

/**
 * @api {get} /api/course/:id Get Course
 * @apiDescription Get all info about specific course
 * @apiParam {String} id Course id, NOTE: the 'external' id is used for code
 * @apiName GetCourse
 * @apiGroup Courses
 */
router.get('/:id', auth, function(req, res) {
  request(`http://${consts.INGI_URL}/api/v0/courses/${req.params.id}`, (request, response, body) => {
    res.json(JSON.parse(body));
  });
});

/**
 * @api {get} /api/courses/:id/tasks Get tasks of course
 * @apiDescription Get detailed task info about specific course
 * @apiParam {String} id Course id, NOTE: the 'external' id is used for code
 * @apiName GetTasksOfCourse
 * @apiGroup Tasks
 */
router.get('/:id/tasks', auth, function(req, res) {
  request(`http://${consts.INGI_URL}/api/v0/courses/${req.params.id}/tasks`, (request, response, body) => {
    res.json(JSON.parse(body));
  })
});

/**
 * @api {post} /api/courses/:id/tasks Add a task to a course
 * @apiDescription Add a new task to a course
 * @apiParam {String} id Course id, NOTE: the 'external' id is used for code (URL Param)
 * @apiParam {Object} task Task object (Request body param)
 * @apiParam {String} run String of the run file (Request body param)
 * @apiParam {String} [template] String of the template file, if any (Request body param)
 * @apiParam {String} taskId The id of the task (will be used in the external grader and the task directory name)
 * @apiParam {Array} [additionalFiles] array of file objects {name: String, content: String} of additional files in the directory
 * @apiParamExample {json} Task object:
 *     {
 *       "environment": cpp/java8scala/default, (default = python2)
 *       "limits": {"output": NumberInMegabytes, "memory": NumberInMegabytes, "time": TimeoutInSeconds}
 *       "name": String,
 *       "problems": {"id_of_first_prob": {"type": "code", "name": String, "header": String, "language": c/cpp/python/java},
 *                    "id_of_nth_prob": {"type": "code", "name": String, "header": String, "language": c/cpp/python/java}}
 *     }
 * @apiName AddTaskToCourse
 * @apiGroup Tasks
 */
router.post('/:id/tasks', async (req, res) => {
   // Initiallize task object and convert it to YAML
   let runFile = runGen.generateRun(req.body.run.language, req.body.run.cases, "thecode");
   let task = await taskCtrl.initTask(req.params.id, req.body.task);
   let ymlTask = yaml.safeDump(task);

   // Create the task directory 
   try {
     await mkdir("/var/www/INGInious/tasks/"+req.params.id+"/"+req.body.taskId);
     await writeFile("/var/www/INGInious/tasks/"+req.params.id+"/"+req.body.taskId+"/task.yaml", ymlTask);
     await writeFile("/var/www/INGInious/tasks/"+req.params.id+"/"+req.body.taskId+"/run", runFile);
     
     // If there's a template file
     if(req.body.template) {
      await writeFile("/var/www/INGInious/tasks/"+req.params.id+"/"+req.body.taskId+"/template", req.body.template);
     }

     res.status(201).send("Created task successfully");
   } catch (err) {
     res.status(500).send("Could not create the course directory or either of the run and task files."); 
   } 
});

/**
 * @api {get} /api/courses/:id/tasks/:taskId Get specific task
 * @apiDescription Get all info about specific task
 * @apiParam {String} id Course id, NOTE: the 'external' id is used for code
 * @apiParam {String} taskId Task id
 * @apiName GetTask
 * @apiGroup Tasks
 */
router.get('/:id/tasks/:taskId', auth, function(req, res) {
  request(`http://${consts.INGI_URL}/api/v0/courses/${req.params.id}/tasks/${req.params.taskId}`, (request, response, body) => {
    res.json(JSON.parse(body));
  })
});


module.exports = router;
