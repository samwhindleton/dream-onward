class Header extends React.Component{
  render(){
    return(
      <header className="header">
        {/* <h1>Dream Onward</h1>
        <h2>Paper-Free Dream Boards</h2> */}
        <section className="hero is-medium">
          {/* head */}
          <div className="hero-head">
            <nav className="navbar">
              <div className="container">
                <div className="navbar-brand">
                  <a className="navbar-item">
                    <h1>Dream Onward</h1>
                    {/* <img src="" alt="Logo"/> */}
                  </a>
                  <span className="navbar-burger burger" data-target="#navbarMenuHeroA">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                </div>
                <div id="navbarMenuHeroA" className="navbar-menu">
                  <div className="navbar-end">
                    <a className="navbar-item is-active">
                      Home
                    </a>
                    <a className="navbar-item">
                      About
                    </a>
                    <a className="navbar-item">
                      Contact
                    </a>
                    <a className="navbar-item">
                      Signup
                    </a>
                    <a className="navbar-item">
                      Login
                    </a>
                    <a className="navbar-item">
                      Profile
                    </a>
                  </div>
                </div>
              </div>
            </nav>
          </div>

          {/* content */}
          <div className="hero-body">
            <div className="container has-text-centered">
              <h1 className="title">
                Dream Onward
              </h1>
              <h2 className="subtitle">
                Paper-Free Dream Boards
              </h2>
            </div>
          </div>
        </section>
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
            <div className="tile is-3">
              <img
                src={image.image}
                alt={image.description}
                onClick={()=>{
                  this.props.getCommunityImage(image);
                }}
              />
            </div>
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
        <button onClick={()=>this.props.deleteImage(this.props.image)}>Delete</button>
        <button onClick={
          this.props.getCommunityImages
        }>Back to List</button>
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
        <button onClick={()=>this.props.getCommunityImage(this.props.image)}>Cancel</button>
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
    this.deleteImage = this.deleteImage.bind(this);
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
          communityImages: data,
          indexVisible: true,
          showVisible: false,
          editVisible: false
        })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  // hide index, show image show component
  getCommunityImage(image){
    console.log(image);
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

  deleteImage(image, index){
    fetch("community_boards/" + image.id, {
      method: 'DELETE'
    })
      .then(data=>{
        this.setState({
          communityImages: [
            ...this.state.communityImages.slice(0, index),
            ...this.state.communityImages.slice(index + 1)
          ]
        })
      })
      .then(updatedCommunityImages=>{
        this.getCommunityImages();
      })
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
              getCommunityImages={this.getCommunityImages}
              deleteImage={this.deleteImage}
              setState={this.setState}
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
      <div className="app-container">
        <Header />
        <CommunityBoard />
      </div>
    )
  };
};

ReactDOM.render(
  <App />,
  document.querySelector('.main-container')
)
