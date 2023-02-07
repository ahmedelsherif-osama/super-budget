import Button from "./Button";

function App() {

  let componentStyle = {
    "background-color": "#ccc",
    "width": "500px",
    "height": "500px",
    "display": "block",
    "padding": "20px"
  }

  return (
    <div style={componentStyle}>
        <h1>The App Component</h1>

        <Button extraClass="btn-primary">Home</Button>
        <Button extraClass="btn-danger">About</Button>
        <Button extraClass="btn-success">Contact</Button>
    </div>
  );
}

export default App;
