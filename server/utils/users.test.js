const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users;
    users.users = [{
      id: '1',
      name: 'Larry',
      room: 'Starbucks'
    },{
      id: '2',
      name: 'Sean',
      room: 'Cottage'
    },{
      id: '3',
      name: 'Brian',
      room: 'Starbucks'
    }];
  });

  it('should add new user', () => {
    let users = new Users;
    let user = {
      id: '123',
      name: 'Larry',
      room: 'Starbucks'
    };
    let resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);

  })

  it('should remove a user', () => {
    let userId = '2';
    let user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    // pass in a value not in seed data
    // assert the array has not changed
    let userId = '99';
    let user = users.removeUser(userId);

    expect(user).toBe(undefined);
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    let userId= ('2');
    let user = users.getUser(userId);
    expect(user.id).toBe(userId);
  });

  it('should not find a user', () => {
    // pass an id not in seed data and no user returned
    let userId= ('39');
    let user = users.getUser(userId);
    expect(user).toBe(undefined);
  });

  it('should return names from Starbucks room seed data', () => {
      let userList = users.getUserList('Starbucks');

      expect(userList).toEqual(['Larry', 'Brian']);
  });

  it('should return names from Cottage room seed data', () => {
      let userList = users.getUserList('Cottage');

      expect(userList).toEqual(['Sean']);
  });
});
