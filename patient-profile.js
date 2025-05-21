/**
 * Version: 1.0.0
 * Author: Declan Dover
 * Date: 2025-05-19
 * Description: The patient profile is the part of the system where an individual patient’s personal details and
   health records are displayed and can be edited by the patient as well as health professionals.
 */

const { faker } = require('@faker-js/faker'); //importing the faker library to generate random data
// Import the readline module for handling command line input/output
/*
const readline = require('readline');
// Import the fs (filesystem) module for reading/writing files
const fs = require('fs');
// Define the file where tasks will be saved
const FILE = 'tasks.json';
const FILE2 = 'patients.json';
// Initialize an empty array to store tasks
let patients = [];
let staff = [];
// Check if the tasks.json file exists
if (fs.existsSync(FILE)) {
  try {
    // If file exists, read its contents (synchronously)
    const data = fs.readFileSync(FILE, 'utf8');
    // Parse JSON string into the todos array
    patients = JSON.parse(data);
  } catch (e) {
    // If there is any error, start with an empty array
    patients = [];
  }
}
if (fs.existsSync(FILE2)) {
  try {
    // If file exists, read its contents (synchronously)
    const data = fs.readFileSync(FILE2, 'utf8');
    // Parse JSON string into the todos array
    staff = JSON.parse(data);
  } catch (e) {
    // If there is any error, start with an empty array
    staff = [];
  }
}
*/
function generatePatientProfile() { //creates a random patient profile
    return {
        name: faker.person.fullName(), //generates a random full name
        email: faker.internet.email(), //generates a random email address
        phone: faker.phone.number(), //generates a random phone number
        address: faker.location.streetAddress(), //generates a random street address
        city: faker.location.city(), //generates a random city
        dateOfBirth: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }), //generates a random date of birth between 18 and 90 years old
        patientId: faker.string.uuid(), //generates a random Unique ID for the patient ID
    };
    }
    function createDataSet(size) { //creates a dataset of random patient profiles
        const dataSet = [];
        for (let i = 0; i < size; i++) {
            dataSet.push(generatePatientProfile());
        }
        return dataSet;
    }
    const dataSet = createDataSet(100); //creates a dataset of 100 random patient profiles
    console.log('Data Set:', dataSet);
    console.log(dataSet[4].city); //prints the city of the 5th patient profile in the dataset