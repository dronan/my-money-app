const getCollection = require('./user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const env = require('../../.env');
// const ObjectId = require('mongodb').ObjectId;

const emailRegex = /\S+@\S+\.\S+/;
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/;

// Local variable to store the collection
let coll;

// Get the collection and store it in the variable above
getCollection().then(collection => {
  coll = collection;
});

const sendErrorsFromDB = (res, dbErrors) => {
    const errors = [];
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({ errors });
};

// Function to login
const login = async (req, res, next) => {
    const email = req.body.email || '';
    const password = req.body.password || '';

    try {
        const user = await coll.findOne({ email }, { projection: { password: 1 } });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ ...user }, env.authSecret, {
                expiresIn: '1 day',
            });
            const { name, email } = user;
            res.json({ name, email, token });
        } else {
            res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
        }
    } catch (error) {
        sendErrorsFromDB(res, error);
    }
};

const validateToken = async (req, res, next) => {
    const token = req.body.token || '';
    jwt.verify(token, env.authSecret, function (err, decoded) {
        return res.status(200).send({ valid: !err });
    }
)};

const signUp = async (req, res, next) => {
    const name = req.body.name || '';
    const email = req.body.email || '';
    const password = req.body.password || '';
    const confirmPassword = req.body.confirm_password || '';

    if (!email.match(emailRegex)) {
        return res.status(400).send({ errors: ['O e-mail informado está inválido'] });
    }

    if (!password.match(passwordRegex)) {
        return res.status(400).send({
            errors: [
                'Senha precisa ter: uma letra maiúscula, uma letra minúscula, um número, uma caractere especial(@#$%) e tamanho entre 6-20.',
            ],
        });
    }

    const salt = bcrypt.genSaltSync();
    const passwordHash = bcrypt.hashSync(password, salt);

    if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
        return res.status(400).send({ errors: ['Senhas não conferem.'] });
    }

    try {
        const user = await coll.findOne({ email }, { projection: { email: 1 } });
        if (user) {
            return res.status(400).send({ errors: ['Usuário já cadastrado.'] });
        } else {
            const newUser = await coll.insertOne({ name, email, password: passwordHash });
            res.json({ name, email });
        }
    } catch (error) {
        sendErrorsFromDB(res, error);
    }
};

module.exports = { login, signUp, validateToken };