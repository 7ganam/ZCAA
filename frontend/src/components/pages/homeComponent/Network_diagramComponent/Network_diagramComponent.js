import React from 'react'

export default function Network_diagramComponent(props) {
    return (
        <div style={{ height: "608px", backgroundColor: "#CCE6EB", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img style={{ width: "auto", height: "200px" }} src={props.logo_img} id="c" alt="oval" />
        </div>
    )
}
