var foodDefaultUrl = '/assets/food-default.jpeg';
var recipesPreMade = [
  {
    'name': 'Roasted Chicken',
    'ingredients': ['blah blah', 'stuff', 'more stuff'],
    'img': '/assets/roasted-chicken.jpg'
  },
  {
    'name': 'Pumkin Pie',
    'ingredients': ['blah bluh', 'damb it', 'less stuff'],
    'img': '/assets/pumkin-pie.jpg'
  },
  {
    'name': 'Grilled Cheese Sandwich',
    'ingredients': ['could you blah', 'stuffiness', 'more stuffiness'],
    'img': '/assets/grilled-cheese-sandwich.jpg'
  }
];

localStorage.clear();

function Outer(props) {
  return <div className="focus-out" onClick={props.onClick} style={ props.onOff ? {} : {display: 'none'} }/>
}

function Focused(props) {
  var ingrList = props.ingredients.map(
    (x, i) => <li key={i} contentEditable={ props.editable ? 'true' : 'false'} style={{ background: props.editable ? 'white' : '' }}>{x}</li>
  );
  return(
    <div className="focused-main" style={ props.onOff ? {} : {display: 'none'} }>
      <h2>{props.name}</h2>
      <ul>{ingrList}</ul>
      <button onClick={props.edit} style={{width: '60px'}}>{props.editable ? 'Save' : 'Edit'}</button>
      <button onClick={props.done}>Done</button>
    </div>
  );
}

function Recipe(props) {
    return(
      <a href="javascript:void(0);" onClick={props.focusOn}>
        <div className='recipe'>
          <button onClick={props.delete}>X</button>
          <h3 className="recipe-name">{props.name}</h3>
          <div>
            <img className='recipe-img' src={props.img}/>
            <h5>Ingredients: {props.ingredientsNum}</h5>
          </div>
        </div>
      </a>
    );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    // </state>
    this.state = {
      recipes: localStorage['recipes'] === undefined ?
    recipesPreMade : JSON.parse(localStorage['recipes']),
      focused: false,
      focusedRecipeNum: 0,
      editable: false
    }
    // </bind>
    this.focusOn = this.focusOn.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.toggleFocus = this.toggleFocus.bind(this);
  }

  focusOn(num) {
    this.setState({ focused: true, focusedRecipeNum: num });
  }

  toggleEdit() {
    this.setState({ editable: !this.state.editable })
  }

  toggleFocus() {
    this.setState({ focused: !this.state.focused })
  }

  render() {
    var objNum = this.state.focusedRecipeNum;

    var mapedRecepies = this.state.recipes.map((x, i) => <Recipe focusOn={() => this.focusOn(i)} name={x.name} img={x.img}/>);
    return(
      <section className="main">
      {mapedRecepies}
      <Focused
        name={this.state.recipes[objNum].name}
        ingredients={this.state.recipes[objNum].ingredients}
        edit={this.toggleEdit}
        editable={this.state.editable}
        onOff={this.state.focused}
        done={this.toggleFocus}
      />
      <Outer onClick={this.toggleFocus} onOff={this.state.focused}/>
    </section>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'));
