# Testing Description

## Manual Testing

### Input testing

All possible input will be entered into the menu selection fields for each menu to test that there is no input that breaks the program
The same will be done for all the search functions
The same will then be done for all the fields where information can be added such as a new patient, editing details, or adding notes/medical information

### Testing functions that manipulate the patients array

Create a patient and then see if that patient is now in the patients.json file
Change a patients details and then see if the changes have been made to the patients.json file
Delete a patient and then check to see if that patient has been removed from the patients.json file

### Testing the search functions

Create a patient with 'Test' as all entry fields
Use each patient search type with test as the input to ensure this test patient is returned by each search

## Automated Testing

Automated testing will be very useful for periodically checking my programs functionality after making changes. I used CoPilot initially to learn the syntax for writing these tests but after frequent debugging and fixing of the code I began to understand how to use the tools.
For automated testing I will use Mocha and Sinon to verify the functionality of the selectByIndex function in my patient management system. The test simulates user input for selecting a patient by index and checks that the correct patient object is returned to the callback. It also tests that the function properly handles invalid input by prompting the user again until a valid selection is made. This ensures that the patient selection logic is robust and user-friendly, even when unexpected or incorrect input is provided. I will use the same kind of tests to check that printPatientsTable prints the table correctly when called. Finally I will test my patient search with only the first name search type. If this type of search works the other types will function correctly as they share the same logic and function.