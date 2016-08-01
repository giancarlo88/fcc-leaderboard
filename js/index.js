
var UserList = React.createClass ({
    getInitialState: function () {
        return {
            sortMethod: "recentStreak",
            descending: true
        };
    },

    handleATClick: function () {
        if (this.state.sortMethod === "allTime"){
            this.setState({descending: !this.state.descending});
        } else {
            this.setState({sortMethod: "allTime" });
        }
    },

    handleRClick: function () {
        if (this.state.sortMethod === "recentStreak"){
            this.setState({descending: !this.state.descending});
        } else {
            this.setState({sortMethod: "recentStreak" });
        }
    },

    handleUClick: function() {
        if (this.state.sortMethod === "username"){
            this.setState({descending: !this.state.descending});
        } else {
            this.setState({sortMethod: "username", descending: false, });
        }
    },
    render: function() {
        var leaders;
            switch (this.state.sortMethod){
                case "recentStreak":
                    leaders = sortList(this.props.data, "recent", this.state.descending);
                    break;
                case "allTime":
                    leaders = sortList(this.props.data, "alltime", this.state.descending);
                    break;
                case "username":
                    leaders = sortList(this.props.data, "username", this.state.descending);
    }

        function sortList (whatToSort, jsonLabel, descendingState){
            return whatToSort.sort(function(a, b){
                if (descendingState){
                    if (a[jsonLabel] < b[jsonLabel]) { return 1; }  //Function to sort based on
                    if (a[jsonLabel] > b[jsonLabel]) { return -1 ; }//state of descending.
                    return 0;}
                else {
                    if (a[jsonLabel] > b[jsonLabel]) { return 1; }
                    if (a[jsonLabel] < b[jsonLabel]) { return -1 ; }
                    return 0;}
            }).map(function(leaderboard, i){
                    return (
                      <TableEntry
                          key = {i}
                          username = {leaderboard.username}
                          img = {leaderboard.img}
                          atstreak = {leaderboard.alltime}
                          rstreak = {leaderboard.recent}
                        />
                      );
                });
        }
        return (
            <div className = "container">
            <h1>FreeCodeCamp's Top 100 Power Users</h1>
            <table>
                <thead>
                    <tr>
                        <th className="clickable usernameHeader" onClick = {this.handleUClick}>
                            Username
                            {this.state.sortMethod === "username" && this.state.descending ? "    "+String.fromCharCode(8743): ""}
                            {this.state.sortMethod === "username" && !this.state.descending ? " "+String.fromCharCode(8744) : ""}
                        </th>
                        <th className = "clickable atHeader" onClick = {this.handleATClick}>
                            All-time Streak
                            {this.state.sortMethod === "allTime" && this.state.descending ? " "+String.fromCharCode(8743) : ""}
                            {this.state.sortMethod === "allTime" && !this.state.descending ? " "+String.fromCharCode(8744) : ""}
                        </th>
                        <th className = "clickable recentHeader" onClick = {this.handleRClick}>
                            Recent Streak
                            {this.state.sortMethod === "recentStreak" && this.state.descending ? " "+String.fromCharCode(8743) : ""}
                            {this.state.sortMethod === "recentStreak" && !this.state.descending ? " "+String.fromCharCode(8744)  : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                {leaders}
                </tbody>
            </table>
                </div>
                );
    }
}
);



var Leaderboard = React.createClass ({
    getInitialState: function() {
        return {
            data: []
        };
    },
    loadLeaderboard: function() {
        $.get(this.props.url, function(result){
            var data = result;
            this.setState({
                data: data
            });
        }.bind(this));
    },
    componentDidMount: function() {
        this.loadLeaderboard();
    },
    render: function() {
        return (
            <UserList sortMethod = {this.state.sortMethod} data = {this.state.data} />
            );}
});

var TableEntry = React.createClass ({
    render: function(){
        return (
            <tr className = "entry">
                <td className = "username"><img src = {this.props.img}></img>{String.fromCharCode(160)+this.props.username}</td>
                <td className = "atStreak">{this.props.atstreak}</td>
                <td className = "rStreak">{this.props.rstreak}</td>
            </tr>
        );
    }
});


ReactDOM.render(
<Leaderboard url="https://fcctop100.herokuapp.com/api/fccusers/top/recent"/>,
document.getElementById("content")
                );
