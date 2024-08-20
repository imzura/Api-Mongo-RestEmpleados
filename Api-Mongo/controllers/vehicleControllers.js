import Vehicle from '../models/vehicle.js'; // Importación corregida

export async function getVehicle(req, res) {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function postVehicle(req, res) {
    const body = req.body;
    try {
        const vehicle = new Vehicle(body);
        await vehicle.save();
        res.status(201).json('Vehicle created successfully');
    } catch (error) {
        res.status(500).json('Error');
    }
}

export async function putVehicle(req, res) {
    const { plate, color, model } = req.body; // Desestructuración de datos desde body
    try {
        // Encontrar y actualizar el objeto en Mongo
        await Vehicle.findOneAndUpdate({ plate: plate }, { color: color, model: model });
        res.status(204).json('Vehicle updated successfully');
    } catch (error) {
        res.status(500).json('Error');
    }
}

export async function deleteVehicle(req, res) {
    const _id = req.params.id;
    try {
        await Vehicle.findByIdAndDelete({ _id: _id });
        res.json('Vehicle deleted successfully');
    } catch (error) {
        res.status(404).json('Vehicle not found');
    }
}
