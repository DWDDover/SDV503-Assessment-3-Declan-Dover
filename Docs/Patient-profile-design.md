# Patient Profile Design

## Structural Design

### User Menu

CLI will present a list of options

1. Add new patient
2. Remove a patient
3. View patient list
4. Access and edit a patient profile

#### Option 1 - add new patient

Prompts will appear one at a time and input will be verified each time

Enter first name:
Enter last name:
Enter email:
Enter phone number:
Enter home address:
Enter city:

A new patient will be generated from this input and faker.js will generate a 8 digit unique ID for it
The patient will then be added to the dataset
The top level menu will then be shown again

#### Option 2 - remove a patient

A new menu will appear

1. Delete by index from list of all patients
2. find patient by first name
3. find patient by last name
4. find patient by ID
5. Back

Option 1 will display the entire list of patients and the user will be prompted to select one via index
After selecting a patient their details will be displayed and a message 'Are you sure? (Y/N)' will be displayed
if Y is entered the profile will be deleted and a message will comfirm deletion before returning to the top level menu
if N is selected the user will be prompted to select another patient or return to the top level menu.

Option 2 will prompt the user to enter a patients first name and will display all patients with this first name and allow the user to select by index, following the structure of option 1. If there are no matches a message will display 'first name not found' and the user will be prompted to enter another first name. 

Options 3 and 4 will follow the same structure for last name and ID

Option 5 will return to the top level menu

#### Option 3 - View all patients

Will display a new menu

1. Display entire patient list
2. View patients by first name
3. View patients by last name
4. View patients by city
5. Back

Option 1 will display the entire patient list
Option two will display a prompt, 'Please enter a last name', upon valid entry a list off all patients with that last name will be displayed
with an option to go back
options 3 and 4 will function the same way with last name and email
option 5 returns to the previous menu

#### Option 4 - Access patient profile

Displays a new menu

1. Selct by index from list of all patients
2. Select by first name
3. Select by last name
4. Select by ID
5. Back

A patient profile can be selected using the same structure as option 2 in the top level menu

After a profile is selected a new menu will be presented

1. View profile details
2. Edit patient details
3. Add medication
4. Add diagnoses
5. Add test results
6. Add Medical History
7. Add notes
8. Back

Option 1 Will display all the stored details for that patient

Option 2 Will display a new menu as follows

1. Edit first name
2. Edit last name
3. Edit email
4. Edit phone number
5. Edit home address
6. Edit city
7. Back

Each option will prompt the user to enter a new value for that field and back will return to the previous menu

After any action is taken a relevant confirmation message will be displayed to the user

### Required functionality

Dataset Generation

generatePatientProfile() - Make a profile using faker.js containing randomly generated information
createDataSet() - create a dataset with an amount of patients as a parameter using the generatePatientProfile() function

Program functionality

startUp() - to display a greeting and start the program
printPatientsTable() - view as a formatted table the entire list of patients or a list confined to one last name, first name, or city
findPatientById() - Find a particular patient based on their 8 character ID
selectPatientByIndex() - select a patient to be the currently accessed profile from a given list
addPatient() - add a patient to the system
deleteBySearch() - takes the search type as a parameter and calls delete patient based on that search
deletePatient() - delete the currently selected patient
displayDetails() - view the details of the currently selected patient
addPatientDetails() - add new notes or medication to the selected patients profile
editPatientDetails() - edit the details of the selected patients profile
promptYN() - used for yes or no prompts throughout the program
promptMenuSelection() - a reusable function taking different menu objects as a parameter to display menus and select options




### Use of DRY (Don't Repeat Yourself) Methods

I applied dry methods to the coding of the project in various ways. One such way was creating reusable functions whenever possible in the code, this limits the amount of code in the program avoids repetition through functions that use the same logic for different purposes. Another way was the use of arrays and objects for storing data whenever possible. I used arrays to store my entire patient profile list and search results when needed. I used objects to store then menus for the program and a function to handle the input and navigation of these menus. I have seperated data and logic in the program wherever possible in order to make it easy to update or change in the future.



Created reusable functions (e.g., one for displaying data, another for editing).

Used objects or arrays to organize data.

Avoided repetition by not duplicating similar logic.

Made the program easy to update (e.g., separating data and logic).

### Pair coding feedback

In a discusison with my classmate blake we discussed seperating the processes of generating a random user set and the running the actual patient
profile application. He suggested using a seperate generate-patients.js file that contains the code for generating the data set in order to keep 
the code of the application cleaner. We also discussed user requirements and gave each other some pointers of funtions we would like to see from 
the perspective of a user. I have logged these requirements in the format of user stories in the User-requirements.md file of my project. We also 
discussed how we might re-use functions to better follow DRY principles, such as the parts of the system where user input is taken to navigate a menu, yes or no questions, or displaying lists of patients for different purposes.







