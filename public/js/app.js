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

class EditImage extends React.Component{
  render(){
    return(
      <div className="comm_image_edit_container">
        edit page
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
      showVisible: true
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
