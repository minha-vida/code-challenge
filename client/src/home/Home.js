import React, { Component } from 'react'
import marked from 'marked'

class Home extends Component {
  constructor(props) {
    super(props)

    this.state = { readme: '' }
  }

  componentDidMount() {
    fetch('https://raw.githubusercontent.com/rnataoliveira/code-challenge/master/README.md')
      .then(response => response.text())
      .then(readme => {
        this.setState({
          readme: marked(readme)
        })
      })
  }

  render() {
    return (
      <article className="mt-2" dangerouslySetInnerHTML={{__html: this.state.readme}}></article>
    )
  }
}

export default Home