const { Leaders, UserModel } = require('../models/models');
const ApiError = require('../exceptions/api-error');

class LeadersController {
    async getLeaders(req, res, next) {
        try {
            const leaders = await Leaders.findAll()
            if (!leaders) {
                throw ApiError.BadRequest('Не удалось получить список лидеров');
            }
            return res.json(leaders);
        } catch (e) {
            next(e);
        }
    }

    async editRecord(req, res, next) {
        try {
            const { id, login, avatar, level, record } = req.body;

            // Обновляем рекорд юзера
            const updateUserModel = await UserModel.update({ avatar, level, record }, { where: { id: id } })
            if (!updateUserModel) {
                throw ApiError.BadRequest('Не удалось обновить рекорд');
            }

            // Далее надо проверить, нужно ли обновить рекорд в таблице рекордов
            const updateUserLeaders = await Leaders.findOne({ where: { userId: id } })

            // Если такой юзер уже есть в таблице лидеров, обновим его рекорд
            if(updateUserLeaders){
                const updateLeader = await Leaders.update({ avatar, name: login, level, record }, { where: { userId: id } })
                if (!updateLeader) {
                    throw ApiError.BadRequest('Не удалось обновить рекорд юзера в таблице');
                }
            }else{
                // Получаем все рекорды
                const allLeaders = await Leaders.findAll()
                    .then((leaders) => {
                        return leaders.map(element => element.dataValues);
                    })
                    .catch((error) => {
                        throw ApiError.BadRequest('Не удалось получить список лидеров');
                    })

                // В таблице может храниться максимум 10 рекордов
                // Если всех записей меньше 10, то просто добавим ещё запись
                if(allLeaders.length < 11){
                    const newLeader = await Leaders.create({ userId: id, avatar, name: login, level, record })
                    if (!newLeader) {
                        throw ApiError.BadRequest('Не удалось добавить лидера');
                    }
                }else{
                    // Находим лидера с меньшим рекодром
                    const minUserRecord = allLeaders.reduce(async (accumulator, item, i, arr) => {
                        if(item.record < accumulator){
                            return item.record;
                        }
                        return accumulator;
                    }, Infinity);
                    
                    // Делаем проверку, если минимальный рекодр меньше рекорда юзер, обновляем его
                    if(minUserRecord < user.record ){
                        const addNewLeader = await Leaders.update({ avatar, name: login, level, record }, { where: { userId: id } })
                        if (!addNewLeader) {
                            throw ApiError.BadRequest('Не удалось добавить рекорд в таблицу');
                        }
                    }
                }
            }

            return res.json(updateUserModel);
        } catch (e) {
            next(e);
        }
    };
}

module.exports = new LeadersController();