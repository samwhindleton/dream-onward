class Footer extends React.Component{
  render(){
    return(
      <div className="footer">
        <div className="container">
          <div className="content has-text-centered">
            <p>
              &copy;
              <script>
                new Date().getFullYear()>=2018&&document.write(new Date().getFullYear());
              </script>&nbsp;
              <a href="https://github.com/samwhindleton/dream-onward" target="_blank">DREAM ONWARD</a>.
              &nbsp;
              ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    )
  }
}