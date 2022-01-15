import React from 'react';

import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { eventClearActive } from '../../actions/events';
import { uiCloseModal } from '../../actions/ui';

import { EventModal } from './EventModal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

if( process.env.NODE_ENV !== 'test' ){
    Modal.setAppElement('#root'); // setAppElement es el elemento con el que se ligara el modal
}

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector(state => state.ui);

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActive() );
    }

    return (
        <Modal
        className="modal"
        overlayClassName="modal-fondo"
        isOpen={ modalOpen }
        closeTimeoutMS={ 200 }
        onRequestClose={ closeModal }
        style={ customStyles }
        /* Usado para pruebas en modal, por que no tiene espacio para redibujar */
        ariaHideApp={ !process.env.NODE_ENV === 'test' } 
        >
            <EventModal closeModal={ closeModal }/>
            
        </Modal>
    )
}
