// user boards pages
class UserBoards extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      users: [],
      user: '',
      image: '',
      imageDeleteId: null,
      usersListVisible: true,
      userBoardVisible: false,
      createUserBoardFormVisible: false,
      editUserImageVisible: false,
      userImageVisible: false
    })
    this.deleteUsrImage = this.deleteUsrImage.bind(this);
    this.createImageSubmit = this.createImageSubmit.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getUserBoard = this.getUserBoard.bind(this);
    this.getUserImage = this.getUserImage.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  // load user images on page load
  componentDidMount(){
    this.getUsers();
  }

  createImageSubmit(image, user){
    console.log(image);
    fetch('/user_boards', {
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
      this.getUsers();
      this.getUserBoard(user);
      this.toggleCreate();
    })
    .catch(error=>console.log(error))
  }

  deleteUsrImage(id, user){
    // console.log("deleting image");
    fetch("user_boards/" + id, {
      method: 'DELETE'
    })
    .then((data)=>{
      console.log(data);
    })
    .then(()=> {
      this.getUsers();
      this.getUserBoard(user);
      console.log(user);
      this.setState({
        user: user,
        userImageVisible: false,
        userBoardVisible: true
      })
    })
    .catch(error=>console.log(error))
  }

  editUserImage(image){
    fetch('/user_boards/' + image.id, {
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
      this.getUserImage(jsonedImage);
      this.setState({
        editUserImageVisible: false,
        userImageVisible: true
      })
    })
    .catch(error => console.log(error));
  }

  // fetch users from database
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

  // set states to show single user's board
  getUserBoard(user){
    // console.log(user);
    this.setState({
      user: user,
      userImageVisible: false,
      usersListVisible: false,
      userBoardVisible: true
    })
  }

  getUserImage(image){
    console.log(image);
    (this.state.userImageVisible) ?
    (this.setState({
      image: image,
      imageDeleteId: image.id,
      userBoardVisible: false,
      userImageVisible: false
    })) :
    (this.setState({
      image: image,
      imageDeleteId: image.id,
      userBoardVisible: false,
      userImageVisible: true
    }))
  }

  toggleCreate() {
    (!this.state.createUserBoardFormVisible) ?
    (this.setState({
      createUserBoardFormVisible: true,
      userBoardVisible: false
    })) :
    (this.setState({
      createUserBoardFormVisible: false,
      userBoardVisible:true
    }))
  }

  toggleEdit() {
    (this.state.editUserImageVisible) ?
    (this.setState({
      editUserImageVisible: false,
      userImageVisible: true
    })) :
    (this.setState({
      editUserImageVisible: true,
      userImageVisible: false
    }))
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
              getUserImage={this.getUserImage}
              toggleCreate={this.toggleCreate}
              user={this.state.user}
              userImageVisible={this.state.userImageVisible}
            />
          :
            ''
        }
        {
          (this.state.createUserBoardFormVisible)?
            <CreateBoardForm
              createImageSubmit={this.createImageSubmit}
              getUsers={this.getUsers}
              getUserBoard={this.getUserBoard}
              toggleCreate={this.toggleCreate}
              user={this.state.user}
            />
          :
            ''
        }
        {
          (this.state.userImageVisible)?
            <UserImage
              deleteUsrImage={this.deleteUsrImage}
              getUserImage={this.getUserImage}
              getUserBoard={this.getUserBoard}
              getUsers={this.getUsers}
              image={this.state.image}
              imageDeleteId={this.state.imageDeleteId}
              toggleEdit={this.toggleEdit}
              toggleUserImageView={this.toggleUserImageView}
              user={this.state.user}
              userImageVisible={this.state.userImageVisible}
              userBoardVisible={this.state.userBoardVisible}
            />
          :
            ''
        }
        {
          (this.state.editUserImageVisible)?
            <UserEditImage
              image={this.state.image}
              editImageSubmit={this.editImageSubmit}
              getUsers={this.getUsers}
              getUserBoard={this.getUserBoard}
              toggleEdit={this.toggleEdit}
              user={this.state.user}
              userImageVisible={this.state.userImageVisible}
            />
          :
            ''
        }
      </div>
    )
  }
}
