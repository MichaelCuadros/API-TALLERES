const Comment = require('../models/comment');
const Workshop = require('../models/workshop');

const register = async (req, res) => {
    const userIdentity = req.user;

    try {
        const workshopsFound = await Workshop.findOne({ _id: req.params._id });

        if (workshopsFound) {
            if (req.body.text) {
                let comment = new Comment({
                    user: userIdentity._id,
                    text: req.body.text,
                    workshop: req.params._id
                });

                if (req.body.calification) {
                    comment.calification = parseInt(req.body.calification);
                }

                comment.save();
                return res.status(200).send({
                    status: "success",
                    message: "Comentario registrado",
                    comment
                });
            }
        } else {
            return res.status(500).send({
                status: "error",
                message: "No se encontró el taller",
            });
        }
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "Error en el servidor",
        });
    }
};

const findByIdWorkshop = async (req, res) => {
    try {
        const idToFind = req.params._id;

        const comments = await Comment.find({ workshop: idToFind });
        return res.status(200).send({
            status: "success",
            message: "Busqueda completada",
            total: comments.length,
            comments,
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "error"
        })
    }
};

const calification = async (req, res) => {
    try {
        const idToFind = req.params._id;
        const comments = await Comment.find({ workshop: idToFind });
        let calification = 0;
        let commentsWithCalification = 0;
        for (i = 0; i < comments.length; i++) {
            if (comments[i].calification) {
                calification = calification + comments[i].calification;
                commentsWithCalification++;
            }
        }
        calification = calification / commentsWithCalification;


        return res.status(200).send({
            status: "success",
            message:"Calificacion obtenida correctamente",
            calification: parseInt(calification)
        })
    } catch (error) {
        return res.status(500).send({
            status: "error",
            message: "error"
        })
    }
}

module.exports = {
    register,
    findByIdWorkshop,
    calification
}