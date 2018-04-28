class UsersList extends React.Component{
  render(){
    return(
      <div className="users_list_container">
        <h1>User Boards</h1>
          {this.props.userData.map((user, index)=>{
            return(
              <div className="user">
                <h3
                  onClick={()=>{
                    this.props.getUserBoard(user)
                  }}
                >{user.first_name}</h3>
              </div>
            )
          })}
      </div>
    )
  }
}

class UserBoard extends React.Component{
  render(){
    console.log(this.props.user);
    return(
      <div className="user_board">
        <h1>{this.props.user.first_name} Dream Board</h1>
        {this.props.user.images.map((image, index)=>{
          return(
            <div class="user_board_images">
              <img
                src={image.image}
                alt={image.description}
              />
            </div>
          )
        })}
      </div>
    )
  }
}

class UserBoards extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      users: [],
      user: '',
      usersListVisible: true,
      userBoardVisible: false
    })
    this.getUsers = this.getUsers.bind(this);
    this.getUserBoard = this.getUserBoard.bind(this);
  }

  componentDidMount(){
    this.getUsers();
  }

  getUsers(){
    fetch("/users")
      .then((response)=>response.json())
      // .then((data)=>console.log(data))
      .then((data)=>{
        this.setState({
          users: data
        })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  getUserBoard(user){
    // console.log(user);
    this.setState({
      user: user,
      usersListVisible: false,
      userBoardVisible: true
    })
  }

  render(){
    return(
      <div className="main">
        {
          (this.state.usersListVisible)?
            <UsersList
              userData={this.state.users}
              getUserBoard={this.getUserBoard}
            />
          :
            ''
        }
        {
          (this.state.userBoardVisible)?
            <UserBoard
              user={this.state.user}
            />
          :
            ''
        }
      </div>
    )
  }
}
