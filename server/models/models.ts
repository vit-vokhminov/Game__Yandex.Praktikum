import { DataTypes } from 'sequelize';
import sequelize from '../db';

export const Post = sequelize.define('post', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, defaultValue: '' },
});

export const Message = sequelize.define('message', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, defaultValue: '' },
});

Post.hasMany(Message, {
    sourceKey: 'id',
});
Message.belongsTo(Post);

Message.hasMany(Message, { as: 'children', foreignKey: 'messageId' });
Message.belongsTo(Message, { as: 'parent', foreignKey: 'messageId' });
