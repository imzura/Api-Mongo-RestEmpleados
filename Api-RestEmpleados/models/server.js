import express from "express";
import 'dotenv/config'
import dbConnection from '../database/config.js'
import { getEmployee, postEmployee, putEmployee, deleteEmployee } from "../controllers/employeesControllers.js";

export default class Server {
    constructor() {
        this.app = express()
        this.listen()
        this.dbConnection()
        this.pathEmployee = '/api/employee'
        this.route()
    }

    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running in PORT ${process.env.PORT}`)
        })
    }
    async dbConnection() {
        await dbConnection()
    }
    route() {
        this.app.use(express.json())
        this.app.get(this.pathEmployee, getEmployee)
        this.app.post(this.pathEmployee, postEmployee)
        this.app.put(this.pathEmployee, putEmployee)
        this.app.delete(this.pathEmployee+'/:id', deleteEmployee)
    }
}