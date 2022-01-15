import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; // Para autocomplete

import { AppRouter } from '../../routes/AppRouter';
import { MemoryRouter } from 'react-router-dom';
import { startChecking } from '../../actions/auth';

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

// store.dispatch = jest.fn(); // Para simular el dispatch

describe('Pruebas en <AppRouter />', () => {
    
    test('debe mostrar el espere...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <AppRouter />
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h5').exists() ).toBe( true );
    });

    test('debe mostrar la ruta publica', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };
        const store = mockStore( initState );

        const wrapper = mount(
            <Provider store={ store } >
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.login-container').exists() ).toBe( true );
    });

    test('debe mostrar la ruta privada', () => {

        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'soyElUser'
            },
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            }
        };

        const store = mockStore( initState );
        
        const wrapper = mount(
            <Provider store={ store } >
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.calendar-screen').exists() ).toBe( true );
    });
    

});
