// import { Component } from 'react';
import './search-box.styles.css';


const SearchBox = ({className, placeHolder, onChangeHandler}) => (
  <input 
    type='search' 
    className={`search-box ${className}`}
    placeholder={placeHolder}
    onChange={onChangeHandler}
  />
);


// class SearchBox extends Component {
//   render() {
//     return <input 
//       type='search' 
//       className={`search-box ${this.props.className}`}
//       placeholder={this.props.placeHolder}
//       onChange={this.props.onChangeHandler}
//     />
//   }
// }

export default SearchBox;