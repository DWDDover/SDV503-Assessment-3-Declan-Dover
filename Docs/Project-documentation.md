# Documentation

## descriptions of the program variables, functions, objects and methods.

Arrays and Lists

patients: 
Stores all patient profiles to be saved to patients.json.

currentPatient: 
Stores the currently selected patient for editing or viewing.

currentList: 
Stores the most recent filtered list of patients for selection in order to go back.

Objects

currentMenu:
Tracks the active menu to enable "back" navigation.

mainMenu:
The main entry point of the program. Allows users to add a new patient, remove a patient, view all patients, access or edit a patient profile, or exit the program.

deletePatientMenu:
Menu for deleting a patient from the system. Users can delete by index, first name, last name, patient ID, or go back to the main menu.

findPatientMenu:
Menu used to search for and access a patient profile. Users can search the entire list or filter by first name, last name, patient ID, or city. Also includes a back option.

viewTableMenu:
Displayed after listing all patients. Allows users to export the data to a CSV file or go back to the main menu.

editProfileMenu:
Shown after a patient has been selected. Offers options to edit the patient’s basic information, add notes, add medical information, access another patient, go back, or return to the main menu.

editInfoMenu:
Sub-menu accessed from editProfileMenu. Enables editing of specific patient fields such as first name, last name, email, phone number, address, or city. Also includes back and main menu options.

Functions and Methods

generatePatientProfile():
Generates a single patient object using Faker.

createDataSet(size):
Returns an array of randomly generated patient profiles.

savePatients(): 
Saves the patients array into patients.json.

showDetails(patient): 
Displays a patient’s profile and opens the edit menu.

patientSearch(type, callback): 
Searches patients by name, ID, or city.

selectByIndex(list, callback): 
Allows the user to select a patient from a list using an index.

editPatientInfo(type): 
Edits a specific field of the selected patient.

addNewPatient(): 
Creates and saves a new patient profile.

addNotes(patient, type): 
Adds notes or medical info to a patient profile.

deletePatient(patient): 
Deletes a patient after user confirmation.

printPatientsTable(arr):
Displays patients in a formatted table.

promptYN(question, callback): 
Handles yes/no prompts.

exportToCSV(): 
Exports patient list to patients.csv.

startUp(): 
Displays the welcome message and launches the main menu.

promptMenuSelection(menu): 
Displays a menu and handles input.

Constants and Other Variables

FILE: 
Defines the name of the JSON file for persistent patient data.

rl: 
Readline interface used for CLI input and output.


## User manual

User Manual

Patient Profile Management System

Overview:

This Patient Profile Management System is a Node.js command-line application designed to help users manage patient records efficiently. It allows the user to create, view, edit, and delete patient profiles. It also includes features for searching patients, adding medical information or personal notes, and exporting the patient database to a CSV file. The system is designed for use by health professionals that are managing patient information.

To install the packages required for this program type 

npm install

into your terminal

Then to run the program navigate to the SDV503-Assessment-3 folder in the terminal and type

node patient-profile

Once the program starts, it displays a banner followed by the main menu.

Main Menu Options:

The main menu presents five options.

Option 1 allows the user to add a new patient by entering basic details such as first name, last name, email, and phone number. After the basic profile is created, the user has the choice to enter more information.

Option 2 is used to remove a patient from the system. It brings up a sub-menu where the user can choose how they want to locate the patient for deletion.

Option 3 allows the user to view the entire list of patients in a formatted table. After viewing, the user can choose to export this list to a CSV file.

Option 4 lets the user search for and access an individual patient profile for editing. The user can search by first name, last name, ID, or city.

Option 5 exits the program and closes the terminal interface.

Searching and Accessing Patients:

When the user selects the option to access or edit a patient profile, they are presented with several ways to locate a patient. These include searching the entire list or filtering by first name, last name, ID, or city. Once a list of results is shown, the user selects a patient by index number. The selected patient’s details are displayed, and an edit menu is shown.

Editing Patient Information:

After accessing a patient, the user can choose to edit basic information such as first name, last name, email, phone number, address, and city. There are also options to add general notes about the patient or enter specific medical information. These notes and medical entries are stored as lists and are shown each time the patient's details are displayed.

Creating a New Patient:
 When creating a new patient, the user is prompted to enter a first name, last name, email address, and phone number. The system trims the names to a maximum of 11 characters and generates a unique patient ID. After creating the patient, the user is given the option to enter more information or return to the main menu.

Deleting a Patient:

To delete a patient, the user must locate them using the delete menu. After selecting the patient, the system asks for confirmation before removing them from the database. Once confirmed, the patient is permanently deleted and the updated list is saved.

Exporting Patient Data:

The system includes an option to export the entire patient list into a CSV file called "patients.csv". This can be accessed through the view table menu. The export includes all relevant fields for each patient and uses proper CSV formatting.

Data Storage:

All patient data is stored in a file called "patients.json". Whenever a change is made, such as adding, editing, or deleting a patient, the program saves the updated list back into this file automatically. This ensures that no data is lost between sessions.

Ending the Program:

When the user chooses to exit the program from the main menu, the terminal interface is closed cleanly using the readline module’s close function. This marks the end of the session.
