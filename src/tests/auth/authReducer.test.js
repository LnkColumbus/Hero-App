import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Tests in authReducer', () => {
    
    test('should return the default state', () => {
        const state = authReducer( { logged: false }, {} );

        expect(state).toEqual({ logged: false });
    });

    test('should authenticate and set the user name', () => {
        const state = authReducer( { logged: false }, {
            type: types.login,
            payload: { name: 'Marlon' },
        });

        expect( state ).toEqual({
            name: 'Marlon',
            logged: true
        });
    });

    test('should delete the user name and set logged in false', () => {
        const state = authReducer( { logged: true, name: 'Daniela' }, {
            type: types.logout,
        });

        expect( state ).toEqual( { logged: false } );
    });
    
})
