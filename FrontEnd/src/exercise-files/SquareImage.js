function SquareImage(props) {

    const squareImageStyle = {
        "width": "300px",
        "height": "300px",
        "border": "solid 1px black",
    }

    return(
        <img 
          style={squareImageStyle} 
          alt="Dubai" 
          src={
            {
                "children":"",
                "pictureSource": "https://....jpg"
            }
          } />
    )
}

export default SquareImage;