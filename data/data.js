
const cj = require('fs');

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }

    async loadJSON(filePath) {
        try {
          const response = await fetch(filePath);
          if (!response.ok) {
            throw new Error(`Could not load ${filePath}: ${response.statusText}`);
          }
          return await response.json();
        } catch (error) {
          console.error(`Failed to load JSON file: ${filePath}`, error);
        }
      }
    
      async loadData() {
        try {
          const coursesData = await this.loadJSON('courses.json');
          const studentsData = await this.loadJSON('students.json');
    
          if (coursesData) {
            this.courses = coursesData.courses;
          }
          if (studentsData) {
            this.students = studentsData.students;
          }
        } catch (error) {
          console.error('Error loading data:', error);
        }
      }
    
      getcourses() {
        return this.courses;
      }
    
      getstudents() {
        return this.students;
      }
      
}

console.log('Courses:', dataLoader.getusers());
console.log('Students:', dataLoader.getstudents());
