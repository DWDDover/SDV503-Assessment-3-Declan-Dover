# Patient Profile Design

## Structural Design

### User Menu

CLI will present a list of options

1. Add new patient
2. Remove a patient
3. Display all patients
4. Access patient profile

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

#### Option 3 - Display all patients

Will display the entire list of patients to the console

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




Discuss how you:

Created reusable functions (e.g., one for displaying data, another for editing).

Used objects or arrays to organize data.

Avoided repetition by not duplicating similar logic.

Made the program easy to update (e.g., separating data and logic).


