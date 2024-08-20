import express, { Router } from 'express'
import 'dotenv/config' // Permite trabjar con variables de entorno
import dbConnection from '../database/config.js'
import { getVehicle, postVehicle, putVehicle, deleteVehicle } from '../controllers/vehicleControllers.js'
import { getOwner, postOwner, putOwner, deleteOwner } from '../controllers/ownerControllers.js'

export default class Server {
    constructor() {
        this.app = express()
        this.listen()
        this.dbConnection()
        this.pathVehicle = '/api/vehicle' // link public API
        this.pathOwner = '/api/owner' // link public API
        this.route()
    }

    listen() { // Method to listen the port
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running in PORT ${process.env.PORT}`)
        })
    }
    async dbConnection() { //call method dbConnection to conect to mongo
        await dbConnection()
    }
    route() {
        this.app.use(express.json())
        this.app.get(this.pathVehicle, getVehicle)
        this.app.post(this.pathVehicle, postVehicle)
        this.app.put(this.pathVehicle, putVehicle)
        this.app.delete(this.pathVehicle+'/:id', deleteVehicle)
        this.app.get(this.pathOwner, getOwner)
        this.app.post(this.pathOwner, postOwner)
        this.app.put(this.pathOwner, putOwner)
        this.app.delete(this.pathOwner+'/:id', deleteOwner)
    }
}

