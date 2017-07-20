'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var editableColor = 'white';
var foodDefaultUrl = '/assets/food-default.jpeg';
var recipesPreMade = [{
  'name': 'Roasted Chicken',
  'ingredients': ['blah blah', 'stuff', 'more stuff'],
  'img': '/assets/roasted-chicken.jpg'
}, {
  'name': 'Pumkin Pie',
  'ingredients': ['blah bluh', 'damb it', 'less stuff'],
  'img': '/assets/pumkin-pie.jpg'
}, {
  'name': 'Grilled Cheese Sandwich',
  'ingredients': ['could you blah', 'stuffiness', 'more stuffiness'],
  'img': '/assets/grilled-cheese-sandwich.jpg'
}];

localStorage.clear(); // remove this

function Outer(props) {
  return React.createElement('div', { className: 'focus-out', onClick: props.onClick, style: props.onOff ? {} : { display: 'none' } });
}

var Focused = function (_React$Component) {
  _inherits(Focused, _React$Component);

  function Focused(props) {
    _classCallCheck(this, Focused);

    var _this = _possibleConstructorReturn(this, (Focused.__proto__ || Object.getPrototypeOf(Focused)).call(this, props));

    _this.done = function () {
      _this.saveRecipe();
      _this.props.done();
    };

    _this.delete = function () {
      _this.props.delete();
      _this.props.done();
    };

    _this.state = {
      name: _this.props.name,
      ingredients: _this.props.ingredients,
      img: _this.props.img,
      editable: _this.props.editable
    };
    _this.toggleEdit = _this.toggleEdit.bind(_this);
    _this.removeIngrd = _this.removeIngrd.bind(_this);
    _this.addIngrd = _this.addIngrd.bind(_this);
    _this.saveRecipe = _this.saveRecipe.bind(_this);
    return _this;
  }

  _createClass(Focused, [{
    key: 'toggleEdit',
    value: function toggleEdit() {
      this.setState({ editable: !this.state.editable });
      this.saveRecipe();
    }
  }, {
    key: 'removeIngrd',
    value: function removeIngrd(num) {
      var tempArr = this.state.ingredients.slice();
      tempArr.splice(num, 1);
      this.setState({ ingredients: tempArr });
    }
  }, {
    key: 'addIngrd',
    value: function addIngrd() {
      var tempArr = this.state.ingredients.slice();
      tempArr.push('');
      this.setState({ ingredients: tempArr });
    }
  }, {
    key: 'saveRecipe',
    value: function saveRecipe() {
      var tempIngrdArr = [];
      var ingrdElmns = document.getElementsByClassName('ingrd');
      var focusedName = document.getElementById('focused-name').innerText;
      var img = document.getElementById('imgUrl').innerText;

      for (var i = 0; i < ingrdElmns.length; i++) {
        tempIngrdArr.push(ingrdElmns[i].innerText);
      }

      tempIngrdArr = tempIngrdArr.filter(function (x) {
        return x !== "";
      });
      this.setState({ name: focusedName, ingredients: tempIngrdArr });
      this.props.update(focusedName, tempIngrdArr, img);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var ingrList = this.state.ingredients.map(function (x, i) {
        return React.createElement(
          'li',
          { key: i, className: 'ingrd-parent' },
          React.createElement(
            'button',
            { style: _this2.state.editable ? {} : { display: 'none' }, onClick: function onClick() {
                return _this2.removeIngrd(i);
              } },
            'x'
          ),
          React.createElement(
            'span',
            {
              contentEditable: _this2.state.editable ? 'true' : 'false',
              style: { background: _this2.state.editable ? editableColor : '' },
              className: 'ingrd'
            },
            x
          )
        );
      });

      return React.createElement(
        'div',
        { className: 'focused-main' },
        React.createElement(
          'h2',
          {
            id: 'focused-name',
            contentEditable: this.state.editable ? 'true' : 'false',
            style: { background: this.state.editable ? editableColor : '' } },
          this.state.name
        ),
        React.createElement(
          'ul',
          null,
          ingrList,
          this.state.editable ? React.createElement(
            'button',
            { onClick: this.addIngrd },
            'add ingredients'
          ) : null
        ),
        React.createElement(
          'div',
          { style: { display: 'flex' } },
          React.createElement(
            'span',
            null,
            'Img Url: '
          ),
          React.createElement(
            'span',
            {
              id: 'imgUrl',
              contentEditable: this.state.editable ? 'true' : 'false',
              style: { background: this.state.editable ? editableColor : '' }
            },
            this.state.img
          )
        ),
        React.createElement(
          'button',
          { onClick: this.toggleEdit, style: { width: '60px' } },
          this.state.editable ? 'Save' : 'Edit'
        ),
        React.createElement(
          'button',
          { onClick: this.done },
          'Done'
        ),
        React.createElement(
          'button',
          { onClick: this.delete },
          'Delete'
        )
      );
    }
  }]);

  return Focused;
}(React.Component);

var Recipe = function (_React$Component2) {
  _inherits(Recipe, _React$Component2);

  function Recipe(props) {
    _classCallCheck(this, Recipe);

    var _this3 = _possibleConstructorReturn(this, (Recipe.__proto__ || Object.getPrototypeOf(Recipe)).call(this, props));

    _this3.state = {
      hover: false
    };
    _this3.hoverState = _this3.hoverState.bind(_this3);
    return _this3;
  }

  _createClass(Recipe, [{
    key: 'hoverState',
    value: function hoverState(isOn) {
      this.setState({ hover: isOn });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return React.createElement(
        'section',
        null,
        React.createElement(
          'a',
          { href: 'javascript:void(0);', onClick: this.props.focusOn },
          React.createElement(
            'div',
            {
              className: 'recipe',
              onMouseEnter: function onMouseEnter() {
                return _this4.hoverState(true);
              },
              onMouseLeave: function onMouseLeave() {
                return _this4.hoverState(false);
              }
            },
            React.createElement(
              'h3',
              { className: 'recipe-name' },
              this.props.name
            ),
            React.createElement(
              'div',
              null,
              React.createElement('i', { className: 'fa fa-pencil-square-o fontawesome', 'aria-hidden': 'true', style: this.state.hover ? {} : { display: 'none' } }),
              React.createElement('img', { src: this.props.img, style: this.state.hover ? { opacity: '0.75' } : {} }),
              React.createElement(
                'h5',
                null,
                this.props.ingredientsNum,
                ' Ingredients'
              )
            )
          )
        )
      );
    }
  }]);

  return Recipe;
}(React.Component);

var Main = function (_React$Component3) {
  _inherits(Main, _React$Component3);

  function Main(props) {
    _classCallCheck(this, Main);

    // </state>
    var _this5 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this5.state = {
      recipes: localStorage['recipes'] === undefined ? recipesPreMade : JSON.parse(localStorage['recipes']),
      focused: false,
      focusedRecipeNum: 0,
      editable: false
      // </bind>
    };_this5.focusOn = _this5.focusOn.bind(_this5);
    _this5.focusOff = _this5.focusOff.bind(_this5);
    _this5.delete = _this5.delete.bind(_this5);
    _this5.updateIngrd = _this5.updateIngrd.bind(_this5);
    _this5.newRecipe = _this5.newRecipe.bind(_this5);
    return _this5;
  }

  _createClass(Main, [{
    key: 'delete',
    value: function _delete(num) {
      var yesNo = confirm('Confirm Deletion?');
      if (yesNo) {
        var tempArr = this.state.recipes.slice();
        tempArr.splice(num, 1);
        this.setState({ recipes: tempArr });
      }
    }
  }, {
    key: 'updateIngrd',
    value: function updateIngrd(newName, newIngrd, newImg) {
      if (newName === '' || newName === 'Recipe') {
        newName = 'Recipe ' + this.state.recipes.length;
      }
      var tempRecipes = this.state.recipes.slice();
      tempRecipes[this.state.focusedRecipeNum] = {
        name: newName, ingredients: newIngrd, img: newImg
      };
      this.setState({ recipes: tempRecipes });
    }
  }, {
    key: 'focusOn',
    value: function focusOn(num) {
      this.setState({ focused: true, focusedRecipeNum: num });
    }
  }, {
    key: 'focusOff',
    value: function focusOff() {
      this.setState({ focused: false, editable: false });
    }
  }, {
    key: 'newRecipe',
    value: function newRecipe() {
      var tempRecipes = this.state.recipes;
      tempRecipes.push({
        name: 'Recipe', ingredients: [''], img: foodDefaultUrl
      });
      this.setState({
        recipes: tempRecipes,
        focused: true,
        focusedRecipeNum: this.state.recipes.length - 1,
        editable: true
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      localStorage.setItem('recipes', JSON.stringify(this.state.recipes));
      var addReiceBtn = React.createElement(
        'button',
        { onClick: this.newRecipe },
        'Add Recipe'
      );
      if (!this.state.recipes.length) {
        return (// sane as (.length === 0)
          React.createElement(
            'div',
            null,
            React.createElement('section', { className: 'main' }),
            addReiceBtn
          )
        );
      };

      var objNum = this.state.focusedRecipeNum;

      var mapedRecepies = this.state.recipes.map(function (x, i) {
        return React.createElement(Recipe, {
          focusOn: function focusOn() {
            return _this6.focusOn(i);
          },
          name: x.name,
          img: x.img,
          'delete': function _delete() {
            _this6.delete(i);
          },
          ingredientsNum: x.ingredients.length
        });
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'section',
          { className: 'main' },
          mapedRecepies,
          this.state.focused ? React.createElement(Focused, {
            name: this.state.recipes[objNum].name,
            ingredients: this.state.recipes[objNum].ingredients,
            onOff: this.state.focused,
            done: this.focusOff,
            update: this.updateIngrd,
            img: this.state.recipes[objNum].img,
            editable: this.state.editable,
            'delete': function _delete() {
              return _this6.delete(objNum);
            }
          }) : null,
          React.createElement(Outer, { onClick: this.focusOff, onOff: this.state.focused })
        ),
        addReiceBtn
      );
    }
  }]);

  return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById('app'));