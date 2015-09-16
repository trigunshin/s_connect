
var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentTitle">
          {this.props.title}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment title={comment.title}>
          {comment.description}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});

var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: [{
        title:'Select a Job',
        description: 'Description will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up hereDescription will show up here'
    }]};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.state.data} />
        <CommentForm />
      </div>
    );
  }
});

React.render(
  <CommentBox url="/search"  />,
  document.getElementById('content')
);