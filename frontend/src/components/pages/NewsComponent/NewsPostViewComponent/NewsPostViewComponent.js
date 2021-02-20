import React from 'react'
import EditorComponent from "./EditorComponent/EditorComponent"
import ReactLoading from 'react-loading';

function NewsPostViewComponent(props) {
    console.log("post ports", props)

    return (
        <div>
            { props.news_state.News.length == 0 ?

                <div id="loading_spinner" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "400px" }} >
                    <div style={{ marginTop: "100px" }}>
                        <ReactLoading type={"spin"} color={"#00D2F9"} width={"20vw"} />
                    </div>
                </div>
                :
                <EditorComponent post={props.news_state.News} />
            }
        </div>
    )
}

export default NewsPostViewComponent
