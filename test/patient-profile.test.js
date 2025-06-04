process.env.NODE_ENV = 'test';
const assert = require('assert');
const sinon = require('sinon');
const mod = require('../patient-profile');

describe('selectByIndex', () => {
  let selectByIndex, rl;
  let sandbox;
  before(() => {
    selectByIndex = mod.selectByIndex;
    rl = mod.rl;
  });

beforeEach(() => {
  sandbox = sinon.createSandbox();
  sandbox.stub(console, 'log');
  sandbox.stub(mod, 'printPatientsTable');
  sandbox.stub(rl, 'question');
  //sandbox.stub(mod, 'promptMenuSelection'); // Prevents side effects after deletion
  // Set the global patients array for the test
  mod.patients.length = 0; // clear existing
  mod.patients.push(
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '123456',
      address: '1 Main St',
      city: 'Auckland',
      dateOfBirth: '1990-01-01',
      patientId: 'id1',
      patientNotes: [],
      patientMedInfo: []
    },
    {
      firstName: 'Bob',
      lastName: 'Brown',
      email: 'bob@example.com',
      phone: '654321',
      address: '2 Main St',
      city: 'Wellington',
      dateOfBirth: '1985-05-05',
      patientId: 'id2',
      patientNotes: [],
      patientMedInfo: []
    }
  );
});

  afterEach(() => {
    sandbox.restore();
  });

  it('should call callback with the correct patient for valid index', (done) => {
    const patients = [
      {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        phone: '123456',
        address: '1 Main St',
        city: 'Auckland',
        dateOfBirth: '1990-01-01',
        patientId: 'id1',
        patientNotes: [],
        patientMedInfo: []
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob@example.com',
        phone: '654321',
        address: '2 Main St',
        city: 'Wellington',
        dateOfBirth: '1985-05-05',
        patientId: 'id2',
        patientNotes: [],
        patientMedInfo: []
      }
    ];
    rl.question.callsFake((prompt, cb) => cb('2'));
    let called = false;
    selectByIndex(patients, (patient) => {
      called = true;
      assert.strictEqual(patient.firstName, 'Bob');
      done();
    });
    if (!called) done(new Error('Callback not called'));
  });

  it('should prompt again for invalid index', (done) => {
    const patients = [
      {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        phone: '123456',
        address: '1 Main St',
        city: 'Auckland',
        dateOfBirth: '1990-01-01',
        patientId: 'id1',
        patientNotes: [],
        patientMedInfo: []
      },
      {
        firstName: 'Bob',
        lastName: 'Brown',
        email: 'bob@example.com',
        phone: '654321',
        address: '2 Main St',
        city: 'Wellington',
        dateOfBirth: '1985-05-05',
        patientId: 'id2',
        patientNotes: [],
        patientMedInfo: []
      }
    ];
    let callCount = 0;
    rl.question.callsFake((prompt, cb) => {
      callCount++;
      if (callCount === 1) cb('5'); // invalid
      else cb('1'); // valid
    });
    selectByIndex(patients, (patient) => {
      assert.strictEqual(patient.firstName, 'Alice');
      assert.strictEqual(callCount, 2);
      done();
    });
  });
  it('should print a formatted table for patients', () => {
  const patients = [
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      phone: '123456',
      address: '1 Main St',
      city: 'Auckland',
      dateOfBirth: '1990-01-01',
      patientId: 'id1',
      patientNotes: [],
      patientMedInfo: []
    }
  ];
  // Remove stub so we can check output
  sandbox.restore();
  sandbox = sinon.createSandbox();
  const logSpy = sandbox.spy(console, 'log');
  mod.printPatientsTable(patients);
  // Check that the table header and patient row were printed
  const output = logSpy.getCalls().map(call => call.args[0]).join('\n');
  assert(output.includes('First Name'));
  assert(output.includes('Alice'));
});
it('should return patients matching first name search', (done) => {
  mod.patients.length = 0;
  mod.patients.push(
    { firstName: 'Alice', lastName: 'Smith', email: '', phone: '', address: '', city: '', dateOfBirth: '', patientId: 'id1', patientNotes: [], patientMedInfo: [] },
    { firstName: 'Bob', lastName: 'Brown', email: '', phone: '', address: '', city: '', dateOfBirth: '', patientId: 'id2', patientNotes: [], patientMedInfo: [] }
  );
  // Simulate user entering "Alice"
  rl.question.callsFake((prompt, cb) => cb('Alice'));
  mod.patientSearch(0, (results) => {
    assert.strictEqual(results.length, 1);
    assert.strictEqual(results[0].firstName, 'Alice');
    done();
  });
});
});