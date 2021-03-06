var editableColor = '#D9DADC';
var foodDefaultUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/food-default.jpeg';
var recipesPreMade = [
  {
    'name': 'Roasted Chicken',
    'ingredients': ['roasting chicken', '2 tspns of olive oil', '3/4 tspns of salt', '1/4 tspns of black pepper', '2 garlic cloves', '1 lemon' ],
    'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/roasted-chicken2.jpg'
  },
  {
    'name': 'Pumpkin Pie',
    'ingredients': ['pie crust', '2 eggs', '1/3 cup of vegetable oil', '1/2 cup of sugar', '1 cup of flour', '1 can of pumpkin'],
    'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/pumkin-pie.jpg'
  },
  {
    'name': 'Grilled Cheese Sandwich',
    'ingredients': ['bread', 'cheese', '1 tbls of butter'],
    'img': 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1134440/grilled-cheese-sandwich2.jpg'
  }
];

// localStorage.clear(); // remove this

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
    this.done = this.done.bind(this);
    this.delete = this.delete.bind(this);
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

  done() {
    this.saveRecipe();
    this.props.done();
  };

  delete() {
    this.props.delete();
    this.props.done();
  }

  render() {
    var ingrList = this.state.ingredients.map((x, i) => {
      return(
        <li key={i} className='ingrd-parent'>
          <span
            contentEditable={ this.state.editable ? 'true' : 'false'}
            style={{ background: this.state.editable ? editableColor : '' }}
            className='ingrd'
            >{x}
          </span>
          <button className='focused-remove-ingrd' style={this.state.editable ? {} : {display: 'none'}} onClick={() => this.removeIngrd(i)}>x</button>
        </li>);
    });

    return(
      <div className="focused-main">
        <h2
          id='focused-name'
          contentEditable={ this.state.editable ? 'true' : 'false'}
          style={{ background: this.state.editable ? editableColor : '' }}>{this.state.name}</h2>
          <div className='focused-edit'><button onClick={this.toggleEdit}>{this.state.editable ? 'Save' : 'Edit'}</button></div>
        <ul>
          {ingrList}
          {this.state.editable ? <div className='focused-add-ingrd'><button onClick={this.addIngrd}><i className="fa fa-plus" aria-hidden="true"/> <i className="fa fa-list-ul" aria-hidden="true"/></button></div> : null}
        </ul>
        <div className='img-url-parrent' style={this.state.editable ? {} : {display: 'none'}}>
          <h5>Img: </h5>
          <div
            id='imgUrl'
            contentEditable={ this.state.editable ? 'true' : 'false'}
            style={this.state.editable ? { background: editableColor } : {}}
            >{this.state.img}
          </div>
        </div>
        <div className='bottom-btns'>
          <button className='focused-done' onClick={this.done}>Done</button>
          <button className='focused-delete' onClick={this.delete}>Delete</button>
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
            </div>
            <h5>{this.props.ingredientsNum} <i className="fa fa-list" aria-hidden="true"></i></h5>
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
    var addReiceBtn = (
      <div className='main-add-btn' style={!this.state.recipes.length ? {width: 200, height: 75} : {}}>
        <button onClick={this.newRecipe} class='add-recipe-btn'>
          Add <i className="fa fa-cutlery" aria-hidden="true"/>
        </button>
      </div>
    );
    if (!this.state.recipes.length) { return( // sane as (.length === 0)
      <div>
      <section className="main">
        {addReiceBtn}
      </section>

    </div>
    )};

    var objNum = this.state.focusedRecipeNum;

    var mapedRecipes = this.state.recipes.map((x, i) =>
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
      {mapedRecipes}
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
