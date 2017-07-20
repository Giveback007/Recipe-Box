var editableColor = 'white';
var foodDefaultUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/food-default.jpeg';
var recipesPreMade = [
  {
    'name': 'Roasted Chicken',
    'ingredients': ['blah blah', 'stuff', 'more stuff'],
    'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/roasted-chicken2.jpg'
  },
  {
    'name': 'Pumkin Pie',
    'ingredients': ['blah bluh', 'damb it', 'less stuff'],
    'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/pumkin-pie.jpg'
  },
  {
    'name': 'Grilled Cheese Sandwich',
    'ingredients': ['could you blah', 'stuffiness', 'more stuffiness'],
    'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/grilled-cheese-sandwich2.jpg'
  }
];

localStorage.clear(); // remove this

function Outer(props) {
  return <div className="focus-out" onClick={props.onClick} style={ props.onOff ? {} : {display: 'none'} }/>
}

class Focused extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      ingredients: this.props.ingredients,
      img: this.props.img,
      editable: this.props.editable
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.removeIngrd = this.removeIngrd.bind(this);
    this.addIngrd = this.addIngrd.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }

  toggleEdit() {
    this.setState({editable: !this.state.editable});
    this.saveRecipe();
  }

  removeIngrd(num) {
    var tempArr = this.state.ingredients.slice();
    tempArr.splice(num, 1);
    this.setState({ingredients: tempArr});
  }

  addIngrd() {
    var tempArr = this.state.ingredients.slice();
    tempArr.push('');
    this.setState({ingredients: tempArr});
  }

  saveRecipe() {
    var tempIngrdArr = [];
    var ingrdElmns = document.getElementsByClassName('ingrd');
    var focusedName = document.getElementById('focused-name').innerText;
    var img = document.getElementById('imgUrl').innerText;

    for (var i = 0; i < ingrdElmns.length; i++) {
      tempIngrdArr.push(ingrdElmns[i].innerText);
    }

    tempIngrdArr = tempIngrdArr.filter(x => x !== "");
    this.setState({name: focusedName, ingredients: tempIngrdArr});
    this.props.update(focusedName, tempIngrdArr, img);
  }

  done = () => {
    this.saveRecipe();
    this.props.done();
  };

  delete = () => {
    this.props.delete();
    this.props.done();
  }

  render() {
    var ingrList = this.state.ingredients.map((x, i) => {
      return(
        <li key={i} className='ingrd-parent'>
          <button style={this.state.editable ? {} : {display: 'none'}} onClick={() => this.removeIngrd(i)}>x</button>
          <span
            contentEditable={ this.state.editable ? 'true' : 'false'}
            style={{ background: this.state.editable ? editableColor : '' }}
            className='ingrd'
            >{x}
          </span>
        </li>);
    });

    return(
      <div className="focused-main">
        <h2
          id='focused-name'
          contentEditable={ this.state.editable ? 'true' : 'false'}
          style={{ background: this.state.editable ? editableColor : '' }}>{this.state.name}</h2>
        <ul>
          {ingrList}
          {this.state.editable ? <button onClick={this.addIngrd}>add ingredients</button> : null}
        </ul>
        <div className='img-url-parrent'>
          <h5>Img Url: </h5>
          <div
            id='imgUrl'
            contentEditable={ this.state.editable ? 'true' : 'false'}
            style={{ background: this.state.editable ? editableColor : '' }}
            >{this.state.img}
          </div>
        </div>

        <div className='bottom-btns'>
          <button onClick={this.toggleEdit} style={{width: '60px'}}>{this.state.editable ? 'Save' : 'Edit'}</button>
          <button onClick={this.done}>Done</button>
          <button onClick={this.delete}>Delete</button>
        </div>
      </div>
    );
  }
}

class Recipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
    this.hoverState = this.hoverState.bind(this);
  }
  hoverState(isOn) {
    this.setState({hover: isOn})
  }
  render() {
    return(
      <section>
        <a href="javascript:void(0);" onClick={this.props.focusOn}>
          <div
            className='recipe'
            onMouseEnter={() => this.hoverState(true)}
            onMouseLeave={() => this.hoverState(false)}
          >
            <h3 className="recipe-name">{this.props.name}</h3>

            <div>
              <i className="fa fa-pencil-square-o fontawesome" aria-hidden="true" style={this.state.hover ? {} : {display: 'none'}}></i>
              <img src={this.props.img}/>
              <h5>{this.props.ingredientsNum} Ingredients</h5>
            </div>
          </div>
        </a>
      </section>
    );
  }
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
    this.focusOff = this.focusOff.bind(this);
    this.delete = this.delete.bind(this);
    this.updateIngrd = this.updateIngrd.bind(this);
    this.newRecipe = this.newRecipe.bind(this);
  }

  delete(num) {
    var yesNo = confirm('Confirm Deletion?');
    if (yesNo) {
      var tempArr = this.state.recipes.slice();
      tempArr.splice(num, 1);
      this.setState({recipes: tempArr})
    }
  }

  updateIngrd(newName, newIngrd, newImg) {
    if (newName === '' || newName === 'Recipe') {
      newName = 'Recipe ' + this.state.recipes.length;
    }
    var tempRecipes = this.state.recipes.slice();
    tempRecipes[this.state.focusedRecipeNum] = {
      name: newName, ingredients: newIngrd, img: newImg
    }
    this.setState({recipes: tempRecipes});
  }

  focusOn(num) {
    this.setState({ focused: true, focusedRecipeNum: num });
  }

  focusOff() {
    this.setState({ focused: false, editable: false });
  }

  newRecipe() {
    var tempRecipes = this.state.recipes;
    tempRecipes.push({
      name: 'Recipe', ingredients: ['', '', ''], img: foodDefaultUrl
    });
    this.setState({
      recipes: tempRecipes,
      focused: true,
      focusedRecipeNum: this.state.recipes.length - 1,
      editable: true
    });
  }

  render() {
    localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
    var addReiceBtn = <button onClick={this.newRecipe}>Add Recipe</button>
    if (!this.state.recipes.length) { return( // sane as (.length === 0)
      <div>
      <section className="main">

      </section>
      {addReiceBtn}
    </div>
    )};

    var objNum = this.state.focusedRecipeNum;

    var mapedRecepies = this.state.recipes.map((x, i) =>
      <Recipe
        focusOn={() => this.focusOn(i)}
        name={x.name}
        img={x.img}
        delete={() => {this.delete(i)}}
        ingredientsNum={x.ingredients.length}
      />
    );

    return(
      <div>
      <section className="main">
      {mapedRecepies}
      { this.state.focused ?
        <Focused
          name={this.state.recipes[objNum].name}
          ingredients={this.state.recipes[objNum].ingredients}
          onOff={this.state.focused}
          done={this.focusOff}
          update={this.updateIngrd}
          img={this.state.recipes[objNum].img}
          editable={this.state.editable}
          delete={() => this.delete(objNum)}
        /> : null
      }
      <Outer onClick={this.focusOff} onOff={this.state.focused}/>
    </section>
    {addReiceBtn}
  </div>
    );
  }
}

ReactDOM.render(<Main/>, document.getElementById('app'));
