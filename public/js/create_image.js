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
    this.cancelButton = this.cancelButton.bind(this);
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
    this.props.toggleHeader();
  }

  cancelButton(){
    this.props.getCommunityImages();
    this.props.toggleHeader();
  }

  render(){
    return(
      <div className="comm_image_create_container">
        <form onSubmit={this.createSubmit}>
          <div>
            <h1>Add a Dream!</h1>
            <label className="label" for="image">Image URL:</label>
            <input
              className="input"
              type="URL"
              name="image"
              id="image"
              placeholder="https://i.imgur.com/wg0XlFt.jpg"
              onChange={this.getInputs}
              value={this.state.image}
              required
            />
          </div>
          <div>
            <label className="label" for="description">Description:</label>
            <input
              className="input"
              type="text"
              name="description"
              id="description"
              placeholder="Adopt a Husky"
              maxlength="32"
              onChange={this.getInputs}
              value={this.state.description}
              required
            />
          </div>
          <input
            type="submit"
            className="button submit-button"
          />
          <button
            type="button"
            className="button cancel-button"
            onClick={this.cancelButton}
          >
            Cancel
          </button>
        </form>
      </div>
    )
  }
}
