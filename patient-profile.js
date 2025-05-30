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
let currentPatient // variable to store the currently accessed patient
let currentList  // variable to store the last accessed list in order to go back
const rl = readline.createInterface({ // Create a readline interface for user input and output
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

/* This section of code creates a set of 200 patients with randomly generated information and stores them within a json file
the size of the dataset can be changed. It also contains the function that will be used to save the new patients array to
the file after changes have been made */

patients = []; //resets to an empty patients array
patients.push(...createDataSet(200)); //adds 200 generated patients to the patients array

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

function generatePatientProfile() {                                                                         //creates a random patient profile object
    return {
        firstName: faker.person.firstName().slice(0, 11),                                                   //generates a random first name
        lastName: faker.person.lastName().slice(0, 11),                                                     //generates a random last name
        email: faker.internet.email().slice(-29),                                                           //generates a random email address
        phone: faker.phone.number(({ style: 'national' })),                                                 //generates a random phone number
        address: faker.location.streetAddress().slice(0, 23),                                               //generates a random street address
        city: randomNZCity(),                                                                               //generates a random city
        dateOfBirth: faker.date.birthdate({ min: 18, max: 90, mode: 'age' }).toISOString().slice(0, 10),    //generates a random date of birth between 18 and 90 years old and formats it to YYYY-MM-DD
        patientId: faker.string.uuid().slice(0, 8),                                                         //generates a random 8 character Unique ID for the patient ID
        patientMedInfo: [],                                                                                 //placeholder for medical information
        patientNotes: []                                                                                    //placeholder for notes                      
    };
}

    function createDataSet(size) { //creates a dataset of random patient profiles of a given size
        const dataSet = []; // creates an empty array
        for (let i = 0; i < size; i++) { //creates a profile and adds it to the empty array a set amount of times
            dataSet.push(generatePatientProfile()); 
        }
        return dataSet; //returns the empty array
    }

/* This section of code contains the patient profile menu object and various CLI functions
*/

function startUp() {
  console.log('\n------------------Patient Profile Management System-----------------------');
  console.log('\nPlease select an option from the menu by entering the corresponding number');
  promptMenuSelection(mainMenu);
}
const deletePatientMenu = {
  menuText:  "\n1. Delete by index from list of all patients\n2. find patient by first name\n3. find patient by last name\n4. find patient by ID\n5. Back",
  validOptions: ['1', '2', '3', '4', '5'],
  option1: () => deleteBySearch(1),
  option2: () => deleteBySearch(2),
  option3: () => deleteBySearch(3),
  option4: () => deleteBySearch(4),
  option5: () => promptMenuSelection(mainMenu),
}
const mainMenu = {
  menuText:  "\n1. Add new patient\n2. Remove a patient\n3. View patient table\n4. Access or edit a patient profile\n5. Exit the program",
  validOptions: ['1', '2', '3', '4', '5'],
  option1: () => addNewPatient(),
  option2: () => promptMenuSelection(deletePatientMenu),
  option3: () => promptMenuSelection(viewTableMenu),
  option4: () => promptMenuSelection(findPatientMenu),
  option5: () => exitProgram(),
}

const findPatientMenu = {
  menuText:  "\n1. Access patient from entire patient list\n2. Access patient by first name\n3. Access patient by last name\n4. Access patient by ID\n5. Access patient by city\n6. Back",
  validOptions: ['1', '2', '3', '4', '5', '6'],
  option1: () => selectByIndex(patients, patient => showDetails(patient)),
  option2: () => patientSearch(0, results => selectByIndex(results, patient => showDetails(patient))),
  option3: () => patientSearch(1, results => selectByIndex(results, patient => showDetails(patient))),
  option4: () => patientSearch(2, results => selectByIndex(results, patient => showDetails(patient))),
  option5: () => patientSearch(3, results => selectByIndex(results, patient => showDetails(patient))),
  option6: () => promptMenuSelection(mainMenu),
}

const viewTableMenu = {

}

const editProfileMenu = {
menuText:  "\n1. Edit patient information\n2. Add notes\n3. Add medical details\n4. Access another patient\n5. Back\n6. Main menu",
validOptions: ['1', '2', '3', '4', '5', '6'],
option1: () => promptMenuSelection(editInfoMenu),
option2: () => ,
option3: () => ,
option4: () => promptMenuSelection(findPatientMenu),
option5: () => selectByIndex(currentList, patient => showDetails(patient)),
option6: () => promptMenuSelection(mainMenu),
}

const editInfoMenu = {

}

function promptMenuSelection(menu) { //Reusable function for all menu selection within the program
  console.log(menu.menuText);
  rl.question('Please enter an option (1 to ' + menu.validOptions.length + '):', idx => {
    if (menu.validOptions.includes(idx.trim())) {
      switch (idx.trim()) {
        case '1': menu.option1(); break;
        case '2': menu.option2(); break;
        case '3': menu.option3(); break;
        case '4': menu.option4(); break;
        case '5': menu.option5(); break;
        case '6': menu.option6(); break;
        case '7': menu.option7(); break;
    }
  }
    else {
      console.log('\nPlease enter a valid option (1 to ' + menu.validOptions.length + ')');
    }
  })
}

function promptYN(question, callback) {
    rl.question(question, answer => {
        const ans = answer.trim().toLowerCase()
        if(ans === 'y' || ans === 'yes') {
            callback(true)
        } else if( ans === 'n' || ans === 'no') {
            callback(false)
        } else {
            console.log('Please type y or n.')
            promptYN(question, callback)
        }
    })
}

/* This section of the code is for the functions to display patient lists or details and select patients from that list */

function showDetails(patient) {
  console.log(patient);
  promptMenuSelection(editProfileMenu);
}

function patientSearch(type, callback) {
  const prompts = [
    '\nPlease enter a first name: ',
    '\nPlease enter a last name: ',
    '\nPlease enter an ID: ',
    '\nPlease enter a city: '
  ];
  const fields = [
    'firstName',
    'lastName',
    'patientId',
    'city'
  ];
  if (type < 0 || type > 3) {
    callback([]);
    return;
  }
  rl.question(prompts[type], input => {
    const results = patients.filter(patient =>
      patient[fields[type]].toLowerCase().includes(input.trim().toLowerCase())
    );
    currentList = results;
    callback(results);
  });
}

function selectByIndex(list, callback) {                                    // this function 
  printPatientsTable(list);                                                 // Show all patients in the passed list
  rl.question('Please enter the index of the selected patient:', num => {    // Ask for the patients index number
    let idx = parseInt(num) - 1;                                              // Convert to array index
    const patient = list[idx];
    const mainIdx = patients.findIndex(p => p.patientId === patient.patientId); //finds the index of the selected patient in the main patient array using their patient ID
    currentPatient = patients[mainIdx];                                   // sets the selected patient as the currently selected patient for perfomring funcitons on
    callback(currentPatient);                                             // performs the function that was taken as a paremeter on the selected patient
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
      String(idx + 1).padEnd(3) + '| ' +          // patient index number, padded for alignment
      patient.firstName.padEnd(11) + ' | ' +      // patient first name, padded for alignment
      patient.lastName.padEnd(11) + ' | ' +       // patient last name, padded, with dollar sign
      patient.email.padEnd(29) + ' | ' +          // patient email, always 2 decimal places, padded
      patient.phone.padEnd(12) + ' | ' +          // patient ph. number, padded for alignment
      patient.address.padEnd(23) + ' | ' +        // patient address, padded for alignment
      patient.city.padEnd(16) + ' | ' +           // patient city, padded for alignment
      patient.dateOfBirth + ' | ' +               // patient DOB, consistent 10 character length so no need for padding
      patient.patientId + ' |'                    // patient ID, consistent 8 character length so no need for padding
    console.log(row);
  });
}

/* This section of the code is for functions to manipulate the dataset, such as add, edit, or remove */

function addNewPatient(){
  
}
// this function is used to delete a user by searching and selecting from the search results
// the type of search is defined by the menu option that was selected to call this function
// and passed into the function by the type parameter
function deleteBySearch(type) { 
  const prompt = '\nPlease select a patient to delete by entering their index: ';
  // Helper to ask if user wants to delete another patient
  function askRepeat(input) {
      if (input) {
        promptMenuSelection(deletePatientMenu);
      } else {
        promptMenuSelection(mainMenu);
      }
    }
  // Helper to select and delete from a list
function selectAndDelete(list) {
  if (!list || list.length === 0) {          // if the list is empty a message will be returned and the user will be asked if they want to
    console.log('\nNo patients found.');       // search again
    askRepeat();
    return;
  }
  printPatientsTable(list);                  //the print patients table function is used to print a table based on the results of the search 
  rl.question(prompt, num => {               //the user is prompted to select a patient to delete from its index on the table
    const idx = parseInt(num) - 1;           //the input from the user is taken and used to select which patient to delete
    if (idx >= 0 && idx < list.length) {     //checks if the users selection is valid
      const patient = list[idx];             //assigns the chosen patient as the patient that will be deleted using their index in the given list
      promptYN(`\nAre you sure you want to delete patient "${patient.firstName} ${patient.lastName}"? (y/n): `, confirmed => { //promptYN is used to confirm the user wants to delete the patient
        if (confirmed) {
          //if the user confirms the patient is deleted
          // Remove from main patients array and save
          const mainIdx = patients.findIndex(p => p.patientId === patient.patientId); // finds the index of the deleted patient in the main patients array using their unique ID
          if (mainIdx !== -1) {              //if the patient is included in the main array 
            patients.splice(mainIdx, 1);     //the splice function is used to remove the patient from the main patients array
            savePatients();                  //the new patients array with the patient removed is saved by writing it to patients.json
          }
          console.log('\nPatient has been deleted.'); //a message is displayed confirming deletion
        } else {
          console.log('\nDeletion cancelled.'); //if the user answers no to the deletion confirmation an appropriate message is displayed
        }
        askRepeat();                          //the askRepeat helper asks if the user would like to delete another patient and the process repeats if so
      });
    } else {
      console.log('\nInvalid selection.');      //if the selection is invalid a message is displayed and the user is asked if they would like to delete another patient
      askRepeat();
    }
  });
}
  //the type of search is defined by the type paramater, given in the menu object where this function is called, using a switch
  switch (type) {
  case 1:
    selectAndDelete(patients);
    break;
  case 2:
    patientSearch(0, results => selectAndDelete(results)); // search by first name
    break;
  case 3:
    patientSearch(1, results => selectAndDelete(results)); // search by last name
    break;
  case 4:
    patientSearch(2, results => selectAndDelete(results)); // search by ID
    break;
  default:
    promptMenuSelection(mainMenu);
}
}


function exitProgram() { //this function exits the program and closes the interface
  rl.close();
}

startUp();               //calling the startup function to start the program
//rl.close();