define({ "api": [
  {
    "type": "get",
    "url": "/api/courses",
    "title": "All courses",
    "description": "<p>Get all info about all courses</p>",
    "name": "GetAllCourses",
    "group": "Courses",
    "version": "0.0.0",
    "filename": "./routes/api/courses.js",
    "groupTitle": "Courses"
  },
  {
    "type": "get",
    "url": "/api/course/:id",
    "title": "Get Course",
    "description": "<p>Get all info about specific course</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Course id, NOTE: the 'external' id is used for code</p>"
          }
        ]
      }
    },
    "name": "GetCourse",
    "group": "Courses",
    "version": "0.0.0",
    "filename": "./routes/api/courses.js",
    "groupTitle": "Courses"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./public/docs/main.js",
    "group": "D__INGINIOUS_TaskManager_public_docs_main_js",
    "groupTitle": "D__INGINIOUS_TaskManager_public_docs_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "http://INGINIOUS_PATH/external",
    "title": "",
    "description": "<p>Send and evaluate a task To see an example and parameters navigate in your browser to http://INGINIOUS_PATH/external</p>",
    "name": "Evaluate",
    "group": "Inginious",
    "version": "0.0.0",
    "filename": "./routes/api/courses.js",
    "groupTitle": "Inginious"
  },
  {
    "type": "post",
    "url": "/api/courses/:id/tasks",
    "title": "Add a task to a course",
    "description": "<p>Add a new task to a course</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Course id, NOTE: the 'external' id is used for code (URL Param)</p>"
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "task",
            "description": "<p>Task object (Request body param)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "run",
            "description": "<p>String of the run file (Request body param)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "template",
            "description": "<p>String of the template file, if any (Request body param)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>The id of the task (will be used in the external grader and the task directory name)</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": true,
            "field": "additionalFiles",
            "description": "<p>array of file objects {name: String, content: String} of additional files in the directory</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Task object:",
          "content": "{\n  \"environment\": cpp/java8scala/default, (default = python2)\n  \"limits\": {\"output\": NumberInMegabytes, \"memory\": NumberInMegabytes, \"time\": TimeoutInSeconds}\n  \"name\": String,\n  \"problems\": {\"id_of_first_prob\": {\"type\": \"code\", \"name\": String, \"header\": String, \"language\": c/cpp/python/java},\n               \"id_of_nth_prob\": {\"type\": \"code\", \"name\": String, \"header\": String, \"language\": c/cpp/python/java}}\n}",
          "type": "json"
        }
      ]
    },
    "name": "AddTaskToCourse",
    "group": "Tasks",
    "version": "0.0.0",
    "filename": "./routes/api/courses.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/api/courses/:id/tasks/:taskId",
    "title": "Get specific task",
    "description": "<p>Get all info about specific task</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Course id, NOTE: the 'external' id is used for code</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "taskId",
            "description": "<p>Task id</p>"
          }
        ]
      }
    },
    "name": "GetTask",
    "group": "Tasks",
    "version": "0.0.0",
    "filename": "./routes/api/courses.js",
    "groupTitle": "Tasks"
  },
  {
    "type": "get",
    "url": "/api/courses/:id/tasks",
    "title": "Get tasks of course",
    "description": "<p>Get detailed task info about specific course</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Course id, NOTE: the 'external' id is used for code</p>"
          }
        ]
      }
    },
    "name": "GetTasksOfCourse",
    "group": "Tasks",
    "version": "0.0.0",
    "filename": "./routes/api/courses.js",
    "groupTitle": "Tasks"
  }
] });
