import React, { useState, useCallback } from 'react'
import { Container } from 'reactstrap'
import GooglebtnComponent from './GooglebtnComponent'
import "./LoginComponent.css"
import zc_logo from './zc_logo.png'

export default function LoginComponent() {
    let [gdata, set_gdata] = useState(null)
    const handle_click = useCallback(
        (request_object) => {
            set_gdata(request_object);
        }, []);
    return (
        <div style={{ height: "300px" }}>
            {!gdata && <Container fluid style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div id="login_card" style={{}}>
                    <img style={{ width: "200px", height: "auto", opacity: "0.5", marginTop: "50px" }} src={zc_logo} alt="logo" />
                    <div id="login_disclimare" >
                        <span className="font1">You need to have a </span>
                        <span className="font2">zewailcity email </span>
                        <span className="font1">to apply </span>
                    </div>
                    <div style={{ marginTop: "10px" }}>
                        <GooglebtnComponent onclick={handle_click} />
                    </div>

                </div>

            </Container>}
            {gdata &&
                <Container fluid>
                    <Container>
                        <div>form</div>
                    </Container>
                </Container>
            }
        </div>
    )
}
