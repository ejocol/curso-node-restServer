const {Schema, model} = require('mongoose');
const { schema } = require('./usuario');

const RolSchema = schema({

})

module.exports = model('Rol',RolSchema);