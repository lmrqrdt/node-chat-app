// const _ = require('lodash');

// [{
//   id: '/alblemerm',
//   name: 'Larry',
//   room: 'Starbucks'
// }]

class Users {
  constructor () {
    this.users = [];
  }
  addUser (id, name, room) {
    let user = {id, name, room};
    this.users.push(user);
    return user;
  }
  removeUser (id) {
    // let users = this.users;
    let user = this.users.filter((user) => user.id === id)[0];

    if (user) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return user;
  }
  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
    // return users;
  }
  getUserList (room) {
    let users = this.users.filter((user) => user.room === room);
    let namesArray = users.map((user) => user.name);

    return namesArray;
  }
  getAllRoomsList () {
    let rooms = this.users.map((user) => ({
      name: user.room,
      numUsers: this.getUserList(user.room).length,
  }));

    const unique = rooms.filter((v, i, a) => {
      return a.map((a1) => a1.name).indexOf(v.name) === i;
    }).sort((a, b) => {
      const diff = b.numUsers - a.numUsers;

      if (diff === 0) {
        return b.name < a.name;
      }
      return diff;
    });

    return unique;
  }
}

module.exports = {Users};
// class Person {
//   constructor (name, age) {
//     this.name = name;
//     this.age = age;
//   }
//   getUserDesciption () {
//     return `${this.name} is ${this.age} years old.`
//   }
// }
//
// let me = new Person ('Larry', 65);
// let description = me.getUserDesciption();
// console.log(description);
