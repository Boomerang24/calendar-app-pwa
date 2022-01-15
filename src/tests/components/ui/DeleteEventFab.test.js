import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom'; // Para autocomplete

import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/events';

jest.mock('../../../actions/events', () => ({
    eventStartDelete: jest.fn() // Se simula la funcion
}));

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const initState = {};
const store = mockStore( initState );
store.dispatch = jest.fn(); // Para simular el dispatch


const wrapper = mount(
    <Provider store={ store } >
        <DeleteEventFab />
    </Provider>
);


describe('Pruenas en <DeleteEventFab />', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();
    });

    test('debe de llmar el eventStartDelete al hacer click', () => {
        
        wrapper.find('.btn').prop('onClick')();

        expect( eventStartDelete ).toHaveBeenCalled();
    });
});
