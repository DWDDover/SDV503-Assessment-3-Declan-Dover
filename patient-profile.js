/**
 * Version: 1.0.0
 * Author: Declan Dover
 * Date: 2025-05-19
 * Description: The patient profile is the part of the system where an individual patient’s personal details and
   health records are displayed and can be edited by the patient as well as health professionals.
 */

/* This section of code imports the required packages, creates the empty patient array and json file
and creates the variables that will be used to temporarily store values in order to go back or 
perform functions on the selected patients. It also contains the code to run my tests.
*/

const { faker } = require('@faker-js/faker'); //importing the faker library to generate random data
const readline = require('readline'); // Import the readline module for handling command line input/output
const fs = require('fs'); // Import the fs (filesystem) module for reading/writing files
const FILE = 'patients.json';// Define the file where patients will be saved
let patients = []; // Initialize an empty array to store patients
let currentPatient // variable to store the currently accessed patient
let currentList  // variable to store the last accessed list in order to go back
let currentMenu // stores the current menu in order to go back
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
  option1: () => selectByIndex(patients, patient => deletePatient(patient)),
  option2: () => patientSearch(0, results => selectByIndex(results, patient => deletePatient(patient))),
  option3: () => patientSearch(1, results => selectByIndex(results, patient => deletePatient(patient))),
  option4: () => patientSearch(2, results => selectByIndex(results, patient => deletePatient(patient))),
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
  menuText: "\nThis table contains all patients currently stored in the system\n1. Export patient table to CSV\n2. Back",
  validOptions: ['1', '2'],
  option1: () => exportToCSV(),
  option2: () => promptMenuSelection(mainMenu),
}
const editProfileMenu = {
menuText:  "\n1. Edit patient information\n2. Add notes\n3. Add medical details\n4. Access another patient\n5. Back\n6. Main menu",
validOptions: ['1', '2', '3', '4', '5', '6'],
option1: () => promptMenuSelection(editInfoMenu),
option2: () => addNotes(currentPatient, 0),
option3: () => addNotes(currentPatient, 1),
option4: () => promptMenuSelection(findPatientMenu),
option5: () => selectByIndex(currentList, patient => showDetails(patient)),
option6: () => promptMenuSelection(mainMenu),
}
const editInfoMenu = {
menuText: "\n1. Edit first name\n2. Edit last name\n3. Add/Edit email\n4. Edit phone number\n5. Edit address\n6. Edit city\n7. Back\n8. Main Menu",
validOptions: ['1', '2', '3', '4', '5', '6', '7', '8'],
option1: () => editPatientInfo(0),
option2: () => editPatientInfo(1),
option3: () => editPatientInfo(2),
option4: () => editPatientInfo(3),
option5: () => editPatientInfo(4),
option6: () => editPatientInfo(5),
option7: () => showDetails(currentPatient),
option8: () => promptMenuSelection(mainMenu),
}

function promptMenuSelection(menu) { //Reusable function for all menu selection within the program
  currentMenu = menu;
    if (menu == viewTableMenu) {
    printPatientsTable(patients);     // the view table menu also needs the full table printed before the list of options
  }
  console.log(menu.menuText);
  input();
  //helper to repeat the prompt on invalid input
  function input() {
  rl.question('\nPlease enter an option (1 to ' + menu.validOptions.length + '):', idx => {
    if (menu.validOptions.includes(idx.trim())) {
      switch (idx.trim()) {
        case '1': menu.option1(); break;
        case '2': menu.option2(); break;
        case '3': menu.option3(); break;
        case '4': menu.option4(); break;
        case '5': menu.option5(); break;
        case '6': menu.option6(); break;
        case '7': menu.option7(); break;
        case '8': menu.option8(); break;
    }
  }
    else {
      console.log('\nInvalid option selected');
      input();
    }
  })
}
}
//This function has been adapted from our class practice and will be used whenever the user is prompted to answer yes or no in order
//to avoid repetition
function promptYN(question, callback) { //the function takes the yes or no question that the user will be asked and a callback as parameters
    rl.question(question, answer => {
        const ans = answer.trim().toLowerCase()   //converts the answer to lowercase and removes empty spaces
        if(ans === 'y' || ans === 'yes') {    
            callback(true)                        //if the answer is y, true is passed into the callback
        } else if( ans === 'n' || ans === 'no') {
            callback(false)                       //if the answer is n, false is passed into the callback
        } else {
            console.log('Please type y or n.')    //if the input is neither y or n the user is prompted to enter a valid input and the question is repeated
            promptYN(question, callback)
        }
    })
}

/* This section of the code is for the functions to display patient lists or details and select patients from that list */

function showDetails(patient) {
  let details = '\nFirst name:         ' + 
      patient.firstName + '\nLast name:          ' +      // patient first name
      patient.lastName + '\nemail:              ' +       // patient last name
      patient.email + '\nPhone number:       ' +          // patient email
      patient.phone + '\nAddress:            ' +          // patient ph. number
      patient.address + '\nCity:               ' +        // patient address
      patient.city + '\nDOB:                ' +           // patient city
      patient.dateOfBirth + '\nUnique ID:          ' +    // patient DOB
      patient.patientId + '\nNotes:              \n- ' +   // patient ID
      patient.patientNotes.join('\n-') + '\nMedical information: \n- ' + //Notes printed each on a new line
      patient.patientMedInfo.join('\n-')                  //Medical information entries, each printed on a new line
    console.log(details);
  promptMenuSelection(editProfileMenu);                   //Display the options to edit the profile below the information
}

function patientSearch(type, callback) {
//Patient search takes a type to define the type of search and a callback parameter to perform other 
//functions on the list of returned patients by the search                  
  const prompts = [   //an array to store the different prompts that would be given to the user depending on the type of search
    '\nPlease enter a first name: ',
    '\nPlease enter a last name: ',
    '\nPlease enter an ID: ',
    '\nPlease enter a city: '
  ];
  const fields = [    //an array of the different fields of a patient object that would be searched depending on the type of search
    'firstName',
    'lastName',
    'patientId',
    'city'
  ];
  rl.question(prompts[type], input => {    //a question to ask the user for search input, the prompt and field to be searched will depend on the type
    const results = patients.filter(patient =>
      patient[fields[type]].toLowerCase().includes(input.trim().toLowerCase())
    );
    currentList = results;
    if (results.length < 1) {             //if there are no results the user will be prompted to try another search
      console.log('\nNo patients found, please try another search');
      promptMenuSelection(currentMenu);
    }
    else {
    callback(results);  //performs the callback parameter on the list of patients returned by the search, usually displaying the list and asking the user to select one by index
    }
  });
}

function selectByIndex(list, callback) {                                    // this function 
printPatientsTable(list)
  select(list);    
  //helper to select a patient so that selection can be called again on incorrect input and not reprint the paitents table
  function select (list) {                                          // Show all patients in the passed list
  rl.question('\nPlease enter the index of the selected patient (1 to ' + list.length + '):', num => {   // Ask for the patients index number
    if (num <= list.length) {                                               //check for valid entry
      let idx = parseInt(num) - 1;                                              // Convert to array index
      const patient = list[idx];                                                //stores the patient selected from the user
      const mainIdx = patients.findIndex(p => p.patientId === patient.patientId); //finds the index of the selected patient in the main patient array using their patient ID
      currentPatient = patients[mainIdx];                                     // sets the selected patient as the currently selected patient for perfomring functIons on
      currentPatientIdx = mainIdx                                             //stores the index of the current patient for use in the delte function
      callback(currentPatient);   // performs the function that was taken as a paremeter on the selected patient
    }
    else {
      console.log('\nInvalid index, please enter a valid number (1 to ' + list.length + ')'); //tells the patient their input was invalid a a guide to what is a valid input
      select(list);   //recalls the selectByIndex funciton   
    } 
    });  
  }    
}

function printPatientsTable(arr) { // Function to display all patients in a table format
  if (arr.length === 0) { // If there are no patients in the dataset
    console.log('\nNo patients found.');
    return false;
  }
  // Print table headers
  console.log('\n # |  First Name |  Last Name  |             email             |  Phone Number  |         Address         |       City       |     DOB    |    ID    |');
  console.log('----------------------------------------------------------------------------------------------------------------------------------------------------------------------');
  // Print each patient as a formatted row unsorted
  arr.forEach((patient, idx) => {
    let row =
      String(idx + 1).padEnd(3) + '| ' +          // patient index number, padded for alignment
      patient.firstName.padEnd(11) + ' | ' +      // patient first name, padded for alignment
      patient.lastName.padEnd(11) + ' | ' +       // patient last name, padded for alignment
      patient.email.padEnd(29) + ' | ' +          // patient email, padded for alignment
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


function addNotes(patient, type) {      //function to add either notes or medical information to a patient depending on the type parameter
  let prompts = ['enter a new note for', 'enter new medical information for'] //array to contain the two different prompts
rl.question(`\nPlease ${prompts[type]} ${patient.firstName} ${patient.lastName}:`, note => { //question asked to the user depending on the type parameter
    if (note.length < 1) {      //if input is empty the function will be called again and a message will be displayed
    console.log('\nNo text detected');
    addNotes(patient, type)
  }
  if (type == 0) {      //if type is 0 the entry is added to notes
  patient.patientNotes.push(note);
  }
  if (type == 1) {      //if type is 1 the entry is added to medical information
    patient.patientMedInfo.push(note);
  }
    console.log('\nNew entry: "' + note + '" has been added');  //confirmation message that the entry has been saved
    showDetails(patient); //prints the new detials of the selected patient and brings up the edit patient menu again
})
}

function deletePatient(patient) {
  promptYN(`\nAre you sure you want to delete patient "${patient.firstName} ${patient.lastName}"? (y/n): `, confirmed => { //promptYN is used to confirm the user wants to delete the patient
        if (confirmed) {
          //if the user confirms the patient is deleted
          // Remove from main patients array and save
          const mainIdx = patients.findIndex(p => p.patientId === patient.patientId); // finds the index of the deleted patient in the main patients using the unique ID
          if (mainIdx !== -1) {              //if the patient is included in the main array 
            patients.splice(mainIdx, 1);     //the splice function is used to remove the patient from the main patients array
            savePatients();                  //the new patients array with the patient removed is saved by writing it to patients.json
          }
          console.log('\nPatient has been deleted.'); //a message is displayed confirming deletion
        } else {
          console.log('\nDeletion cancelled.'); //if the user answers no to the deletion confirmation an appropriate message is displayed
        }
        promptMenuSelection(deletePatientMenu);//after deletion the user is returned to the delte patient menu
}) 
}

// Function to export all patients to a CSV file, adapted from one of our SDV classes
function exportToCSV() {
  if (patients.length === 0) {                      // If there are no patients to export
    console.log('\nNo patients to export.');        //an appropriate message is displayed
    promptMenuSelection(viewTableMenu);             //and the user is returned to the previous menu
  }
  // Define the CSV column headers
  const headers = ['First Name', 'Last Name', 'email', 'Phone Number', 'Address', 'City', 'DOB', 'ID'];
  // Helper to escape any CSV field with commas or quotes
  function esc(field) {
    const str = String(field);
    return (str.includes(',') || str.includes('"')) ? `"${str.replace(/"/g, '""')}"` : str;
  }
  // Start CSV with header row
  let csv = headers.join(',') + '\n';
  // Add a row for each patient, escaping fields if necessary
  patients.forEach(e => {
    csv += [e.firstName, e.lastName, e.email, e.phone, e.address, e.city, e.dateOfBirth, e.patientId].map(esc).join(',') + '\n';
  });
  // Write CSV data to file
  fs.writeFileSync('patients.csv', csv);
  console.log('\nPatients exported to patients.csv!');
  promptMenuSelection(mainMenu);
}

function exitProgram() { //this function exits the program and closes the interface
  rl.close();
}

if (process.env.NODE_ENV === 'test') { //exports the necessary functions and the patients array to be tested in patient-profile-test.js
  module.exports = {                   //if the program is running in test mode
    selectByIndex,
    rl,
    printPatientsTable,
    promptMenuSelection,
    patients,
    promptYN,
    deletePatient,
    patientSearch
  };
}
if (process.env.NODE_ENV !== 'test') { //calling the startup function to start the program only if
  startUp();                           //its not being run for testing purposes
}