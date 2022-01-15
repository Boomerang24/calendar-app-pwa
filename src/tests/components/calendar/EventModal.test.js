import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moment from 'moment';

import '@testing-library/jest-dom'; // Para autocomplete
import { act } from '@testing-library/react'

import { EventModal } from '../../../components/calendar/EventModal';
import { eventClearActive, eventStartAddNew, eventStartUpdate } from '../../../actions/events';
import { uiCloseModal } from '../../../actions/ui';
import Swal from 'sweetalert2';

jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(), // Se simula la funcion
    eventClearActive: jest.fn(),
    eventStartAddNew: jest.fn()
}));

jest.mock('../../../actions/ui', () => ({
    uiCloseModal: jest.fn()
}));

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: endDate.toDate()
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

const closeModal = () => { // Funcion pasada por prompt es simulada
    uiCloseModal()
    eventClearActive()
};

const wrapper = mount(
    <Provider store={ store } >
        <EventModal closeModal={ closeModal }/>
    </Provider>
);

describe('Pruebas en <EventModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });
    
    test('debe de llamar la accion de actualizar y cerrar modal', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartUpdate ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( uiCloseModal ).toHaveBeenCalled();
    });
    
    test('debe de mostrar error si falta el titulo', () => {
    
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe( true );

    });

    test('debe de crear un nuevo evento', () => {

        const initState = {
            calendar: {
                events: [],
                activeEvent: null
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
                <EventModal closeModal={ closeModal }/>
            </Provider>
        );

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'Hola pruebas',
            notes: ''
        });

        expect( eventClearActive ).toHaveBeenCalled();
        
    });

    test('debe de validar las fechas', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'El ultimo test ahora si'
            }
        });

        const hoy = new Date();

        act(() => {
            
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( Swal.fire ).toHaveBeenCalledWith(
            "Error", "La segunda fecha debe de ser mayor", "error"
        );

    });

});
