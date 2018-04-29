class App extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      headerVisible: true,
      communityBoardVisible: true,
      userBoardsVisible: false
    });
    this.switchToIndex = this.switchToIndex.bind(this);
    this.switchToUserBoardsView = this.switchToUserBoardsView.bind(this);
    this.toggleHeader = this.toggleHeader.bind(this);
  }

  switchToIndex(){
    (!this.state.communityBoardVisible) ?
    (this.setState({
      headerVisible: true,
      communityBoardVisible: true,
      userBoardsVisible: false
    })) :
    ('')
  }

  switchToUserBoardsView(){
    (this.state.headerVisible) ?
    (this.setState({
      headerVisible: false,
      communityBoardVisible: false,
      userBoardsVisible: true
    })) :
    ('')
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
        />
        {this.state.headerVisible ? <Header/> : ''}
        {this.state.communityBoardVisible ?
          <CommunityBoard
            toggleHeader={this.toggleHeader}
          /> :
        ''}
        {this.state.userBoardsVisible ? <UserBoards/> : ''}
        <Footer/>
      </div>
    )
  };
};

ReactDOM.render(
  <App />,
  document.querySelector('.main-container')
)
