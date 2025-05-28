/**
 * Version: 1.0.0
 * Author: Declan Dover
 * Date: 2025-05-19
 * Description: The patient profile is the part of the system where an individual patient’s personal details and
   health records are displayed and can be edited by the patient as well as health professionals.
 */

/* This section of code imports the required packages and creates the empty patient array and json file
*/

const { faker } = require('@faker-js/faker'); //importing the faker library to generate random data
const readline = require('readline'); // Import the readline module for handling command line input/output
const fs = require('fs'); // Import the fs (filesystem) module for reading/writing files
const FILE = 'patients.json';// Define the file where patients will be saved
let patients = []; // Initialize an empty array to store patients
let patientsByLastName = []; //initialize an empty array to temporarily store patient lists defined by last name
let patientsByFirstName = []; //initialize an empty array to temporarily store patient lists defined by first name
let patientsByCity = []; //initialize an empty array to temporarily store patient lists defined by city
// Create a readline interface for user input and output
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
// Check if the tasks.json file exists
if (fs.existsSync(FILE)) {
  try {
    // If file exists, read its contents (synchronously)
    const data = fs.readFileSync(FILE, 'utf8');
    // Parse JSON string into the todos array
    patients = JSON.parse(data);
  } catch (e) {
    // If there is any error, start with a new set of random patients
    patients = [];
  }
}

/* This section of code creates a set of 200 patients with randomly generated information and stores them with a json file
the size of the dataset can be changed */

patients = []; //resets to an empty patients array
patients.push(...createDataSet(200)); //adds 100 generated patients to the patients array
function savePatients() {         // writes the patients array to the patients.json file
  fs.writeFileSync(FILE, JSON.stringify(patients, null, 2)); // Pretty-print with 2-space indentation
}
savePatients(); //executes savePatients to write the array to the patients.json file
function randomNZCity () {    //function to return a random NZ city for creation of the fake patients
  //create an array of some nz cities
  cities = ['Auckland', 'Christchurch', 'Manukau City', 'Wellington', 'Northcote', 'Hamilton', 'Tauranga', 'Lower Hutt', 'Dunedin', 'Palmerston North', 'Napier',
    'New Plymouth', 'Rotorua', 'Whangarei', 'Invercargill', 'Nelson', 'Gisborne', 'Timaru', 'Blenheim', 'Taupo', 'Cambridge', 'Napier', 'New Plymouth']
  return cities[Math.floor(Math.random() * cities.length)]; //returns a random city from the array
}
function generatePatientProfile() {                                                                         //creates a random patient profile
    return {
        firstName: faker.person.firstName().slice(0, 11),                                                   //generates a random first name
        lastName: faker.person.lastName().slice(0, 11),                                                     //generates a random last name
        email: faker.internet.email().slice(-29),                                                           //generates a random email address
        phone: faker.phone.number(({ style: 'national' })),                                                 //generates a random phone number
        address: faker.location.streetAddress().slice(0, 23),                                               //generates a random street address
        city: randomNZCity(),                                                                               //generates a random city
        dateOfBirth: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }).toISOString().slice(0, 10),    //generates a random date of birth between 18 and 90 years old and formats it to YYYY-MM-DD
        patientId: faker.string.uuid().slice(0, 8),                                                         //generates a random 8 character Unique ID for the patient ID
        patientMedInfo: '',                                                                                 //placeholder for medical information
        patientNotes: ''                                                                                    //placeholder for notes                      
    };
}
    function createDataSet(size) { //creates a dataset of random patient profiles
        const dataSet = [];
        for (let i = 0; i < size; i++) {
            dataSet.push(generatePatientProfile());
        }
        return dataSet;
    }

/* This section of code is the patient profile application menus and CLI
*/

function startUp() {
  console.log('\n ------------------Patient Profile Management System-----------------------');
  console.log('\n Please select an option from the menu by entering th corresponding number');
  promptMenuSelection(mainMenu);
}
const mainMenu = {
  menuText:  "\n1. Add new patient\n2. Remove a patient\n3. View entire patient list\n4. Access or edit a patient profile",
  validOptions: ['1', '2', '3', '4', '5'],
  option1: addNewPatient(),
  option2: promptMenuSelection(deletePatientMenu),
  option3: printPatientsTable(arr),
  option4: promptMenuSelection(findPatientMenu),
  option5: exitProgram(),
}
const deletePatientMenu = {
  menuText:  "\n1. Delete by index from list of all patients\n2. find patient by first name\n3. find patient by last name\n4. find patient by ID\n5. Back",
  validOptions: ['1', '2', '3', '4', '5'],
  option1: addNewPatient(),
  option2: promptMenuSelection(deletePatientMenu),
  option3: promptMenuSelection(viewAllMenu),
  option4: promptMenuSelection(findPatientMenu),
  option5: exitProgram(),
}
const viewAllMenu = {

}
const findPatientMenu = {

}
function promptMenuSelection(menu) { //Reusable function for all menu selection within the program
  console.log(menu.menuText);
  rl.question('Please enter an option (1 to ' + menu.optionCount + ')', idx => {
    if (menu.validOptions.includes(idx.trim())) {
      switch (idx.trim()) {
        case '1': menu.option1; break;
        case '2': menu.option2; break;
        case '3': menu.option3; break;
        case '4': menu.option4; break;
        case '5': menu.option5; break;
        case '6': menu.option6; break;
        case '7': menu.option7; break;
    }
  }
    else {
      console.log('\nPlease enter a valid option (1 to ' + menu.optionCount + ')');

  })
}
function promptYN(question, callback) { //Reusable function for all yes or no prompts within the program
    rl.question(question, answer => {
        const ans = answer.trim().toLowerCase();
        if(ans === 'y' || ans === 'yes') {
            callback(true);
        } else if( ans === 'n' || ans === 'no') {
            callback(false);
        } else {
            console.log('Invalid entry, please type either y or n.');
            promptYN(question, callback);
        }
    })
}

/* This section of the code is for the functions to display patient lists or details and select patients from that list */
const selectedPatient;
function selectPatientByIndex(list, question) {                    // this function 
  printPatientsTable(list);                                         // Show all patients
  rl.question(question, num => {                                    // Ask for the patients index number
    let idx = parseInt(num) - 1;                                    // Convert to array index
      selectedPatient = list[idx];                                  // Make the selected patient the currently accessed profile
  });
}
function printPatientsTable(arr) { // Function to display all patients in a table format
  if (arr.length === 0) { // If there are no patients in the dataset
    console.log('\nNo patients found.');
    return;
  }
  // Print table headers
  console.log('\n # |  First Name |  Last Name  |             email             |  Phone Number  |         Address         |       City       |     DOB    |    ID    |');
  console.log('----------------------------------------------------------------------------------------------------------------------------------------------------------------------');
  // Print each patient as a formatted row unsorted
  arr.forEach((patient, idx) => {
    let row =
      String(idx + 1).padEnd(3) + '| ' +         // patient index number, padded for alignment
      patient.firstName.padEnd(11) + ' | ' +              // patient first name, padded for alignment
      patient.lastName.padEnd(11) + ' | ' +              // patient last name, padded, with dollar sign
      patient.email.padEnd(29) + ' | ' +              // patient email, always 2 decimal places, padded
      patient.phone.padEnd(12) + ' | ' +           // patient ph. number, padded for alignment
      patient.address.padEnd(23) + ' | ' +           // patient address, padded for alignment
      patient.city.padEnd(16) + ' | ' +           // patient city, padded for alignment
      patient.dateOfBirth + ' | ' +               //patient DOB, consistent 10 character length so no need for padding
      patient.patientId + ' |'                    //patient ID, consistent 8 character length so no need for padding
    console.log(row);
    return;
  });
}

/* This section of the code is for functions to manipulate the dataset, such as add, edit, or remove */

printPatientsTable()
rl.close();