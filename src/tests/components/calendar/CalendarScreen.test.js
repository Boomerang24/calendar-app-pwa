// Comprobar funciones en componentes de terceros

import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; // Para autocomplete
import { act } from '@testing-library/react'

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive, eventStartLoading } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn() // Se simula la funcion
}));

Storage.prototype.setItem = jest.fn();

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {
    calendar: {
        events: []
    },
    ui: {
        modalOpen: false
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
        <CalendarScreen />
    </Provider>
);


describe('Pruebas en <CalendarScreen />', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('pruebas con las interacciones del calendario', () => {
        
        const calendar = wrapper.find('Calendar');
        // console.log( calendar.exists() ); // if true, confirmamos que existe

        const calendarMessages = calendar.prop('messages');
        expect( calendarMessages ).toEqual( messages );

        calendar.prop('onDoubleClickEvent')(); // Se dispara el evento doubleClick

        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 'Hello' });
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'Hello' });

        act(() => {
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week');            
        });

    });
});
