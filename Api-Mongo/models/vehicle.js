import {model, Schema} from 'mongoose'

const  VehicleSchema = new Schema({
    plate:{
        type: String,
        required: [true, 'Plate is required'],
        unique: true,
        minlength: [5,'Min 5 caracters'],
        maxlength: [6,'Max 6 caracters'],
    },
    color:{
        type: String,
        required: [true,'Color is required'],
        minlength: [3,'Min 2 caracters'],
    },
    model:{
        type: Number,
        required: [true,'Model is required'],
    }
})

// Create collection and the export
export default model('Vehicle', VehicleSchema, 'vehicle')