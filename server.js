// Require express
const express = require("express");
// Initialize express
const app = express();
const PORT = 8080;
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));

const employees = [{
 empId: 1001,
 empName: "Sabbir",
 empSalary: "56000",
 empDesignation: "Trainer"
 },
 {
 empId: 1002,
 empName: "Amit",
 empSalary: "31000",
 empDesignation: "Trainer"
}];

app.post("/employees", (req, res) => {
// Check if request body is empty
if (!Object.keys(req.body).length) {
   return res.status(400).json({
     message: "Request body cannot be empty",
   });
}

const { empName,empSalary,empDesignation } = req.body;
if (!empName || !empSalary || !empDesignation) {
   res.status(400).json({
     message: "Ensure you sent empName,empSalary,empDesignation",
   });
}
const newEmployee = {
   empId: employees.length + 1,
   empName,
   empSalary,
   empDesignation
};
try {
   employees.push(newEmployee);
   res.status(201).json({
     message: "Successfully created a new Employee",
   });
} catch (error) {
   res.status(500).json({
     message: "Failed to create Employee",
   });
}
});
app.get("/employees", (req, res) => {
 try {
   res.status(200).json({
       employees
     });
 } catch (error) {
   res.status(500).json({
       message: "Failed to retrieve all employees",
     });
 }
});
app.get("/employees/:empId", (req, res) => {
 const id = parseInt(req.params.empId);
 console.log("ID in path parameter:"+id);
 try {
   let employee = employees.find((employee) => employee.empId === id);
console.log("Employee:"+employee);
   if (!employee) {
     return res.status(404).json({
       message: "Employee not found",
     });
   }
   res.status(200).json({
     employee,
   });
 } catch (error) {
   console.log(error);
   res.status(500).json({
     message: "Failed to retrieve employee",
   });
 }
});
app.put("/employees/:empId", (req, res) => {
 try {
   const empId = parseInt(req.params.empId);
   let employee = employees.find((employee) => employee.empId === empId);
   if (!employee) {
     return res.status(404).json({
       message: "Employee not found",
     });
   }
   const empIDX = employees.indexOf(employee);
   employees[empIDX].empName = req.body.empName || employees[empIDX].empName;
   employees[empIDX].empSalary = req.body.empSalary || employees[empIDX].empSalary;
  employees[empIDX].empDesignation = req.body.empDesignation || employees[empIDX].empDesignation;
   res.status(200).json({
     message: "Successfully updated Employee",
     employee,
   });
 } catch (error) {
   res.status(500).json({
     message: "Failed to retrieve Employee",
   });
 }
});
app.delete("/employees/:empId", (req, res) => {
 try {
   const id = req.params.empId;
   let employeeIDX = employees.findIndex((employee) => employee.empId === id);
   if (!employeeIDX) {
     res.status(404).json({
       message: "Employee not found",
     });
   }
   employees.splice(employeeIDX, 1);
   res.status(200).json({
     message: "Successfully deleted employee",
     employees,
   });
 } catch (error) {
  console.log(error);
   res.status(500).json({
     message: "Failed to delete employee",
   });
 }
});
app.delete("/employees", (req, res) => {
 try {
   employees.splice(0, employees.length);
   res.status(200).json({
     message: "Successfully deleted all employees",
     employees,
   });
 } catch (error) {
   res.status(500).json({
     message: "Failed to delete employees",
     x,
   });
 }
});
// create a server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
module.exports=app