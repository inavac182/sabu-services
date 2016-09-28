import { expect } from 'chai';
import Users from '../src/classes/users.class.es6';

describe('User tests', () => {
  let users;

  beforeEach(() => {
    users = new Users();
  });

    it('Should set name correctly', () => {
      users.add('Felipe','felipe.nava.co@gmail.com','mipass');
      expect(users.getName(1)).to.equal('Felipe');
    });
});