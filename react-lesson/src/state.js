import React from 'react'; // 核心库
import ReactDOM from 'react-dom';  // DOM渲染库
class Counter extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      count : 0
    }
  }
  handleAdd = () =>{
    this.setState({
      count : this.state.count + 1
    })
    this.setState({
      count : this.state.count + 1
    })
    this.setState({
      count : this.state.count + 1
    })
    console.log(this.state.count)
  }
  componentDidMount(){
    setTimeout(() => {
      console.log('before', this.state.count)
       this.setState({
        count : this.state.count + 1
      })
      console.log('after', this.state.count)
    }, 1000);
    // this.setState({
    //   count : this.state.count + 1
    // })
    // console.log(this.state.count)
  }
  render(){
    return (
      <div>
        <div>{this.state.count}</div>
        <button onClick={this.handleAdd}>++</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Counter />,
  document.getElementById('root')
)


