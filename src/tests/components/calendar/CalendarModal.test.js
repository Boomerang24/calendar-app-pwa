import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; // Para autocomplete

import { CalendarModal } from '../../../components/calendar/CalendarModal';

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn() // Se simula la funcion
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Algunas notas',
        }
    },
    ui: {
        modalOpen: true
    },
    auth: {
        uid: '1234',
        name: 'Alex'
    }
};

const store = mockStore( initState );
store.dispatch = jest.fn(); // Para simular el dispatch


const wrapper = mount(
    <Provider store={ store } >
        <CalendarModal />
    </Provider>
);

describe('Pruebas en <CalendarModal />', () => {
    
    test('debe de mostrar el modal', () => {
        
        expect( wrapper.find('Modal').prop('isOpen')).toBe( true );

    });

});
