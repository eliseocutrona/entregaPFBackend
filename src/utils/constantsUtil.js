import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/img');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

export const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    // Puedes agregar más roles aquí si es necesario
};

export const uploader = multer({storage});