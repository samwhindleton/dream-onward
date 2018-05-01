class App extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      headerVisible: true,
      communityBoardVisible: true,
      userBoardsVisible: false,
      aboutVisible: false
    });
    this.switchToIndex = this.switchToIndex.bind(this);
    this.switchToUserBoardsView = this.switchToUserBoardsView.bind(this);
    this.switchToAbout = this.switchToAbout.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  switchToIndex(){
    (!this.state.communityBoardVisible) ?
    (this.setState({
      headerVisible: true,
      communityBoardVisible: true,
      userBoardsVisible: false,
      aboutVisible: false
    })) :
    ('')
  }

  switchToUserBoardsView(){
    (this.setState({
      headerVisible: false,
      communityBoardVisible: false,
      userBoardsVisible: true,
      aboutVisible: false
    }))
  }

  switchToAbout(){
    this.setState({
      headerVisible: false,
      communityBoardVisible: false,
      userBoardsVisible: false,
      aboutVisible: true
    })
  }

  toggleHeader(){
    (this.state.headerVisible) ?
    (this.setState({
      headerVisible: false
    })) :
    (this.setState({
      headerVisible: true
    }))
  }

  render(){
    return(
      <div className="app-container">
        <Navbar
          switchToUserBoardsView={this.switchToUserBoardsView}
          switchToIndex={this.switchToIndex}
          switchToAbout={this.switchToAbout}
        />
        {this.state.headerVisible ? <Header/> : ''}
        {this.state.communityBoardVisible ?
          <CommunityBoard
            toggleHeader={this.toggleHeader}
          /> :
        ''}
        {this.state.userBoardsVisible ? <UserBoards/> : ''}
        {
          this.state.aboutVisible ?
            <About />
          :
            ''
        }
        <Footer/>
      </div>
    )
  };
};

ReactDOM.render(
  <App />,
  document.querySelector('.main-container')
)
