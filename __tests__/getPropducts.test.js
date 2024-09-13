import getUsers from '../src/hooks/fungishop/getUsers';

global.alert = jest.fn();

describe('getUsers function', () => {
  test('getUsers should not return null', () => {
    expect(getUsers()).not.toBeNull();
  });
});