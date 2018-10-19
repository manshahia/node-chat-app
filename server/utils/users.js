
class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = { id, name, room };
    this.users.push(user);

    return user;
  }

  removeUser (id) {
    //return user that was removed.
    var userToRemove = this.getUser(id);
    if(userToRemove) {
      this.users = this.users.filter( (user) => user.id !== id);
    }
    return userToRemove;
  }

  getUser (id) {
    return  this.users.find( user => user.id === id);
  }

  getUserList (room) {
    var users = this.users.filter( (user) => {
      return user.room === room;
    });

    var namesArray = users.map( (user) => {
      return user.name;
    });
    return namesArray;
  }
}

module.exports = {Users};
