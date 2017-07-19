'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

localStorage.clear();

function Outer(props) {
  return React.createElement('div', { className: 'focus-out', onClick: props.onClick, style: props.onOff ? {} : { display: 'none' } });
}

function Focused(props) {
  var ingrList = props.ingredients.map(function (x, i) {
    return React.createElement(
      'li',
      { key: i, contentEditable: props.editable ? 'true' : 'false', style: { background: props.editable ? 'white' : '' } },
      x
    );
  });
  return React.createElement(
    'div',
    { className: 'focused-main', style: props.onOff ? {} : { display: 'none' } },
    React.createElement(
      'h2',
      null,
      props.name
    ),
    React.createElement(
      'ul',
      null,
      ingrList
    ),
    React.createElement(
      'button',
      { onClick: props.edit, style: { width: '60px' } },
      props.editable ? 'Save' : 'Edit'
    ),
    React.createElement(
      'button',
      { onClick: props.done },
      'Done'
    )
  );
}

function Recipe(props) {
  return React.createElement(
    'a',
    { href: 'javascript:void(0);', onClick: props.focusOn },
    React.createElement(
      'div',
      { className: 'recipe' },
      React.createElement(
        'button',
        { onClick: props.delete },
        'X'
      ),
      React.createElement(
        'h3',
        { className: 'recipe-name' },
        props.name
      ),
      React.createElement(
        'div',
        null,
        React.createElement('img', { className: 'recipe-img', src: props.img }),
        React.createElement(
          'h5',
          null,
          'Ingredients: ',
          props.ingredientsNum
        )
      )
    )
  );
}

var Main = function (_React$Component) {
  _inherits(Main, _React$Component);

  function Main(props) {
    _classCallCheck(this, Main);

    // </state>
    var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

    _this.state = {
      recipes: localStorage['recipes'] === undefined ? recipesPreMade : JSON.parse(localStorage['recipes']),
      focused: false,
      focusedRecipeNum: 0,
      editable: false
      // </bind>
    };_this.focusOn = _this.focusOn.bind(_this);
    _this.toggleEdit = _this.toggleEdit.bind(_this);
    _this.toggleFocus = _this.toggleFocus.bind(_this);
    return _this;
  }

  _createClass(Main, [{
    key: 'focusOn',
    value: function focusOn(num) {
      this.setState({ focused: true, focusedRecipeNum: num });
    }
  }, {
    key: 'toggleEdit',
    value: function toggleEdit() {
      this.setState({ editable: !this.state.editable });
    }
  }, {
    key: 'toggleFocus',
    value: function toggleFocus() {
      this.setState({ focused: !this.state.focused });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var objNum = this.state.focusedRecipeNum;

      var mapedRecepies = this.state.recipes.map(function (x, i) {
        return React.createElement(Recipe, { focusOn: function focusOn() {
            return _this2.focusOn(i);
          }, name: x.name, img: x.img });
      });
      return React.createElement(
        'section',
        { className: 'main' },
        mapedRecepies,
        React.createElement(Focused, {
          name: this.state.recipes[objNum].name,
          ingredients: this.state.recipes[objNum].ingredients,
          edit: this.toggleEdit,
          editable: this.state.editable,
          onOff: this.state.focused,
          done: this.toggleFocus
        }),
        React.createElement(Outer, { onClick: this.toggleFocus, onOff: this.state.focused })
      );
    }
  }]);

  return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById('app'));