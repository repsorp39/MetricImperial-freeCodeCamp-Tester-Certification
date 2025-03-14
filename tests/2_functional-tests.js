const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
     test("Convert a valid input such as 10L: GET request to /api/convert",(done)=>{
        chai.request(server)
        .keepOpen()
        .get("/api/convert?input=10L")
        .end((err,res) =>{
            assert.equal(res.status,200,"Status is 200");
            const data = JSON.parse(res.text);
            assert.equal(data.string,"10 liters converts to 2.64172 gallons")
            done();
        })
     })

     test("Convert an invalid input such as 32g: GET request to /api/convert",(done) =>{
        chai.request(server)
            .keepOpen()
            .get("/api/convert?input=32g")
            .end((err,res)=>{
                assert.equal(res.text,"invalid unit");
                done();
            })
     })

     test("Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert",(done)=>{
        chai.request(server)
            .keepOpen()
            .get("/api/convert?input=3/7.2/4kg")
            .end((err,res) =>{
                assert.equal(res.text,"invalid number");
                done();
            })
     })


     test("Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert",(done)=>{
        chai.request(server)
            .keepOpen()
            .get("/api/convert?input=3/7.2/4kilo")
            .end((err,res) =>{
                assert.equal(res.text,"invalid number and unit");
                done();
            })
     })

     test("Convert with no number such as kg: GET request to /api/convert",(done)=>{
        chai.request(server)
        .keepOpen()
        .get("/api/convert?input=kg")
        .end((err,res) =>{
            const data = JSON.parse(res.text)
            assert.equal(data.returnNum,2.20462);
            assert.equal(data.returnUnit,"lbs");
            done();
        })
     })
});
