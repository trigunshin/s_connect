
var CandidateForm = React.createClass({
  render: function() {
    return (
      <form name='submit_form' enctype='multipart/form-data'>
        <div className="form-group">
          <label for="candidate_name">Candidate Name</label>
          <input type="text" className="form-control" id="candidate_name" placeholder="Name" required></input>
        </div>
        <div className="form-group">
          <label for="candidate_email">Candidate Email</label>
          <input type="email" className="form-control" id="candidate_email" placeholder="your@email.com" required></input>
        </div>
        <div className="form-group">
          <label for="candidate_resume">Candidate Resume</label>
          <input type="file" required></input>
          <p className="help-block">Upload the resume to use for this submission.</p>
        </div>
        <button type="submit" class="btn btn-default" onSubmit="console.log('submitted')">
          Send
        </button>
      </form>
    );
  }
});

var Job = React.createClass({
  render: function() {
    return (
      <button data-job-id={this.props.data.id} type="button" className="list-group-item">
        <h4 className="list-group-item-heading">{this.props.data.title}</h4>
        <div className='row'>
          <label className="col-md-2">Salary</label>
          <div className="col-md-4">
            <span>{this.props.data.salary_min}-{this.props.data.salary_max}</span>
          </div>
        </div>
        <div className='row'>
          <label className="col-md-2">Fee</label>
          <div className="col-md-4">
            <span>{this.props.data.fee}%</span>
          </div>
        </div>
      </button>
    );
  }
});

var JobList = React.createClass({
  render: function() {
    var jobNodes = this.props.data.map(function (job) {
      return (
        <Job key={job.id} data={job} />
      );
    });
    return (
      <div className="list-group">
        {jobNodes}
      </div>
    );
  }
});

var JobForm = React.createClass({
  handleSubmit: function(e) {
      e.preventDefault();
      var text = React.findDOMNode(this.refs.req_search).value.trim();
      console.info('search for', text);
      this.props.onJobSearchSubmit({title: text});
      return;
  },
  render: function() {
    return (
      <form className="form-inline" onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="req_search">Job Search</label>
          <input type="text" className="form-control" ref="req_search" id="req_search" placeholder="Software Engineer"></input>
        </div>
        <button type="submit" className="btn btn-default">Search</button>
      </form>
    );
  }
});

var JobBox = React.createClass({
  getInitialState: function() {
    return {data: [{
        title:'Select a Job',
        description: 'Description will show up here'
    }]};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleJobSearchSubmit: function(data) {
    // TODO: submit to the server and refresh the list
    console.info('searching submit', data);
    $.ajax({
      url: this.props.url,
      data: data,
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
      <div className="jobBox">
        <JobForm onJobSearchSubmit={this.handleJobSearchSubmit} />
        <JobList data={this.state.data} />
      </div>
    );
  }
});

React.render(
  <JobBox url="/search"  />,
  document.getElementById('content')
);