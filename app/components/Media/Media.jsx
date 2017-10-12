import { getDataService } from 'project-services'
import 'react-select/dist/react-select.css'
import React, { Component } from 'react'
import Select from 'react-select'

let myTimeout
class Media extends Component {
  constructor () {
    super()
    this.state = {
      birds: [],
      newBirds: [],
      value: ''
    }
  }
  componentDidMount () {
    getDataService().then(birds => this.setState({birds, newBirds: birds.slice(0, 5)}))
  }
  birdsFilter = value => {
    clearTimeout(myTimeout)
    const filter = () => {
      let newBirds = []
      for (let i = 0; i < this.state.birds.length; i++) {
        if (~this.state.birds[i].toLowerCase().indexOf(value.toLowerCase())) {
          newBirds.push(this.state.birds[i])
          if (newBirds.length === 5) {
            break
          }
        }
      }
      this.setState({newBirds})
    }
    myTimeout = window.setTimeout(filter, 300)
  }
  render () {
    return (
      <div>
        <Select
          onInputChange={this.birdsFilter}
          onChange={i => this.setState({value: i})}
          value={this.state.value}
          options={this.state.newBirds.map((label, value) => ({label, value}))}
      />
      </div>
    )
  }
}
export default Media
