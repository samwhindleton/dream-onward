// user board page - one per user, multiple images per board
class UserBoard extends React.Component{
  constructor(props){
    super(props)
    this.state={
      image: '',
      createVisible: false,
      editVisible: false,
      showVisible: false,
      userBoard: true,
      user: this.props.user,
      id: this.props.user.id,
      username: this.props.user.username
    }
    this.toggleCreate = this.toggleCreate.bind(this);
    this.getUserImage = this.getUserImage.bind(this);
  }

  createImageSubmit(image){
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
        // this.handleCreate(jsonedImage);
        this.toggleCreate();
      })
      .catch(error=>console.log(error))
  }

  // hide index, show image show component
  getUserImage(image){
    console.log(image);
    if (this.state.showVisible == false) {
      this.setState({
        image: image,
        userBoard: false,
        showVisible: true
      })
    } else {
      this.setState({
        userBoard: true,
        showVisible: false
      })
    }
  }

  toggleCreate(){
      if(this.state.createVisible == false){
      this.setState({
          createVisible: true,
          userBoard: false,
      })} else {
          this.setState({
              createVisible: false,
              userBoard:true,
          })
      }
      console.log(this.state.createVisible)
  }

  render(){
    // console.log(this.props.user);
    return(
      <div className="user_board">
        <h1>{this.props.user.first_name}&#39;s Dream Board</h1>

        {
          (this.state.createVisible || this.state.showVisible) ?
          ('') :
          (
            <div>
              {
                (this.state.createVisible) ?
                ('') :
                (
                  <button
                    className="add-dream"
                    onClick={this.toggleCreate}
                    user={this.props.user}
                  >
                    Add a Dream!
                  </button>
                )
              }
              <div className="community_image_container">
                {this.props.user.images.map((image, index)=>{
                  return(
                    <div class="user_board_images tile is-3">
                      <img
                        src={image.image}
                        alt={image.description}
                        onClick={()=>{
                          this.getUserImage(image);
                        }}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
          )
        }

        {/* add/create image to dream board */}
        {this.state.createVisible ?
          <CreateBoardForm
            id={this.state.id}
            username={this.state.username}
            createImageSubmit={this.createImageSubmit}
            toggleCreate={this.toggleCreate}
          /> :
        ''}

        {/* show image */}
        {this.state.showVisible ?
          <UserImage
            id={this.state.id}
            image={this.state.image}
            username={this.state.username}
            getUserImage={this.getUserImage}
          /> :
        ''}
      </div>
    )
  }
}
