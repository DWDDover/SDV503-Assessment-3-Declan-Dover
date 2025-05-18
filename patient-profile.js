/**
 * Version: 1.0.0
 * Author: Your Name
 * Date: 2025-05-19
 * Description: The patient profile is the part of the system where an individual patient’s personal details and
   health records are displayed and can be edited by the patient as well as health professionals.
 */

const { faker } = require('@faker-js/faker');
const randomName = faker.person.fullName();

console.log('Random Name:', randomName);

function generatePatientProfile() { //creates a random patient profile
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
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