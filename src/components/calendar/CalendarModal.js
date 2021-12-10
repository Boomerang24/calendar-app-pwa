import React from 'react';
import Modal from 'react-modal';
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
Modal.setAppElement('#root'); // setAppElement es el elemento con el que se ligara el modal

export const CalendarModal = () => {

    const closeModal = () => {

    }

    return (
        <Modal
        className="modal"
        overlayClassName="modal-fondo"
        isOpen={ true }
        closeTimeoutMS={ 200 }
        onRequestClose={ closeModal }
        style={ customStyles }
        >
            <EventModal />
            
        </Modal>
    )
}
