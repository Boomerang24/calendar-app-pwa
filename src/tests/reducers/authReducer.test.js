import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initState = {
    checking: true
}

describe('Pruebas en authReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {
        
        const state = authReducer( initState, {} );

        expect( state ).toEqual( initState );
    });

    test('debe de iniciar y cerrar sesion', () => {

        const user = {
            uid: '123',
            name: 'testUser'
        };

        const actionLogin = {
            type: types.authLogin,
            payload: user
        };
        
        const state = authReducer( initState, actionLogin );
        
        expect( state ).toEqual({ checking: false, uid: '123', name: 'testUser' });

        const actionLogout = { type: types.authLogout };

        const newState = authReducer( state, actionLogout );

        expect( newState ).toEqual( { checking: false } );
    });
});
