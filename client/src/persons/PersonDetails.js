import React, { Component } from 'react'

class PersonDetails extends Component {
  render() {
    return (
      <div>
        <h1 className="mt-5 mb-2">Person Details</h1>
        <div className="row">
          <div className="col-lg-12 mb-2 justify-content-center text-center">
            <img className="rounded-circle" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjCI42_N5Q7XKJBS9T3s-XtBGtTqTVriYhkFoIfmjOBkrQBmqt" width="100px" height="100px" />
          </div>
          <div className="col-lg-10">
            <p className="form-control">Name</p>
          </div>
          <div className="col-lg-2">
            <p className="form-control">Age</p>
          </div>
        </div>
        <div className="row mt-2 mb-2">
          <h2 className="ml-3">Vaccines</h2>
        </div>
        <div>
          <div className="card" style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title">Rubeola</h5>
              <hr />
              <h6 className="card-subtitle mb-2 text-muted">AppliedAt: 12/05/2018</h6>
              <p className="card-text">CreatedAt: 12/05/2018</p>
              <p className="card-text">UpdatedAt: 12/05/2018</p>
              <a href="#" class="card-link">Edit</a>
              <a href="#" class="card-link">Delete</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonDetails