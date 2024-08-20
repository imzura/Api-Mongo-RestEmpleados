import {model, Schema} from 'mongoose'

const OwnerSchema = new Schema ({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    phone:{
        type: Number,
        required: [true, 'Phone is required']
    },
    email:{
        type: String,
        required: [true, 'Email is required']
    }
})

export default model('Owner', OwnerSchema, 'owner')