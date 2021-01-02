import React from 'react'
import { Col, Container, Row } from 'reactstrap'
import "./FooterComponent.css"
export default function FooterComponent() {
    return (
        <Container id='footer_container' fluid >
            <Container >
                <Row>
                    <Col md="3">

                        <img style={{ width: "150px", height: "auto", filter: "grayscale(40%)", filter: "drop-shadow(0 0 0.75rem )" }} src="/logo.png" alt="oval" />

                    </Col>
                </Row>
            </Container>

        </Container>
    )
}
