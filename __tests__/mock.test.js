var api = require('../server.js'),
    request = require('supertest')(api);
describe('All Employees', function() {

    it('All Employees GET requests Http Response Status 200', function(done) {
        request
            .get('/employees')
            .expect(200, done);
    });


it('respond with json', function(done){
    request
      .get('/employees')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

});

describe('GET /employee/:empid', function () {
    it('respond with json employee not found', function (done) {
        request
            .get('/employees/1009')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404) //expecting HTTP status code
            .expect('{"message":"Employee not found"}') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /employees', function () {
    let data = {
        "empId": 1003,
        "empName": "dummy",
        "empSalary": 34000,
        "empDesignation": "trainer"
    }
    it('respond with 201 created', function (done) {
        request
            .post('/employees')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('POST /employees', function () {
    let data = {
        "empSalary": 34000,
        "empDesignation": "trainer"
    }
    it('respond with 400 not created', function (done) {
        request
            .post('/employees')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect('{"message":"Ensure you sent empName,empSalary,empDesignation"}')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('GET /employees/:empId', function () {
    it('respond with json containing a single employee', function (done) {
        request
            .get('/employees/1001')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});