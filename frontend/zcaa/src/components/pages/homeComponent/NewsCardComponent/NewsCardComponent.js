import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import "./NewsCardComponent.css"
const NewsCardComponent = (props) => {
    return (
        <div>
            <Card style={{ width: "100%" }} style={{ alignItems: "center", minHeight: "460px" }}   >
                <CardImg top style={{ objectFit: "cover", height: "200px", width: "95%", marginTop: "7px", borderRadius: "12px" }} src={props.img} alt="Card image cap" />
                <CardBody style={{ width: "100%" }}>
                    <CardTitle tag="h5" style={{ fontSize: "18px" }}>{props.title}</CardTitle>
                    <CardSubtitle id="card_sub" tag="h6" style={{ fontSize: "12px" }} className="mb-2 text-muted">September 14, 2015</CardSubtitle>
                    <CardText id="card_body_text" style={{ width: "100%", color: "grey" }}>
                        <div>
                            {props.body_text}
                        </div>
                    </CardText>
                    <div className="d-flex">
                        <div className="zcaa_link" style={{ marginLeft: "auto" }}>
                            read more
                            <FontAwesomeIcon icon={faLongArrowAltRight} className="ml-1 pt-1" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default NewsCardComponent;