const User = require("../models/user");
const bcrypt = require("bcrypt");//para encriptar

//importar servicio
const jwt = require("../services/jwt");


const register = async (req, res) => {
    let params = req.body;
    if (!params.name || !params.username || !params.password) {

        return res.status(500).send({
            status: "error",
            message: "Faltan datos",
            params
        })
    } else {
        const user_stock = await User.find({ username: params.username });
        if (user_stock && user_stock.length >= 1) {
            return res.status(500).send({
                status: "error",
                message: "El username ya existe",
                params
            })
        }

        let user_to_save = new User(params);

        //cIFRAR CONTRASEÑA
        let pwd = await bcrypt.hash(params.password, 10);//diez veces lo cifrará
        user_to_save.password = pwd;

        user_to_save.save();

        return res.status(200).send({
            status: "success",
            message: "Successfull Registration",
            user_to_save
        })
    }
}

const login = async (req, res) => {
    try {
        //recoger parametros
        const params = req.body;
        if (!params.username || !params.password) {
            return res.status(400).send({
                status: "error",
                message: "Faltan datos por enviar"
            })
        } else {

            //buscar si el usuario existe
            const userFound = await User.findOne({ username: params.username });


            //comprobar contraseña
            const pwd = bcrypt.compareSync(params.password, userFound.password);


            //si sale pwd falso
            if (!pwd) {
                return res.status(400).send({
                    status: "error",
                    message: "Contraseña Incorrecta",
                })

            } else {
                //crear token
                const token = jwt.createToken(userFound);

                //sacar la contra
                const userWithoutPassword = { ...userFound.toObject() };
                delete userWithoutPassword.password;

                return res.status(200).send({
                    status: "success",
                    message: "Welcome",
                    user: userWithoutPassword,
                    token
                })
            }
        }
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error",
        })
    }
}


const userFindById = async (req, res) => {
    if (req.params._id) {
        try {

            let userFound = await User.findById({ _id: req.params._id });
            //sacar la contra
            const userWithoutPassword = { ...userFound.toObject() };
            delete userWithoutPassword.password;

            return res.status(200).send({
                status: "success",
                message: "Busqueda exitosa de usuario",
                user: userWithoutPassword
            })

        } catch (error) {
            return res.status(500).send({
                status: "error",
                message: "La busqueda fue incorrecta",
            })
        }
    } else {
        return res.status(404).send({
            status: "error",
            message: "No se encontró el id, por favor ingrese un id",
        })
    }
}

const userUpdate = async (req, res) => {
    let userUpdated = req.body;
    try {
        if (req.user._id) {
            if (userUpdated.password) {
                const pwd = await bcrypt.hash(userUpdated.password, 10);
                userUpdated.password = pwd;
            }

            const user = await User.findByIdAndUpdate({ _id: req.user._id }, userUpdated, { new: true });

            return res.status(200).send({
                status: "success",
                message: "Se editó correctamente el usuario",
                user
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error al actualizar"
        });
    }
};

const users = async (req, res) => {
    const users = await User.find().select({ password: 0, __v: 0 });
    return res.status(200).send({
        status: "success",
        message: "Lista de usuarios",
        users
    })
}


module.exports = {
    register,
    login,
    userFindById,
    userUpdate,
    users
}