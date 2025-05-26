/**
 * Version: 1.0.0
 * Author: Declan Dover
 * Date: 2025-05-19
 * Description: The patient profile is the part of the system where an individual patient’s personal details and
   health records are displayed and can be edited by the patient as well as health professionals.
 */

const { faker } = require('@faker-js/faker'); //importing the faker library to generate random data
// Import the readline module for handling command line input/output

const readline = require('readline');
// Import the fs (filesystem) module for reading/writing files
const fs = require('fs');

/*
// Define the file where tasks will be saved
const FILE = 'patients.json';
// Initialize an empty array to store patients
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
//function to return a random NZ city for creation of the fake patients
function randomNZCity () {
  //create an array of some nz cities
  cities = ['Auckland', 'Christchurch', 'Manukau City', 'Wellington', 'Northcote', 'Hamilton', 'Tauranga', 'Lower Hutt', 'Dunedin', 'Palmerston North', 'Napier',
    'New Plymouth', 'Rotorua', 'Whangarei', 'Invercargill', 'Nelson', 'Gisborne', 'Timaru', 'Blenheim', 'Taupo', 'Cambridge', 'Napier', 'New Plymouth']
  return cities[Math.floor(Math.random() * cities.length)]; //returns a random city from the array
}

function generatePatientProfile() {                                                                         //creates a random patient profile
    return {
        firstName: faker.person.firstName(),                                                                //generates a random first name
        lastName: faker.person.lastName(),                                                                  //generates a random last name
        email: faker.internet.email(),                                                                      //generates a random email address
        phone: faker.phone.number(({ style: 'national' })),                                                 //generates a random phone number
        address: faker.location.streetAddress(),                                                            //generates a random street address
        city: randomNZCity(),                                                                               //generates a random city
        dateOfBirth: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }).toISOString().slice(0, 10),    //generates a random date of birth between 18 and 90 years old and formats it to YYYY-MM-DD
        patientId: faker.string.uuid().slice(0, 8),                                                         //generates a random 8 character Unique ID for the patient ID
        patientMeds: addRandomMeds(),
        patientTestResults : addRandomResults()                                                      
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