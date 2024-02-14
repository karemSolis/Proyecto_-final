import UserDTO from "../DAO/DTO/users.dto.js";

export default class UserRepository {
    constructor(dao) {
        this.dao = dao
    }

    getUsers = async () => {
        let result = await this.dao.get()
        return result
    }

    createUser = async (user) => {
        let userToInsert = new UserDTO(user)
        let result = await this.dao.addUser(userToInsert)
        return result
    }
    getRolUser = async (email) => {
        let result = await this.dao.getUserRoleByEmail(email)
        return result
    }

    updUserRol = async ({ uid, rol }) => {
        let result = await this.dao.updateUserRoleById({ uid, rol })
        return result
    }



}