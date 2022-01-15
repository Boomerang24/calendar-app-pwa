import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';

import '@testing-library/jest-dom'; // Para autocomplete

import { startChecking, startLogin, startLogout, startRegister } from '../../actions/auth';
import { types } from '../../types/types';
import * as fetchModule from '../../helpers/fetch';

jest.mock( 'sweetalert2', () => ({
    fire: jest.fn()

}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};

let store = mockStore( initState );

Storage.prototype.setItem = jest.fn();

let token = '';

describe('Pruebas en las acciones Auth', () => {
    
    beforeEach( () => {
        store = mockStore( initState );
        jest.clearAllMocks();
    });

    test('startLogin correcto', async() => {
        
        await store.dispatch( startLogin('test@gmail.com', '123456') );

        const actions = store.getActions();

        expect( actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalled();
        expect( localStorage.setItem ).toHaveBeenCalledWith('token', expect.any(String));
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        /*** Recuperar argumentos en funciones JEST ***/
        // console.log( localStorage.setItem.mock.calls );

        // console.log( localStorage.setItem.mock.calls[0][1] ); // Obtener token
        token = localStorage.setItem.mock.calls[0][1];

    });

    test('startLogin incorrect', async() => {
        
        await store.dispatch( startLogin('notAtest@gmail.com', '123456') );

        let actions = store.getActions();

        expect( actions ).toEqual([]);
        expect( Swal.fire ).toHaveBeenCalledWith(
            'Error', 'El usuario no existe con ese email', 'error'
        );

        await store.dispatch( startLogin('test@gmail.com', '1234567') );
        actions = store.getActions();

        expect( Swal.fire ).toHaveBeenCalledWith(
            'Error', 'Password incorrecto', 'error'
        );

    });

    test('startRegister correcto', async() => {

        fetchModule.fetchSinToken = jest.fn( () => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Ramiris',
                    token: 'ABC123DEF456'
                }
            }
        }));
        
        await store.dispatch( startRegister('test@test.com', '123456', 'soyElTest') );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Ramiris'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', 'ABC123DEF456');
        expect( localStorage.setItem ).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });

    test('startChecking correcto', async() => {

        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: '123',
                    name: 'Ramiris',
                    token: '38273218'
                }
            }
        }));

        await store.dispatch( startChecking() );

        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Ramiris'
            }
        });

        expect( localStorage.setItem ).toHaveBeenCalledWith('token', '38273218' );

    });

    test('startLogout correcto', () => {

        Storage.prototype.clear = jest.fn();

        store.dispatch( startLogout() );

        const actions = store.getActions();

        expect( localStorage.clear ).toHaveBeenCalled();

        expect( actions[0] ).toEqual({ type: types.eventLogout });
        expect( actions[1] ).toEqual({ type: types.authLogout });
    });
});
