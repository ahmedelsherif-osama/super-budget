function Card(props) {

    const cardStyle = {
        "width": "300px"
    };

    const imgHolderStyle = {
        'width': '300px',
        'height': '200px',
        'background': 'gray'
    };
    
    return(
        <div className="card" style={cardStyle}>
            <div style={imgHolderStyle}></div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <a href="/" className="btn btn-primary">{props.btnLabel}</a>
            </div>
        </div>
    )
}

export default Card;