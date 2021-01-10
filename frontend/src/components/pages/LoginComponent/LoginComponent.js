// login proccess flow : 
// on submit the form sends the data back to this login componenet and trigers its show modal function
// on google button clicked the button sends the google credetintals to the login copnente and trigers its send data function
// login in component sends the data to the back end and shows loading component untill the process finishs


import React, { useState, useCallback, useEffect } from 'react'
import { Container } from 'reactstrap'
import GooglebtnComponent from './GooglebtnComponent/GooglebtnComponent'
import "./LoginComponent.css"
import zc_logo from './zc_logo.png'

import 'bootstrap/dist/css/bootstrap.min.css';

import FormComponent from './FormComponent/FormComponent'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default function LoginComponent() {

    return (
        <React.Fragment>
            {
                // gdata &&
                <Container fluid style={{ background: "rgba(164, 223, 234, 0.15)", minHeight: "80vh" }}>
                    <FormComponent />
                </Container>
            }
        </React.Fragment>
    )
}
