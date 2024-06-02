const fs = require('fs');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf8', (err, studentsData) => {
            if (err) {
                reject("unable to read students.json");
                return;
            }
            let students = JSON.parse(studentsData);

            fs.readFile('./data/courses.json', 'utf8', (err, coursesData) => {
                if (err) {
                    reject("unable to read courses.json");
                    return;
                }
                let courses = JSON.parse(coursesData);

                dataCollection = new Data(students, courses);
                resolve();
            });
        });
    });
}

function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("no results returned");
        }
    });
}

function getTAs() {
    return new Promise((resolve, reject) => {
        if (dataCollection) {
            let TAs = dataCollection.students.filter(student => student.TA === true);
            if (TAs.length > 0) {
                resolve(TAs);
            } else {
                reject("no results returned");
            }
        } else {
            reject("data not initialized");
        }
    });
}

function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("no results returned");
        }
    });
}

module.exports = { initialize, getAllStudents, getTAs, getCourses };
