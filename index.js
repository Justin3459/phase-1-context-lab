/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const createEmployeeRecord = (element)=>{
    return {
        'firstName': element[0],
        'familyName': element[1],
        'title': element[2],
        'payPerHour': element[3],
        'timeInEvents':[],
        'timeOutEvents':[]
    }
}

function createEmployeeRecords(elements) {
    const employeeRecords = [];
    
    elements.forEach(function(element) {
      const employeeRecord = createEmployeeRecord(element)
      employeeRecords.push(employeeRecord)
    })
    
    return employeeRecords
  }

const createTimeInEvent= function (dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeInEvents.push({
        type:'TimeIn',
        hour: parseInt(hour,10),
        date,
    })
    return this
}

const createTimeOutEvent = function (dateStamp) {
    let [date, hour] = dateStamp.split(" ")
    this.timeOutEvents.push({
        type:'TimeOut',
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

const hoursWorkedOnDate = function (dateStamp){
    let InIndex = this.timeInEvents.find(function(e){
        return e.date === dateStamp
    })
    let outIndex = this.timeOutEvents.find(function(e){
        return e.date === dateStamp
    })
    return (outIndex.hour - InIndex.hour)/100
}


const wagesEarnedOnDate = function (dateStamp) {
    let wage = hoursWorkedOnDate.call(this, dateStamp)*this.payPerHour
    return parseFloat(wage.toString())
}

const totalWages = (employeeObj)=>{
    let i = 0
    let sum=0
    employeeObj.timeOutEvents.forEach((element)=>{
        sum = sum + (element.hour - employeeObj.timeInEvents[i].hour)/100 * employeeObj.payPerHour
        i++;
    })
    return sum
}

const calculatePayroll = (employeeArray) => {
    return employeeArray.reduce(function(wage, date){
        return wage + allWagesFor.call(date)
    },0)
}

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(function(employee){
        return employee.firstName === firstName
    })
}