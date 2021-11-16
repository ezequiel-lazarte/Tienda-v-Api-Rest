const createError = require('http-errors');
const debug = require('debug')('app:module-users-controller');
const { UsersService } = require('./services');
const {Response} = require('../common/response');

module.exports.UsersController = {
    getUsers: async(req, res) => {
        try {
            let users = await UsersService.getAll();
            Response.success(res, 200, 'Lista de usuarios', users);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    getUser: async(req, res) => {
        try {
            const {params: {id}} = req;
            let user = await UsersService.getById(id);
            if(!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id}`, user);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    createUser: async(req, res) => {
        try {
            const {body} = req;
            const insertedId = await UsersService.create(body);
            if(!body || Object.keys(body).length === 0) {
                Response.error(res, new createError.BadRequest());
            } else {
                Response.success(res, 201, 'Usuario agregado', insertedId);
            }
            res.json(insertedId);
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    updateUser: async(req, res) => {
        try {
            const {params: {id}} = req;
            const {body} = req;
            let user = await UsersService.update(id, body);
            if(!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id} modificado`, Object(body));
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const {params: {id}} = req;
            const usuario = UsersService.getById(id);
            let user = UsersService.deleteById(id);
            if(!user) {
                Response.error(res, new createError.NotFound());
            } else {
                Response.success(res, 200, `Usuario ${id} eliminado`, usuario);
            }
        } catch (error) {
            debug(error);
            Response.error(res);
        }
    },
}