import React from 'react'
import "./NewsCardComponenet.css"
function NewsCardComponenet(props) {

    const blocks = props.post.EditorData.blocks
    let thumbnailimage = "https://zcaa-bucket.s3.eu-central-1.amazonaws.com/148178232_473355943673308_4679363538531949358_n.jpg"
    for (const index in blocks) {

        if (blocks[index].type === 'imageTool') {
            thumbnailimage = blocks[index].data.file.url
            break
        }
    }

    const title = props.post.meta_values[0].Title
    const thumbnailText = props.post.meta_values[0].thumbnail_text
    const category = "random category"

    var utcSeconds = props.post.EditorData.time;
    var date = new Date(0); // The 0 there is the key, which sets the date to the epoch
    date.setUTCSeconds(utcSeconds);
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return (
        <div>
            <div id="card_body">
                <div id="card_meta_data">
                    <div id="news_card_title">{title}</div>
                    <div id="news_card_subData">
                        <div>
                            <span>Category: </span>
                            <span style={{ fontSize: "13px", color: "#0091AC" }}> {category}</span>
                        </div>
                        <div>
                            <span>date: </span>
                            <span style={{ fontSize: "13px", color: "#0091AC" }}> {`${dd}/${mm}/${yyyy}`} </span>
                        </div>

                    </div>
                    <div id="news_card_thumbnailText">
                        <div>
                            {thumbnailText}
                        </div>
                    </div>
                </div>
                <div id="card_image">
                    <img src={thumbnailimage} alt="your image" style={{ height: "100%", width: "100%", objectFit: "cover" }} />


                </div>

            </div>
        </div>
    )
}

export default NewsCardComponenet
