class UserBoard extends React.Component{
  render(){
    console.log(this.props.user);
    return(
      <div className="user_board">
        <h1>{this.props.user.first_name}'s Dream Board</h1>
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
