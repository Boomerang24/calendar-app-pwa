import { types } from "../../types/types";

describe('Pruebas en Types', () => {

    const mycurrentTypes = {

        uiOpenModal: '[ui] Open Modal',
        uiCloseModal: '[ui] Close Modal',
    
        eventSetActive: '[event] Set Active',
        eventLogout: '[event] Clear events upon Logout',
    
        eventStartAddNew: '[event] Start add new',
        eventAdded: '[event] Event Added',
        eventClearActive: '[event] Clear Active Event',
        eventUpdated: '[event] Event Updated',
        eventDeleted: '[event] Event Deleted',
        eventsLoaded: '[event] Events loaded',
    
        authCheckingFinish: '[auth] Finished checking state',
        authLogin: '[auth] Start login',
        authLogout: '[auth] Logout'
    
    }
    
    test('los types deben de ser iguales', () => {
        
        expect( types ).toEqual( mycurrentTypes );
    });
});
