import usersModel from '../models/user.model.js';

class UserDBManager { // Cambia a PascalCase para seguir la convención de clases
    getAll() {
        return usersModel.find({});
    }

    getById(userId) {
        return usersModel.findById(userId);
    }

    getByEmail(userEmail) {
        return usersModel.findOne({ email: userEmail });
    }

    create(user) {
        return usersModel.create(user);
    }

    update(id, user) {
        return usersModel.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    delete(id) {
        return usersModel.deleteOne({ _id: id });
    }
}

export default UserDBManager; // Exporta la clase, no la instancia
