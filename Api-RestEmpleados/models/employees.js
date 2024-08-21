import { model, Schema } from 'mongoose';

function calculateDaysWorked(entryDate, withdrawalDate) {
    const entryDateObj = new Date(entryDate);
    const withdrawalDateObj = new Date(withdrawalDate);
    const timeDifference = withdrawalDateObj - entryDateObj;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

function calculateSeverance(salary, daysWorked) {
    return (salary * daysWorked) / 360;
}

const EmployeeSchema = new Schema({
    document: {
        type: Number, 
        unique: true, 
        required: [true, 'Document is required'], 
        minlength: [6, 'Min 6 characters'],
        maxlength: [8, 'Max 8 characters']
    },
    names: {
        type: String,
        required: [true, 'Names are required']
    },
    entryDate: {
        type: Date,
        required: [true, 'An entry date is required']
    },
    withdrawalDate: {
        type: Date
    },
    salary: {
        type: Number,
        required: [true, 'A salary is required']
    },
    daysWorked: {
        type: Number
    },
    layoffs: {
        type: Number
    }
});

EmployeeSchema.pre('save', function(next) {
    if (this.entryDate && this.withdrawalDate) {
        this.daysWorked = calculateDaysWorked(this.entryDate, this.withdrawalDate);
        this.layoffs = calculateSeverance(this.salary, this.daysWorked);
    }
    next();
});

export default model('Employee', EmployeeSchema, 'employee');


