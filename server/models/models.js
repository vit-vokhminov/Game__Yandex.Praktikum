const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const UserModel = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    login: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    avatar: { type: DataTypes.STRING, defaultValue: '' },
    level: { type: DataTypes.STRING, defaultValue: '' },
    record: { type: DataTypes.INTEGER, defaultValue: 0 },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING },
});

const TokenModel = sequelize.define('token', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    login: { type: DataTypes.STRING, allowNull: false },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
});

const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, defaultValue: '' },
});

const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, defaultValue: '' },
});

const Leaders = sequelize.define('leaders', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {type: DataTypes.INTEGER, primaryKey: true},
    avatar: { type: DataTypes.STRING, defaultValue: '' },
    name: { type: DataTypes.STRING, allowNull: false },
    level: { type: DataTypes.STRING, defaultValue: '' },
    record: { type: DataTypes.INTEGER, defaultValue: 0 },
});

UserModel.hasMany(TokenModel, {
    sourceKey: 'id',
});
TokenModel.belongsTo(UserModel);

Post.hasMany(Message, {
    sourceKey: 'id',
});
Message.belongsTo(Post);

Message.hasMany(Message, { as: 'children', foreignKey: 'messageId' });
Message.belongsTo(Message, { as: 'parent', foreignKey: 'messageId' });

module.exports = {
    UserModel,
    TokenModel,
    Post,
    Message,
    Leaders,
};



// A.hasOne(B) означает, что между A и B существуют отношения один-к-одному, при этом, внешний ключ (foreign key) определяется в целевой модели (B).
// A.belongsTo(B) — отношения один-к-одному, внешний ключ определяется в источнике (A).
// A.hasMany(B) — отношения один-ко-многим, внешний ключ определяется в целевой модели (B).
// A.belongsToMany(B, { through: 'C' }) означает, что между A и B существуют отношения многие-ко-многим, таблица C выступает в роли связующего звена 
// между ними через внешние ключи (например, aId и bId). Sequelize автоматически создает модель C при ее отсутствии, определяя в ней соответствующие ключи.