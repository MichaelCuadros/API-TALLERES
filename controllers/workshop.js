const Workshop = require("../models/workshop");
const mongoosePaginate = require("mongoose-pagination");//para paginacion

//importar servicio
const jwt = require("../services/jwt");

const register = async (req, res) => {
    try {
        let params = req.body;
        params.user = req.user._id;

        const workshop_stock = await Workshop.find({ name: params.name });

        if (workshop_stock.length > 0) {
            return res.status(500).send({
                status: "error",
                message: "El taller ya existe",
            })
        } else {
            const workshopToSave = new Workshop(params)
            workshopToSave.save();
            return res.status(200).send({
                status: "success",
                message: "Successfull Registration",
                workshop: workshopToSave
            })
        }

    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error",
        })
    }
}

const Update = async (req, res) => {
    try {
        if (req.params._id) {
            const workshop_stock = await Workshop.findById({ _id: req.params._id });

            if (workshop_stock) {
                if (workshop_stock.user._id == req.user._id) {
                    const workshopUpdated = await Workshop.findByIdAndUpdate({ _id: req.params._id }, { name: req.body.name }, { new: true })
                        .populate("user", "_id name").select({ __v: 0 });

                    return res.status(200).send({
                        status: "success",
                        message: "Successfull Update",
                        workshop: workshopUpdated,
                    })
                } else {
                    return res.status(200).send({
                        status: "error",
                        message: "Este taller no te pertenece",
                    })
                }
            }
        }
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error",
        })
    }
}

const FindForText = async (req, res) => {
    try {
        //controlar la pagina
        let page = 1;
        if (req.params.page) {
            page = req.params.page;
        }
        page = parseInt(page);//se recomienda que page siempre sea un numero
        let itemsPerPage = 5; //5 workshops por pagina


        const text = req.params.text;
        const workshops = await Workshop.find({
            $or: [
                { name: { $regex: text, $options: "i" } }, // Búsqueda en el campo 'name' //la i es para que no importa si esta en mayus o minus
                { description: { $regex: text, $options: "i" } }, // Búsqueda en el campo 'description'
            ]
        }).paginate(page, itemsPerPage).populate("user", "_id name");

        const counter = await Workshop.find({
            $or: [
                { name: { $regex: text, $options: "i" } }, // Búsqueda en el campo 'name' //la i es para que no importa si esta en mayus o minus
                { description: { $regex: text, $options: "i" } }, // Búsqueda en el campo 'description'
            ]
        }).countDocuments();

        return res.status(200).send({
            status: "success",
            message: "Talleres encontrados",
            total: counter,
            page,
            itemsPerPage,
            workshops,
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error",
        })
    }
}

const WorkshopFindById = async (req, res) => {
    try {
        const workshop = await Workshop.findById(req.params._id)
        if (workshop) {
            return res.status(200).send({
                status: "success",
                message: "Taller encontrados",
                workshop
            })
        }
        else {
            return res.status(500).send({
                status: "error",
                message: "No se encontró un taller",
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: "success",
            message: "Taller encontrados",
        })
    }
}

const workshops = async (req, res) => {
    try {
        //controlar la pagina
        let page = 1;
        if (req.params.page) {
            page = req.params.page;
        }
        page = parseInt(page);//se recomienda que page siempre sea un numero
        let itemsPerPage = 5; //5 workshops por pagina


        const workshops = await Workshop.find().paginate(page, itemsPerPage).populate("user", "_id name");

        const counter = await Workshop.countDocuments();

        return res.status(200).send({
            status: "success",
            message: "Talleres encontrados",
            total: counter,
            page,
            itemsPerPage,
            workshops,
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error",
        })
    }
}

const MisWorkshops = async (req,res) => {
    try {
        const workshops = await Workshop.find({ user: req.user._id });
        if (workshops.length > 0) {
            return res.status(200).send({
                status: "success",
                message: "Talleres encontrados",
                workshops,
            })
        }
        else {
            return res.status(500).send({
                status: "error",
                message: "No se encontraron workshops",
            })
        }
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error",
        })
    }
}


module.exports = {
    register,
    Update,
    FindForText,
    workshops,
    WorkshopFindById,
    MisWorkshops
}