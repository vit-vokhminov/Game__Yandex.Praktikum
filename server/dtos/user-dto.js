module.exports = class UserDto {
    id;
    email;
    login;
    level;
    record;
    avatar;
    isActivated;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.login = model.login;
        this.avatar = model.avatar;
        this.level = model.level;
        this.record = model.record;
        this.isActivated = model.isActivated;
    }
}
