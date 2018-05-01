class Navbar extends React.Component{
  render(){
    return(
      <div className="hero-head">
        <nav className="navbar is-fixed-top">
          <div className="navbar-brand navbar-start">
            <h1 className="navbar-item">Dream Onward</h1>
          </div>
          <div className="navbar-end navbar-menu-items">
            <a
              className="navbar-item is-active navbar-item-selected"
              onClick={()=> {
                this.props.switchToIndex();
              }}
            >
              Home
            </a>
            <a
              className="navbar-item navbar-item-selected"
              onClick={()=>{
                this.props.switchToAbout();
              }}
            >
              About
            </a>
            <a
              className="navbar-item navbar-item-selected"
              onClick={()=> {
                this.props.switchToUserBoardsView();
              }}
            >
              Users
            </a>
          </div>
        </nav>
      </div>
    )
  }
}
