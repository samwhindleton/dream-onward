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

class CommunityImagesList extends React.Component{
  render(){
    return(
      <div className="community_image_container">
        pics go here
      </div>
    )
  }
}

class CommunityBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      communityImages: []
    });
    this.getCommunityImages = this.getCommunityImages.bind(this);
  }

  componentDidMount(){
   this.getCommunityImages();
  }

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

  render(){
    return(
      <div className="comm_board_container">
        {
          (this.state.communityImages)?
            <CommunityImagesList />
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
