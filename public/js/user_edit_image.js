class UserEditImage extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      id: 0,
      user_id: this.props.user.id,
      image: '',
      description: ''
    });
    this.getInputs = this.getInputs.bind(this);
    this.editSubmit = this.editSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.image.id,
      image: this.props.image.image,
      description: this.props.image.description
    })
  }

  getInputs(event){
    // console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  editSubmit(event){
    event.preventDefault();
    this.props.editImageSubmit(this.state, this.props.user);
  }

  render(){
    return(
      <div className="user_create_form comm_image_create_container">
        <form onSubmit={this.editSubmit}>
          <div>
            <h1>Edit Your Dream {this.props.user.username}!</h1>
          </div>
          <div>
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
            onClick={this.props.toggleEdit}
          >
            Cancel
          </button>
        </form>
      </div>
    )
  }
}
