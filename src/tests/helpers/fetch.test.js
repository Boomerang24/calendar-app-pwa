import { fetchConToken, fetchSinToken } from '../../helpers/fetch';

describe('Pruebas en el helper Fetch', () => {

    let token = '';
    
    test('fetchSinToken debe de funcionar', async() => {

        const email = 'test@gmail.com';
        const password = '123456';
        
        const resp = await fetchSinToken( 'auth', { email, password }, 'POST');

        expect( resp instanceof Response ).toBe( true );

        const body = await resp.json();
        expect( body.ok ).toBe( true );

        // Se establece el token
        token = body.token;
    });

    test('fetchConToken obtener eventos', async() => {
        
        localStorage.setItem('token', token );
        
        const resp = await fetchConToken( 'events' );
        const body = await resp.json();

        expect( body.ok ).toBe( true );

    });

    test('fetchConToken eliminar evento', async() => {

        localStorage.setItem('token', token );
        
        const resp = await fetchConToken( 'events/61d39f2fafe48762d94660f1', {}, 'DELETE' );
        const body = await resp.json();

        expect( body.msg ).toBe( 'No existe evento con ese ID' );
    });
});
