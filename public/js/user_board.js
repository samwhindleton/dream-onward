class CreateBoardForm extends React.Component{
    render(){
        return(
            <div className="user_create_form">
                <form>
                    <div>
                        <label className="label" for="image">Image URL:</label>
                        <input
                            className="input"
                            type="URL"
                            name="image"
                            id="image"
                            />
                    </div>
                    <div>
                        <label className="label" for="description">Description:</label>
                        <input
                            className="input"
                            type="text"
                            name="description"
                            id="description"
                            />
                    </div>
                    <input type="submit"/>
                </form>
                <button onClick={this.props.toggleCreate}>Cancel</button>
            </div>
        )
    }
}

// user board page - one per user, multiple images per board
class UserBoard extends React.Component{
  constructor(props){
      super(props)
      this.state={
          userImages: [],
          image: '',
          editVisible: false,
          createVisible: false,
          userBoard: true,
      }
      this.toggleCreate = this.toggleCreate.bind(this);
  }

  createNewBoard(image){
      const addImage = this.state.userImages
      userImages.unshift(image)
      this.setState({
          userImages: addImage
      })
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
        this.createNewBoard(jsonedImage)
        // this.setState({
        //   editVisible: false,
        //   createVisible: false
        // })
      })
      .catch(error=>console.log(error))
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
    console.log(this.props.user);
    return(
      <div className="user_board">
        <h1>{this.props.user.first_name}&#39;s Dream Board</h1>
          <div className="community_image_container">
            {this.props.user.images.map((image, index)=>{
              return(
                <div class="user_board_images tile is-3">
                  <img
                    src={image.image}
                    alt={image.description}
                  />
                  <button onClick={this.props.returnToUserList}>Return to Users</button>
                  <button onClick={this.toggleCreate}>Create New Board</button>
                        {this.state.createVisible ? <CreateBoardForm toggleCreate={this.toggleCreate} createNewBoard={this.createNewBoard} createImageSubmit={this.createImageSubmit}/> : ''}
                  <button>Edit Image</button>
                  <button>Delete Image</button>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
}
