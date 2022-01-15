import { uiCloseModal, uiOpenModal } from '../../actions/ui';
import { uiReducer } from '../../reducers/uiReducer';


const initState = {
    modalOpen: false
}

describe('Pruebas en el uiReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {
        
        const action = {};
        const state = uiReducer( initState, action );

        expect( state ).toEqual( initState );
    });

    test('debe de abrir y cerrar el modal', () => {
        
        const modalOpen = uiOpenModal();
        const state = uiReducer( initState, modalOpen );

        expect( state ).toEqual({ modalOpen: true });

        const modalClose = uiCloseModal();
        const stateClose = uiReducer( state, modalClose );

        expect( stateClose ).toEqual( initState );
    });
});
