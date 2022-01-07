import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { eventStartAddNew, eventStartUpdate } from '../../actions/events';

const now = moment().minutes(0).seconds(0).add(1, 'hours');
const endDate = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endDate.toDate()
}

export const EventModal = ({ closeModal }) => {

    const { activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( endDate.toDate() );
    const [validTitle, setValidTitle] = useState(true);

    const [formValues, setFormValues] = useState( initEvent );

    const { title, notes, start, end} = formValues;

    useEffect(() => {
        
        if( activeEvent ){
            setFormValues( activeEvent );
        } else {
            setFormValues( initEvent );
        }

    }, [activeEvent, setFormValues]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const handleStartDateChange = ( e ) => {
        setDateStart( e );
        setFormValues({
            ...formValues,
            start: e
        });
    }
    
    const handleEndtDateChange = ( e ) => {
        setDateEnd( e );
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = ( e ) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if( momentStart.isSameOrAfter( momentEnd )){
            return Swal.fire('Error', 'La segunda fecha debe de ser mayor', 'error');
        }

        if ( title.trim().length < 2 ){
            setValidTitle( false );
        }

        //TODO: realizar grabacion en DB

        if( activeEvent ){

            dispatch( eventStartUpdate( formValues ));

        } else {
            
            dispatch( eventStartAddNew(formValues) );
        };


        closeModal();
        setFormValues( initEvent );
        setValidTitle( true );
        
    }

    return (
        <div>
            <h1> { ( activeEvent ) ? "Editando evento" : "Nuevo evento"} </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className='form-group'>
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                        format="h:mm a dd-MM-y"
                    />
                </div>

                <div>
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndtDateChange }
                        value={ dateEnd }
                        minDate={ dateStart }
                        className="form-control"
                        format="h:mm a dd-MM-y"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ !validTitle && 'is-invalid' } `}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </div>
    )
}
