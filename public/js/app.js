class Header extends React.Component{
  render(){
    return(
      <header className="header">
        <h1>Dream Onward</h1>
        <h2>Paper-Free Dream Boards</h2>
      </header>
    )
  }
}

// displays the index
class CommunityImagesList extends React.Component{
  render(){
    return(
      <div className="community_image_container">
        {this.props.boardData.map((image, index)=>{
          return(
            <img
              src={image.image}
              alt={image.description}
              onClick={()=>{
                this.props.getCommunityImage(image);
              }}
            />
          )
        })}
      </div>
    )
  }
}

// displays the show image
class CommunityImage extends React.Component{
  render(){
    return(
      <div className="comm_board_show">
        <h1>{this.props.image.description}</h1>
        <img src={this.props.image.image} alt={this.props.image.description} />
        <button onClick={()=>{
          this.props.showEditPage(this.props.image)
        }}>Edit</button>
        <button>Back to List</button>
      </div>
    )
  }
}

// edit image form
class EditImage extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      id: 0,
      image: '',
      description: ''
    });
    this.editImageSubmit = this.editImageSubmit.bind(this);
    this.getInputs = this.getInputs.bind(this);
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
  }

  render(){
    return(
      <div className="comm_image_edit_container">
        <form onSubmit={this.editImageSubmit}>
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
      </div>
    )
  }
}

class CommunityBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      communityImages: [],
      image: '',
      indexVisible: true,
      showVisible: false,
      editVisible: false
    });
    this.getCommunityImages = this.getCommunityImages.bind(this);
    this.getCommunityImage = this.getCommunityImage.bind(this);
    this.showEditPage = this.showEditPage.bind(this);
  }

  // runs getCommunityImages on load
  componentDidMount(){
   this.getCommunityImages();
  }

  // fetches the community_boards data from the db
  getCommunityImages(){
    fetch("/community_boards")
      .then((response)=>response.json())
      // .then((data)=>console.log(data))
      .then((data)=>{
        console.log(data);
        this.setState({
          communityImages: data
        })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  // hide index, show image show component
  getCommunityImage(image){
    this.setState({
      image: image,
      indexVisible: false,
      showVisible: true,
      editVisible: false
    })
  }

  // show edit component
  showEditPage(image){
    this.setState({
      showVisible: false,
      editVisible: true
    })
    console.log(this.state.image);
  }

  // edit image in the db and return to the updated show page for the image
  editImage(image){
    // console.log('incepted edit', image);
    fetch('/community_boards/' + image.id, {
      body: JSON.stringify(image),
      method: 'PUT',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(updatedImage => {
        return updatedImage.json()
      })
      .then(jsonedImage => {
        console.log(jsonedImage);
        this.getCommunityImage(jsonedImage);
      })
      .catch(error => console.log(error));
  }

  render(){
    return(
      <div className="comm_board_container">
        {
          (this.state.communityImages && this.state.indexVisible)?
            <CommunityImagesList
              boardData={this.state.communityImages}
              getCommunityImage={this.getCommunityImage}
            />
          :
            ''
        }
        {
          (this.state.showVisible)?
            <CommunityImage
              image={this.state.image}
              showEditPage={this.showEditPage}
            />
          :
            ''
        }
        {
          (this.state.editVisible)?
            <EditImage
              image={this.state.image}
              editImage={this.editImage}
              getCommunityImage={this.getCommunityImage}
            />
          :
            ''
        }
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    return(
      <div>
        <Header />
        <CommunityBoard />
      </div>
    )
  };
};

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
