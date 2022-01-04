import Swal from "sweetalert2";
import { fetchSinToken } from "../helpers/fetch"
import { types } from "../types/types";


export const startLogin = ( email, password ) => {
    // Al ser tarea async, se utiliza el return con async
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // Grabar la fecha exacta para saber cuanto tiempo falta para que el token expire

            dispatch( login({
                uid: body.uid,
                name: body.name
            }))
        } else { // body.ok = false
            Swal.fire('Error', body.msg, 'error' );
        }
    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() ); // Grabar la fecha exacta para saber cuanto tiempo falta para que el token expire

            dispatch( login({
                uid: body.uid,
                name: body.name
            }))
        } else { // body.ok = false
            Swal.fire('Error', body.msg, 'error' );
        }
    }
}

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
})
