var functions = require('../../functions/db');

describe('Test database functions', () => {
    test('gets user from database by email', async () => {
        let user = await functions.getUserByEmail('dmr0@protonmail.com');
        expect(user.id).toEqual(3);
    });

    test('gets user from database by id', async () => {
        let user = await functions.getUserById(4);
        expect(user.email).toMatch('test@example.com');
    });

    test('gets user from database by id', async () => {
        let user = await functions.updateUserById({firstName: "Jamie"}, 4);
        user = await functions.getUserById(4);
        expect(user.firstName).toMatch('Jamie');
    });
});