const chai = require('chai');
let assert = chai.assert;
let expect = chai.expect;
const ConvertHandler = require('../controllers/convertHandler.js');


suite('Unit Tests', function(){
    test("should correctly read a whole number input",()=>{
        let convertHandler = new ConvertHandler("15mi");
        assert.equal(convertHandler.getNum(),15);
    })
    
    it("should correctly read a decimal number input",()=>{
        let convertHandler = new ConvertHandler("15.888mi");
        assert.equal(convertHandler.getNum(),15.888);
    })

    it("should correctly read a fractional input",()=>{
        let convertHandler = new ConvertHandler("15/12mi");
        assert.equal(convertHandler.getNum(),15/12);
    })


    it("should correctly read a fractional input with a decimal",()=>{
        let convertHandler = new ConvertHandler("15/12.5mi");
        assert.equal(convertHandler.getNum(),15/12.5);
    })

    it("should correctly return an error on a double-fraction",()=>{
        let convertHandler = new ConvertHandler("15/12/12");
       expect(convertHandler.getNum()).not.to.be.a("number");
    })

    it("should correctly default to a numerical input of 1 when no numerical input is provided",()=>{
        let cvt = new ConvertHandler("mi");
       assert.equal(cvt.getNum(),1);
    })

    it("should correctly read each valid input unit",()=>{
        let cvt1 = new ConvertHandler("10mi");
        let cvt2 = new ConvertHandler("10L");
        let cvt3 = new ConvertHandler("10gal");
        assert.equal(cvt1.getUnit(),"mi");
        assert.equal(cvt2.getUnit(),"l");
        assert.equal(cvt3.getUnit(),"gal");
    })
    
    it("should correctly return an error for an invalid input unit",()=>{
        let cvt = new ConvertHandler("10");
        assert.equal(cvt.getUnit(),"");
    })

    it("should return the correct return unit for each valid input unit",()=>{
        let cvt1 = new ConvertHandler("10mi");
        let cvt2 = new ConvertHandler("10l");
        let cvt3 = new ConvertHandler("10gal");
        
        assert.equal(cvt1.getReturnUnit(),"km");
        assert.equal(cvt2.getReturnUnit(),"gal");
        assert.equal(cvt3.getReturnUnit(),"L");
    })

    it("should correctly return the spelled-out string unit for each valid input unit",()=>{
        const cvt1 = new ConvertHandler("10mi");
        const exp1 = "10 miles converts to 16.09340 kilometers";
        assert.equal(cvt1.getString(),exp1);
    })
 
    it("should correctly convert gal to L",()=>{
        let cvt = new ConvertHandler("10gal");
        assert.equal(cvt.convert(),37.8541);
    })

    it("should correctly convert L to gal",()=>{
        let cvt = new ConvertHandler("37.8541L");
        assert.equal(cvt.convert(),10);
    })

    it("should correctly convert mi to km",()=>{
        let cvt = new ConvertHandler("10mi");
        assert.equal(cvt.convert(),16.0934);
    })

    it("should correctly convert km to mi",()=>{
        let cvt = new ConvertHandler("16.0934km");
        assert.equal(cvt.convert(),10);
    })

    it("should correctly convert lbs to kg",()=>{
        let cvt = new ConvertHandler("10lbs");
        assert.equal(cvt.convert(),4.53592);
    })

    it("should correctly convert kg to lbs",()=>{
        let cvt = new ConvertHandler("4.53592kg");
        assert.equal(cvt.convert(),10);
    })


   
    
});
