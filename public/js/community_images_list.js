// displays the index
class CommunityImagesList extends React.Component{
  render(){
    return(
      <div className="community_image_container">
        {this.props.boardData.map((image, index)=>{
          return(
            <div className="tile is-3">
              <img
                src={image.image}
                alt={image.description}
                onClick={()=>{
                  this.props.getCommunityImage(image);
                }}
              />
            </div>
          )
        })}
      </div>
    )
  }
}
