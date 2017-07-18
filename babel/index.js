var foodDefaultUrl = '/assets/food-default.jpeg';
var recepiesPreMade = [
  {
    'name': 'Pumkin Pie',
    'ingredients': ['blah blah', 'stuff', 'more stuff'],
    'img': foodDefaultUrl
  },
  {
    'name': 'Chocolate Cake',
    'ingredients': ['blah bluh', 'damb it', 'less stuff'],
    'img': foodDefaultUrl
  },
  {
    'name': 'Smoothie',
    'ingredients': ['could you blah', 'stuffiness', 'more stuffiness'],
    'img': foodDefaultUrl
  }
];

localStorage.clear();

function Recepie(props) {
    return(
      <div className='recepie'>
        <h1 className="recepie-name">{props.name}</h1>
        <div>
          <ul className="recepie-ingredients">
            {props.ingredients}
            <li style={{display: 'flex'}}><button>+</button><input style={{width: '85%'}} placeholder="add ingredient"/></li>
          </ul>
          <button className="btn delete" onClick={props.onClick}>Delete</button>
          <button>Edit</button>
        </div>
      </div>
    );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    // </state>
    this.state = {
      recepies: localStorage['recepies'] === undefined ?
    recepiesPreMade : JSON.parse(localStorage['recepies']),
      nameInput: ''
    }
    // </bind>
    this.removeRecepie = this.removeRecepie.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addRecepies = this.addRecepies.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
  }
  // </removeRecepie>
  removeRecepie(x) {
    var temp = this.state.recepies;
    delete temp[x];
    temp = temp.filter(x => x !== undefined);
    console.log(temp);
    this.setState({ recepies: temp });
  }
  // </removeIngredient>
  removeIngredient(ob, item) {
    var tempArr = this.state.recepies;
    console.log(tempArr[ob].ingredients);
    tempArr[ob].ingredients.splice(item, 1);
    this.setState({recepies: tempArr})
  }
  // </addRecepies>
  addRecepies() {
    var tempArr = this.state.recepies;
    tempArr.push({
       name: this.state.nameInput,
       ingredients: [],
       img: foodDefaultUrl
     })
    this.setState({recepies:  tempArr, nameInput: ''});
  }
  // </handleChange>
  handleChange(x) {
    this.setState({nameInput: x.target.value,})
  }
  // </render>
  render() {
    localStorage.setItem('recepies', JSON.stringify(this.state.recepies));

    var mapedRecepies = this.state.recepies.map(
      (x, i) => <Recepie key={i} num={i} onClick={() => this.removeRecepie(i)} name={x.name} ingredients={
        x.ingredients.map((x ,j) => <li><button className='recepie-remove-ingr' onClick={() => this.removeIngredient(i, j)}>x</button> {x}</li>)
      }/>
    )
    return(
      <section>
        <div className="main">{mapedRecepies}</div>
        <input value={this.state.nameInput} onChange={this.handleChange}/>
        <button onClick={this.addRecepies}>Add Recepie</button>
      </section>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'));
