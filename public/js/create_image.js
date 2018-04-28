// add image form
class CreateImage extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      id: 0,
      image: '',
      description: ''
    });
    this.getInputs = this.getInputs.bind(this);
    this.createSubmit = this.createSubmit.bind(this);
  }

  getInputs(event){
    // console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  createSubmit(event){
    event.preventDefault();
    this.props.createImageSubmit(this.state);
  }

  render(){
    return(
      <div className="comm_image_create_container">
        <form onSubmit={this.createSubmit}>
          <div>
            <label className="label" for="image">Image URL:</label>
            <input
              className="input"
              type="URL"
              name="image"
              id="image"
              onChange={this.getInputs}
              value={this.state.image}
            />
          </div>
          <div>
            <label className="label" for="description">Description:</label>
            <input
              className="input"
              type="text"
              name="description"
              id="description"
              onChange={this.getInputs}
              value={this.state.description}
            />
          </div>
          <input type="submit" />
        </form>
        <button onClick={()=>this.props.getCommunityImages()}>Cancel</button>
      </div>
    )
  }
}
