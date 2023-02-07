function Button(props) {
    return(
        <button className={`btn ${props.extraClass}`}>{props.children}</button>
    )
}

export default Button;