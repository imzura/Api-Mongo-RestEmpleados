import Employee from "../models/employees.js"

export async function getEmployee(req, res) {
    try {
        const employees = await Employee.find()
        res.json(employees)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function postEmployee(req, res) {
    const { document, names, entryDate, withdrawalDate, salary, daysWorked, layoffs } = req.body
    try {
        const employee = new Employee({
            document,
            names,
            entryDate,
            withdrawalDate,
            salary,
            daysWorked,
            layoffs
        })
        await employee.save()
        res.status(201).json('employee created successfully')
    } catch (error) {
        res.status(500).json('error creating employee')
    }
}

export async function putEmployee(req, res) {
    const { document, names, entryDate, withdrawalDate, salary } = req.body;
    const daysWorked = entryDate && withdrawalDate ? calculateDaysWorked(entryDate, withdrawalDate) : null;
    const layoffs = salary && daysWorked ? calculateSeverance(salary, daysWorked) : null;
    try {
        await Employee.findOneAndUpdate({ document: document },{names, entryDate, withdrawalDate, salary, daysWorked, layoffs},
            { new: true });
        res.json('Employee updated successfully');
    } catch (error) {
        res.status(500).json('Error updating employee');
    }
}

function calculateDaysWorked(entryDate, withdrawalDate) {
    const entryDateObj = new Date(entryDate);
    const withdrawalDateObj = new Date(withdrawalDate);
    const timeDifference = withdrawalDateObj - entryDateObj;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

function calculateSeverance(salary, daysWorked) {
    return (salary * daysWorked) / 360;
}

export async function deleteEmployee(req, res) {
    const _id = req.params.id;
    try {
        await Employee.findByIdAndDelete({ _id: _id })
        res.json('employee deleted successfully');
    } catch (error) {
        res.status(404).json('employee not found');
    }
}