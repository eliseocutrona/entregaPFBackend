export default class UserDTOSession {
    constructor(user) {
        this.name = `${user.firstName} ${user.lastName}`;
        this.role = user.role;
        this.id = user.id;
    }
}
