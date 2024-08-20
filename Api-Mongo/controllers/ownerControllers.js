import Owner from "../models/owner.js"

export async function getOwner(req, res) {
    try {
        const owners = await Owner.find()
        res.json(owners)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export async function postOwner(req, res) {
    const body = req.body
    try {
        const owner = new Owner(body)
        await owner.save()
        res.status(201).json('Owner create successfully')
    } catch (error) {
        res.status(500).json('Error')
    }
}

export async function putOwner(req, res) {
    const { name, phone, email } = req.body //destructuring data from body
    try {
        // find and update the object in mongo
        await Owner.findOneAndUpdate({ phone: phone }, { name: name, email: email })
        res.json('Owner update successfully')
    } catch (error) {
        res.status(500).json('Error')
    }
}

export async function deleteOwner(req, res) {
    const _id = req.params.id
    try {
        await Owner.findByIdAndDelete({ _id: _id })
        res.json('Owner deleted successfully')
    } catch (error) {
        res.status(404).json('Owner dont found')
    }
}