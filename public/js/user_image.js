// displays the show image
class UserImage extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.backButton = this.backButton.bind(this);
  // }

  // // back button, gets images and toggle header
  // backButton(){
  //   this.props.getCommunityImages();
  //   this.props.toggleHeader();
  // }

  render(){
    return(
      <div className="comm_board_show">
        <h1>{this.props.image.description}</h1>
        <img src={this.props.image.image} alt={this.props.image.description} />
        <button
          className="button"
          onClick={this.props.toggleEdit}
        >Edit</button>
        <button
          className="button"
          onClick={()=>this.props.deleteUsrImage(this.props.imageDeleteId, this.props.user)}
        >Delete</button>
        <button
          className="button"
          onClick={()=>this.props.getUserBoard(this.props.user)}>Back to List</button>
      </div>
    )
  }
}
