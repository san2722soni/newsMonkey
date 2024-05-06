import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { Routes, Route} from "react-router-dom";

export default class extends Component {
  pageSize = 6;

  render() {
    return (
      <>
      <Navbar/>
      <Routes>
      <Route path="/" element={<News pageSize={this.pageSize} country={"in"} category="general"/>}/>
      <Route path="/business" key="business" element={<News pageSize={this.pageSize} country={"in"} category="business"/>}/>
      <Route path="/entertainment" key="entertainment" element={<News pageSize={this.pageSize} country={"in"} category="entertainment"/>}/>
      <Route path="/general" key="general" element={<News pageSize={this.pageSize} country={"in"} category="general"/>}/>
      <Route path="/health" key="health" element={<News pageSize={this.pageSize} country={"in"} category="health"/>}/>
      <Route path="/science" key="science" element={<News pageSize={this.pageSize} country={"in"} category="science"/>}/>
      <Route path="/sports" key="sports" element={<News pageSize={this.pageSize} country={"in"} category="sports"/>}/>
      <Route path="/technology" setProgress={this.setProgress} key="technology" element={<News pageSize={this.pageSize} country={"in"} category="technology"/>}/>
      </Routes>
      </>
    )
  }
}

