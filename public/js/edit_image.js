// edit image form
class EditImage extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      id: 0,
      image: '',
      description: ''
    });
    this.getInputs = this.getInputs.bind(this);
    this.editImageSubmit = this.editImageSubmit.bind(this);
    this.cancelButton = this.cancelButton.bind(this);
  }

  componentDidMount(){
    if(this.props.image){
      this.setState({
        id: this.props.image.id,
        image: this.props.image.image,
        description: this.props.image.description
      })
    }
  }

  getInputs(event){
    // console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  editImageSubmit(event){
    event.preventDefault();
    // console.log('edit image');
    this.props.editImage(this.state)
    this.props.toggleHeader()
  }

  // cancel button, gets image and toggle header
  cancelButton(){
    this.props.getCommunityImage(this.props.image);
    setTimeout(() => {
      this.props.toggleHeader();
    }, 1);
  }

  render(){
    return(
      <div className="comm_image_edit_container">
        <form onSubmit={this.editImageSubmit}>
          <div>
            <h1>Edit Image</h1>
            <label className="label" for="image">Image URL:</label>
            <input
              className="input"
              type="URL"
              name="image"
              id="image"
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
            onClick={()=>this.cancelButton()}
          >
            Cancel
          </button>
        </form>
      </div>
    )
  }
}
