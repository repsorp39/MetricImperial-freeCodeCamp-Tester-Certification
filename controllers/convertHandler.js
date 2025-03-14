class ConvertHandler {
  
  constructor(input){
   
    input = input.replaceAll(/\"|\'/g,''); 
    this.input = input.toLowerCase();
    this.response = {};
  }

  getNum() { 
    const unit = this.getUnit();
    
    let num = !unit ? this.input : this.input.split(unit)[0];

    if(num === "") return 1;

    if(/^[0-9]+(\.[0-9]+)?(\/[0-9]+(\.[0-9]+)?)?$/.test(num)){
      if(num.includes("/")){
        let tabNums = num.split("/");
        return Number(tabNums[0])/ Number(tabNums[1]);
      }
      return Number(num);
    }
   
    return null;

  };
  
  getUnit() {
    let res = this.input.match(/[A-Za-z]/);
    return !res ? "": this.input.slice(res["index"]);
  };
  
  getReturnUnit() {
    const initUnit = this.getUnit();
     const matchers = {
      "gal":"L",
      "l":"gal",
      "mi":"km",
      "km":"mi",
      "lbs":"kg",
      "kg":"lbs"
     }

     return matchers[initUnit];
  };

  spellOutUnit(unit) {
    const matchers = {
      "gal":"gallons",
      "L":"liters",
      "l":"liters",
      "mi":"miles",
      "km":"kilometers",
      "lbs":"pounds",
      "kg":"kilograms"
     }
    
     return matchers[unit];
  };
  
  convert() {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const initNum = this.getNum();
    const initUnit = this.getUnit();
    let result;
    switch(initUnit){
      case "gal": result = galToL * initNum;
      break;
      case "l": result =  initNum / galToL ;
      break;
      case "lbs": result = lbsToKg * initNum;
      break;
      case "kg": result = initNum / lbsToKg ;
      break;
      case "mi": result = miToKm * initNum;
      break;
      case "km": result = initNum / miToKm ;
      break;
    }
    
    return result.toFixed(5);
  };
  
  getString() {
    const initNum = this.getNum();
    const initUnit = this.getUnit();
    const returnNum = this.convert(initNum,initUnit);
    const returnUnit = this.getReturnUnit(initUnit);
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
  getResult(){

    const availableUnits = ["gal","l","mi","km","lbs","kg"];

    let input = this.getNum();
    const unit = this.getUnit();

    if(!input && (!unit || !availableUnits.includes(unit))) return "invalid number and unit";
    if(!input) return "invalid number";
    if(!unit || !availableUnits.includes(unit)) return "invalid unit";
    const returnNum = Number(this.convert());
    const returnUnit = this.getReturnUnit();
    return {
      initNum:input,
      initUnit:unit === "l"?"L":unit,
      returnNum,
      returnUnit,
      string:this.getString()
    }
  }
}

module.exports = ConvertHandler;
