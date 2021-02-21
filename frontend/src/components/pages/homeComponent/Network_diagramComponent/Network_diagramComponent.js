import { React, useEffect } from 'react'
// import { $, jQuery } from 'jquery';
import initJParticle from "./jparticle.jquery"
import $ from "jquery";
import "./Network_diagramComponent.css"

export default function Network_diagramComponent(props) {
    initJParticle($)

    useEffect(() => {

        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        const particles_number = Math.ceil(100 / 1520 * x);


        $("#network_div").jParticle({
            particlesNumber: particles_number, background: 'CCE6EB', color: 'white', createLinkDist: 180, speed: 100


        });

    })
    return (
        <div id="network_div" style={{ position: 'relative', height: "608px", backgroundColor: "#CCE6EB", display: "flex", justifyContent: "center", alignItems: "center", boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }}>
            <img style={{ width: "auto", height: "200px", position: 'absolute', filter: 'drop-shadow(0px 5px 4px rgba(0, 0, 0, 0.25)) ' }} src={props.logo_img} id="c" alt="oval" />
            <div id="network_card" style={{ position: "absolute" }}>
                <div id="network_card_text">
                    connecting alumini around the world
                </div>
            </div>
        </div>
    )
}
