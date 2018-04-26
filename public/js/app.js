class Header extends React.Component{
  render(){
    return(
      <header className="header">
        <h1>Dream Onward</h1>
        <h2>Paper-Free Dream Boards</h2>
        {
          (!this.props.createVisible)?
            <button onClick={this.props.openCreate}>Add a Dream!</button>
          :
            ''
        }
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
    this.getInputs = this.getInputs.bind(this);
    this.editImageSubmit = this.editImageSubmit.bind(this);
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

class CommunityBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      communityImages: [],
      image: '',
      indexVisible: true,
      showVisible: false,
      editVisible: false,
      createVisible: false
    });
    this.getCommunityImages = this.getCommunityImages.bind(this);
    this.getCommunityImage = this.getCommunityImage.bind(this);
    this.showEditPage = this.showEditPage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.editImage = this.editImage.bind(this);
    this.openCreate = this.openCreate.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.createImageSubmit = this.createImageSubmit.bind(this);
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
        this.setState({
          communityImages: data,
          indexVisible: true,
          showVisible: false,
          editVisible: false,
          createVisible: false
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

  handleCreate(image){
    const updatedImages = this.state.communityImages
    updatedImages.unshift(image);
    this.setState({
      communityImages: updatedImages
    })
  }

  createImageSubmit(image){
    console.log(image);
    fetch('/community_boards', {
      body: JSON.stringify(image),
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      }
    })
      .then(createdImage=>{
        return createdImage.json()
      })
      .then(jsonedImage=>{
        this.handleCreate(jsonedImage)
        this.setState({
          indexVisible: true,
          showVisible: false,
          editVisible: false,
          createVisible: false
        })
      })
      .catch(error=>console.log(error))
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

  openCreate(){
    this.setState({
      indexVisible: false,
      showVisible: false,
      editVisible: false,
      createVisible: true
    })
  }

  render(){
    return(
      <div className="main">
        <Header
          openCreate={this.openCreate}
          createVisible={this.state.createVisible}
        />
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
          {
            (this.state.createVisible)?
              <CreateImage
                image={this.state.image}
                createImage={this.createImage}
                getCommunityImage={this.getCommunityImage}
                createImageSubmit={this.createImageSubmit}
                handleCreate={this.handleCreate}
                getCommunityImages={this.getCommunityImages}
              />
            :
              ''
          }
        </div>
      </div>
    )
  }
}

class App extends React.Component{
  render(){
    return(
        <CommunityBoard />
    )
  };
};

ReactDOM.render(
  <App />,
  document.querySelector('.container')
)
