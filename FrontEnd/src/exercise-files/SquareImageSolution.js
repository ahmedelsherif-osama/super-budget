function SquareImage(props) {
    const squareImageStyle = {
        "width": "300px",
        "height": "300px",
        "border": "solid 1px black"
    }

    return(
        <img style={squareImageStyle} src={props.pictureSource} alt="abc"/>
    )
}

export default SquareImage;