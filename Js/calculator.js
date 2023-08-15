class Calculator{
    constructor(datainput,datacalculate){
    this.datainput=datainput;
    this.datacalculate=datacalculate;
    this.currentoperand="";
    this.prevoperand="";
    this.clear();
    }

  clear(){
    this.currentoperand="";
    this.prevoperand="";
    this.operations=undefined;
  }
  delete(){
   this.currentoperand=this.currentoperand.toString().slice(0,-1);
  }
  appendnumber(number){
    this.number=number;
    if(number=="."&& this.currentoperand.includes(".")) return;
    this.currentoperand+=number;
  }
  selectoperations(operation){
    if(this.currentoperand=== "")return;
    if(this.prevoperand!=""){
        this.compute();
    }
    this.operation=operation;
    this.prevoperand=this.currentoperand;
    this.currentoperand="";
  }
  compute(){
    let computation;
    const prev=parseFloat(this.prevoperand);
    const curr=parseFloat(this.currentoperand);
    if(isNaN(prev)|| isNaN(curr)) return;
    switch (this.operation){
        case "+":
            computation=curr+prev;
            break;
        case "-":
            computation=prev-curr;
            break;
        case "÷":
            computation=prev/curr;
            break;
        case "*":
            computation=curr*prev;
            break;
        default:
            return;
    }
    this.currentoperand=computation;
    this.prevoperand="";    
    this.operation=null;
  }
  updatedata(){
    this.datainput.textContent = this.currentoperand;
    
    if (this.operation != null) {
        this.datacalculate.textContent = this.prevoperand + this.operation;
    } else {
        this.datacalculate.textContent = this.prevoperand;
    }
  }
}

const datanumber= document.querySelectorAll('[data-number]');
const dataoperation= document.querySelectorAll('[data-operation]');
const dataclear= document.querySelector('[data-allclear]');
const datadelete= document.querySelector('[data-delete]');
const dataequals= document.querySelector('[data-equals]');
const datainput= document.querySelector('[data-input-screen]');
const datacalculate= document.querySelector('[data-calculate-screen]');

let calculator= new Calculator(datainput,datacalculate);

datanumber.forEach((x)=>{
    x.addEventListener("click",()=>{
        calculator.appendnumber(x.textContent);
        calculator.updatedata();
    })
})
dataclear.addEventListener("click",()=>{
    calculator.clear();
    calculator.updatedata();
})
datadelete.addEventListener("click",()=>{
    calculator.delete();
    calculator.updatedata();
})

dataoperation.forEach((x)=>{
    x.addEventListener("click",()=>{
        calculator.selectoperations(x.textContent);
        calculator.updatedata();
    })
})

dataequals.addEventListener("click",()=>{
    calculator.compute();
    calculator.updatedata();
})
