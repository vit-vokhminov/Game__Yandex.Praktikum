const userService = require('../service/user-service');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/api-error');
const { UserModel } = require('../models/models');
const UserDto = require('../dtos/user-dto');

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errors.array())
                );
            }
            const { email, login, password } = req.body;
            const userData = await userService.registration(
                email,
                login,
                password
            );
            // создаём куку с refreshToken и указываем срок годности, httpOnly это запрет на изменение значение через js браузера
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            // удаляю refreshToken из БД Token
            const token = await userService.logout(refreshToken);
            // удаляю куку
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    // Активация email при переходе с высланной ссылки на почту
    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    // проверка авторизации при загрузке сайта
    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async editUser(req, res, next) {
        try {
            const { id, email, login } = req.body;

            const updateUser = await UserModel.update({ email, login }, { where: { id: id } })
            if (!updateUser) {
                throw ApiError.BadRequest('Не удалось обновить ваши данные');
            }
            const user = await UserModel.findOne({ where: {id: id}})
            if (!user) {
                throw ApiError.BadRequest('Что-то пошло не так')
            }

            const userDto = new UserDto(user.dataValues);

            return res.json(userDto);
        } catch (e) {
            next(e);
        }
    };

    async editUserPassword(req, res, next) {
        try {
            const { id, password } = req.body;

            const userData = await userService.editPassword(
                id,
                password
            );

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new UserController();
