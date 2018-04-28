class Navbar extends React.Component{
  render(){
    return(
      <div className="hero-head">
        <nav className="navbar is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <h1 className="navbar-item">Dream Onward</h1>
              <span
                className="navBurgerToggle navbar-burger burger"
                aria-expanded="false"
                aria-label="menu"
                // data-target="navbarMenuHeroA"
                role="button"
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </span>
            </div>
            <div id="navBurgerToggleMenu" className="navbar-menu">
              <div className="navbar-end">
                <a className="navbar-item is-active navbar-item-selected"
                  onClick={()=> {
                    this.props.switchToIndex();
                  }}
                >
                  Home
                </a>
                <a className="navbar-item navbar-item-selected">
                  About
                </a>
                <a className="navbar-item navbar-item-selected">
                  Contact
                </a>
                <a className="navbar-item navbar-item-selected">
                  Signup
                </a>
                <a className="navbar-item navbar-item-selected">
                  Login
                </a>
                <a className="navbar-item navbar-item-selected">
                  Profile
                </a>
                <a className="navbar-item navbar-item-selected"
                  onClick={()=> {
                    this.props.switchToUserBoardsView();
                  }}
                >
                  Users
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}
