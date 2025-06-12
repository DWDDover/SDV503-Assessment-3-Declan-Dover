# SDV503-Assessment-3-Declan-Dover

* Version: 1.0.0
 * Author: Declan Dover
 * Date: 2025-05-19
 * Description: The patient profile is the part of the system where an individual patient’s personal details and
   health records are displayed and can be edited by the patient as well as health professionals.

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

