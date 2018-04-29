// index and functinos
class CommunityBoard extends React.Component{
  constructor(props){
    super(props);
    this.state = ({
      communityImages: [],
      image: '',
      indexVisible: true,
      showVisible: false,
      editVisible: false,
      createVisible: false
    });
    this.getCommunityImages = this.getCommunityImages.bind(this);
    this.getCommunityImage = this.getCommunityImage.bind(this);
    this.showEditPage = this.showEditPage.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.editImage = this.editImage.bind(this);
    this.openCreate = this.openCreate.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.createImageSubmit = this.createImageSubmit.bind(this);
  }

  // runs getCommunityImages on load
  componentDidMount(){
   this.getCommunityImages();
  }

  // fetches the community_boards data from the db
  getCommunityImages(){
    fetch("/community_boards")
      .then((response)=>response.json())
      // .then((data)=>console.log(data))
      .then((data)=>{
        this.setState({
          communityImages: data,
          indexVisible: true,
          showVisible: false,
          editVisible: false,
          createVisible: false
        })
      })
      .catch((error)=>{
        console.log(error);
      })
  }

  // hide index, show image show component
  getCommunityImage(image){
    console.log(image);
    this.setState({
      image: image,
      indexVisible: false,
      showVisible: true,
      editVisible: false
    })
    this.props.toggleHeader()
  }

  // show edit component
  showEditPage(image){
    this.setState({
      showVisible: false,
      editVisible: true
    })
    console.log(this.state.image);
  }

  // edit image in the db and return to the updated show page for the image
  editImage(image){
    // console.log('incepted edit', image);
    fetch('/community_boards/' + image.id, {
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
        this.getCommunityImage(jsonedImage);
      })
      .catch(error => console.log(error));
  }

  handleCreate(image){
    const updatedImages = this.state.communityImages
    updatedImages.unshift(image);
    this.setState({
      communityImages: updatedImages
    })
  }

  createImageSubmit(image){
    console.log(image);
    fetch('/community_boards', {
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
        this.handleCreate(jsonedImage)
        this.setState({
          indexVisible: true,
          showVisible: false,
          editVisible: false,
          createVisible: false
        })
      })
      .catch(error=>console.log(error))
  }

  deleteImage(image, index){
    fetch("community_boards/" + image.id, {
      method: 'DELETE'
    })
      .then(data=>{
        this.setState({
          communityImages: [
            ...this.state.communityImages.slice(0, index),
            ...this.state.communityImages.slice(index + 1)
          ]
        })
      })
      .then(updatedCommunityImages=>{
        this.getCommunityImages();
      })
    this.props.toggleHeader();
  }

  openCreate(){
    this.setState({
      indexVisible: false,
      showVisible: false,
      editVisible: false,
      createVisible: true
    })
    this.props.toggleHeader();
  }

  render(){
    return(
      <div className="landing-container">
        {/* <Header
          openCreate={this.openCreate}
          createVisible={this.state.createVisible}
        /> */}
        {
          (this.state.createVisible || this.state.showVisible || this.state.editVisible) ?
          ('') :
          (
            <button className="add-dream" onClick={this.openCreate}>
              Add a Dream!
            </button>
          )
        }
        <div className="comm_board_container">
          {
            (this.state.communityImages && this.state.indexVisible)?
              <CommunityImagesList
                boardData={this.state.communityImages}
                getCommunityImage={this.getCommunityImage}
                toggleHeader={this.props.toggleHeader}
              />
            :
              ''
          }
          {
            (this.state.showVisible)?
              <CommunityImage
                image={this.state.image}
                showEditPage={this.showEditPage}
                getCommunityImages={this.getCommunityImages}
                deleteImage={this.deleteImage}
                setState={this.setState}
                toggleHeader={this.props.toggleHeader}
              />
            :
              ''
          }
          {
            (this.state.editVisible)?
              <EditImage
                image={this.state.image}
                editImage={this.editImage}
                getCommunityImage={this.getCommunityImage}
                toggleHeader={this.props.toggleHeader}
              />
            :
              ''
          }
          {
            (this.state.createVisible)?
              <CreateImage
                image={this.state.image}
                createImage={this.createImage}
                getCommunityImage={this.getCommunityImage}
                createImageSubmit={this.createImageSubmit}
                handleCreate={this.handleCreate}
                getCommunityImages={this.getCommunityImages}
                toggleHeader={this.props.toggleHeader}
              />
            :
              ''
          }
        </div>
      </div>
    )
  }
}
