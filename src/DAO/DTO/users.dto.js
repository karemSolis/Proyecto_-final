export default class UserDTO { //clase 

  constructor(user) {
      //extrae los valores y los otorga a userdto
      this.first_name = user.first_name
      this.last_name = user.last_name
      this.email = user.email
      this.age= user.age
      this.rol= user.rol
  }
}