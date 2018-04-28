// displays the show image
class CommunityImage extends React.Component{
  render(){
    return(
      <div className="comm_board_show">
        <h1>{this.props.image.description}</h1>
        <img src={this.props.image.image} alt={this.props.image.description} />
        <button onClick={()=>{
          this.props.showEditPage(this.props.image)
        }}>Edit</button>
        <button onClick={()=>this.props.deleteImage(this.props.image)}>Delete</button>
        <button onClick={
          this.props.getCommunityImages
        }>Back to List</button>
      </div>
    )
  }
}
