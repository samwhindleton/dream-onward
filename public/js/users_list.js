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
