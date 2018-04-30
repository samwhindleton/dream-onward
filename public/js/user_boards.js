// user boards pages
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

  // load user images on page load
  componentDidMount(){
    this.getUsers();
  }

  // fetch users from database
  getUsers(){
      console.log('getUser function running');
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

  // set states to show single user's board
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
              getUsers={this.getUsers}
            />
          :
            ''
        }
      </div>
    )
  }
}
