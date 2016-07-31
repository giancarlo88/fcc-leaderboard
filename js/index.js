
var UserList = React.createClass ({
    render: function() {
    var leaders = this.props.data.map(function(leader){
      return (
          <div>{leader.username}</div>)})
        return (
            <div>
            {leaders}
            </div>)
    }
})

var Leaderboard = React.createClass ({
    getInitialState: function() {
        return {
            data: []
        };
    },
    loadLeaderboard: function() {
        $.get(this.props.url, function(result){
            var data = result
            this.setState({
                data: data
            });
        }.bind(this))
    },
    componentDidMount: function() {
        this.loadLeaderboard();
    },
    render: function() {
        return (
        <div>
            <UserList data = {this.state.data} />
        </div>
            )}



})




ReactDOM.render(
<Leaderboard url="https://fcctop100.herokuapp.com/api/fccusers/top/recent"/>,
document.getElementById("content")
                )
