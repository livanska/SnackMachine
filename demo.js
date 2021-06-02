var snackMachine;
var nameInput 
var priceInput 
var amountInput 
var dateInput 
const logger = (text) =>{
    document.getElementById("logs").innerHTML += text + '\n';
}

const createSnackMachine = ()=>{
    snackMachine = new SnackMachine();
    nameInput = document.getElementById("nameInput")
    priceInput = document.getElementById("priceInput")
    amountInput = document.getElementById("amountInput")
    dateInput = document.getElementById("dateInput")
}

const addCategory = () => {
    (nameInput.value && priceInput.value)?
    snackMachine.addCategory(nameInput.value, priceInput.value,amountInput.value ):
    logger('Add snack category name and item price')
}

const addItem = () => {
    (nameInput.value && amountInput.value)?
    snackMachine.addItem(nameInput.value, priceInput.value):
    logger('Add snack category name and items amount')
}

const purchase = () => {
    nameInput.value?
    snackMachine.purchase(nameInput.value):
    logger('Set snack category name to buy it.')
}
const list = () => {
    snackMachine.list()
}

const monthReport = ()=> {
    dateInput.value?
    snackMachine.monthReport(new Date(dateInput.value)):
    logger('Set valid date.')
}

const sinceDateReport = () => {
    dateInput.value?
    snackMachine.sinceDateReport(new Date(dateInput.value)):
    logger('Set valid date.')
}

const clearNulls = () => {
    snackMachine.clear();
}