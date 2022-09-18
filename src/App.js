
// // only needed for Class components
// import { Component } from 'react';

// Hooks used to encapsulate local state in functional components
import {useState, useEffect} from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

// functional component version (no lifecycles, class methods) 
// pure functions always return the same thing regardless of any external data and without changing external data
// functional components in React can sometimes be inpure functions in that they may return different content
// depending on external variables/data and also causing side-effects (changing external variables/data) in the process
const App = () => {
  // * A functional component will run this entire function from top to bottom when there is a change (in memory) to 
  // state or props while a Class component will only run the render method within the class

  //Syntax for useState hook is [value, setterFunction]  = useState(defaultValue)
  const [searchField, setSearchField] = useState(''); 
  const [monsters, setMonsters]= useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  console.log('rendered');

  //Syntax for useEffect hook is (callbackFunction, [array of dependent state or prop values])
  //this will only run the callback function if the values inside of the dependancy array have changed
  //pass an empty array if you only want to run the function once (on mount)
  useEffect(() => {
    // get data from api
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField]);
  
    
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

  
  return (
    <div className="App">
      <h1 className='app-title'>Monsters Rolodex</h1>
      <SearchBox 
        className='monsters-search-box'
        placeHolder='search monsters'
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters}/> 
    </div>
  );
}


// // Class component version (uses lifecycles)
// class App extends Component {
//   constructor() {
//     super();
    
//     // initialize state
//     this.state = {
//       monsters: [],
//       searchField: ''
//     }
//     // console.log('constructor');
//   }

//   componentDidMount(){
//     // console.log('componentDidMount');
//     // get data from api
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then((users) => this.setState(() => {
//           return {monsters: users}
//         }
//       )
//       );
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLocaleLowerCase();
//     this.setState(() => {
//       return {searchField}
//     });
//   }

//   render(){
//     // console.log('render');
//     // deconstruct reusable vars and methods for optimization
//     const {monsters, searchField} = this.state;
//     const {onSearchChange} = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     })

//     return (
//       <div className="App">
//         <h1 className='app-title'>Monsters Rolodex</h1>
//         <SearchBox 
//           className='monsters-search-box'
//           placeHolder='search monsters'
//           onChangeHandler={onSearchChange}
//         />
//         <CardList monsters={filteredMonsters}/>
//       </div>
//     );
//   }
// }

export default App;
