import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import "./AboutComponent.css"
import logo from './logo.png'
import MemberCardComponent from "./MemberCardComponent/MemberCardComponent"
export default function AboutComponent() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [members_views, setmembers_views] = useState(<div>empty</div>);


    useEffect(() => {
        setTimeout(() => {
            const fetched_members = [
                { name: "youssef", image: "1-min.jpg", role: "active member" },
                { name: "Hashem", image: "Hashem-min.jpg", role: "active member" },
                { name: "Hatem", image: "DSC_0255-min.JPG", role: "active member" },
                { name: "Ziad", image: "ziad.jpg", role: "active member" },
            ]
            setMembers(fetched_members);
            let members_views = fetched_members.map((member, index) => {
                let card_color = "#7FD8E9"
                if (index % 2 === 0) {
                    card_color = "#7FD8E9"
                }
                else {
                    card_color = "rgb(127 216 233 / 33%)"
                }
                return (
                    <Col md="2" className="" >
                        <MemberCardComponent background_color={card_color} img={`/team_members_images/${member.image}`} name={member.name} role={member.role} />
                    </Col>
                )
            })
            setmembers_views(members_views)
            setLoading(false);
        }, 1000)
    }, [])
    return (
        <React.Fragment>
            <Container id="mission_vision_container">
                <Row style={{ marginTop: "60px", marginBottom: "10px" }}>
                    <Col md="9">
                        <span id='about_header' >OUR  mission:</span>
                        <div id="mission_text">               Our mission is supporting Zewail City in its pursuit of excellence and building a place for
                        the Alumni to keep ties with their alma mater by supporting their needs, elevating their
                        connections, and assisting their career’s development. As Zewail City’s alumni
                        association, we are intrigued to do our duties as Zewail City’s advocates for alumni in
                        Egypt and abroad so all of us can give back to our community and country. Moreover,
                        we look forward to facilitating alumni engagement in Zewail City and providing projects
                        that help in the development of science and technology in Egypt. The association also
                        serves as a channel of communication representing all alumni with Zewail City’s current
                        students and administration to contribute to improve the education and research
                        quality.
                        We aspire to inspire young Zewailians and support their journey to help them
                        gain the unique ZC spirit that Dr. Zewail instilled in each of us.
                    </div>
                    </Col>
                    <Col md="3" className="d-none d-md-block">
                        <img style={{ width: "100%", height: "auto", position: "sticky", top: 0 }} src={logo} id="c" alt="oval" />
                    </Col>
                </Row>
                <Row style={{ marginTop: "60px", marginBottom: "10px" }}>
                    <Col md="3">
                        <img style={{ width: "100%", height: "auto", position: "sticky", top: 0 }} src={logo} id="c" alt="oval" />
                    </Col>
                    <Col md="9">
                        <span id='about_header' >OUR  mission:</span>
                        <div id="mission_text">               Our mission is supporting Zewail City in its pursuit of excellence and building a place for
                        the Alumni to keep ties with their alma mater by supporting their needs, elevating their
                        connections, and assisting their career’s development. As Zewail City’s alumni
                        association, we are intrigued to do our duties as Zewail City’s advocates for alumni in
                        Egypt and abroad so all of us can give back to our community and country. Moreover,
                        we look forward to facilitating alumni engagement in Zewail City and providing projects
                        that help in the development of science and technology in Egypt. The association also
                        serves as a channel of communication representing all alumni with Zewail City’s current
                        students and administration to contribute to improve the education and research
                        quality.
                        We aspire to inspire young Zewailians and support their journey to help them
                        gain the unique ZC spirit that Dr. Zewail instilled in each of us.
                    </div>
                    </Col>

                </Row>
            </Container>
            <Container id="members_container" className="">
                <Row id="header_row">
                    <Col xs="12" className="" >
                        <div
                            style={{
                                textAlign: "left",
                                marginTop: "50px",
                                borderTopStyle: 'solid',
                                borderTopWidth: "0.5px",
                                borderTopColor: " #C5BCBC",
                                color: "#0091AC",
                                marginBottom: "50px"
                            }} className="section_title"
                        >
                            members
                   </div>
                    </Col>
                </Row>
                {!loading ?
                    <Row id="members_cards_row">
                        {members_views}
                    </Row> : <p>loading...</p>
                }
            </Container>

        </React.Fragment>

    )
}
