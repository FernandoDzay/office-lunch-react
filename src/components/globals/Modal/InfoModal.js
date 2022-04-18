import React from 'react';
import Modal from './Modal';

export default function InfoModal({active, title, description, type, handleCloseModal}) {

    const nextStep = active ? type : null;

    return (
        <Modal
            active={active}
            nextStep={nextStep}
            nextStepTitle={title}
            nextStepDescription={description}
            handleCloseModal={handleCloseModal}
        />
    ); 
}