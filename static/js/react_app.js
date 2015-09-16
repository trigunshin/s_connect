var CandidateAffix = React.createClass({
  render: function() {
    return (
      <div className='col-md-offset-4 col-md-4 affix' data-spy="affix">
        <JobDetail current_job={this.props.current_job}/>
        <CandidateForm current_job={this.props.current_job} />
      </div>
    );
  }
});

var JobDetail = React.createClass({
  render: function() {
    return (
      <div>
        <h4>{this.props.current_job.title}</h4>
        <div className="panel panel-default">
            <div className="panel-heading">
              <h3 className="panel-title">Job Description</h3>
            </div>
          <div className="panel-body" style={{height: '200px', overflow: 'scroll'}}>
            {this.props.current_job.description}
          </div>
        </div>
      </div>
    );
  }
});

var CandidateForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    //var text = React.findDOMNode(this.refs.req_search).value.trim();
    //console.info('search for', text);
    //this.props.onJobSearchSubmit({title: text});
    return;
  },
  render: function() {
    return (
      <form name='submit_form' encType='multipart/form-data'>
        <input type="hidden" className="form-control" id="candidate_name" placeholder="Name"
          value={this.props.current_job.id} required></input>
        <div className="form-group">
          <label htmlFor="candidate_name">Candidate Name</label>
          <input type="text" className="form-control" id="candidate_name" placeholder="Name" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="candidate_email">Candidate Email</label>
          <input type="email" className="form-control" id="candidate_email" placeholder="your@email.com" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="candidate_resume">Candidate Resume</label>
          <input type="file" required></input>
          <p className="help-block">Upload the resume to use for this submission.</p>
        </div>
        <button type="submit" className="btn btn-default" onSubmit={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
});

var Job = React.createClass({
  jobClicked: function(e) {
    this.props.onJobClick(this.props.data);
  },
  render: function() {
    return (
      <button data-job-id={this.props.data.id} type="button" className="list-group-item" onClick={this.jobClicked}>
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
  onJobClicked: function(job) {
    this.props.onJobClicked(job);
  },
  render: function() {
    var job_click = this.onJobClicked;
    var jobNodes = this.props.data.map(function (job) {
      return (
        <Job data={job} onJobClick={job_click} />
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
          <input type="text" className="form-control" ref="req_search" id="req_search"
            placeholder="Software Engineer"></input>
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
        //console.log(data);
        this.setState({data: data.data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleJobClick: function(job) {
    this.props.onJobClicked(job);
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
      <div className="jobBox col-md-6">
        <JobForm onJobSearchSubmit={this.handleJobSearchSubmit} />
        <JobList data={this.state.data} onJobClicked={this.handleJobClick}/>
      </div>
    );
  }
});

var SearchPane = React.createClass({
  getInitialState: function() {
    return {current_job: {
        title:'Select a Job',
        description: 'Description will show up here'
    }};
  },
  handleJobClick: function(job) {
    this.setState({current_job: job});
  },
  render: function() {
    return (
      <div role="tabpanel" className="tab-pane active" id="search">
        <CandidateAffix current_job={this.state.current_job} />
        <JobBox url="/search" onJobClicked={this.handleJobClick} />
      </div>
    );
  }
});
React.render(
  <SearchPane />,
  document.getElementById('tab_content_anchor')
);

/*React.render(
  <JobBox url="/search"  />,
  document.getElementById('job_box')
);
React.render(
  <CandidateAffix />,
  document.getElementById('candidate_affix')
);
//*/