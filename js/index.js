'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var foodDefaultUrl = '/assets/food-default.jpeg';
var recepiesPreMade = [{
  'name': 'Pumkin Pie',
  'ingredients': ['blah blah', 'stuff', 'more stuff'],
  'img': foodDefaultUrl
}, {
  'name': 'Chocolate Cake',
  'ingredients': ['blah bluh', 'damb it', 'less stuff'],
  'img': foodDefaultUrl
}, {
  'name': 'Smoothie',
  'ingredients': ['could you blah', 'stuffiness', 'more stuffiness'],
  'img': foodDefaultUrl
}];

localStorage.clear();

function Recepie(props) {
  return React.createElement(
    'div',
    { className: 'recepie' },
    React.createElement(
      'h1',
      { className: 'recepie-name' },
      props.name
    ),
    React.createElement(
      'div',
      null,
      React.createElement(
        'ul',
        { className: 'recepie-ingredients' },
        props.ingredients,
        React.createElement(
          'li',
          { style: { display: 'flex' } },
          React.createElement(
            'button',
            null,
            '+'
          ),
          React.createElement('input', { style: { width: '85%' }, placeholder: 'add ingredient' })
        )
      ),
      React.createElement(
        'button',
        { className: 'btn delete', onClick: props.onClick },
        'Delete'
      ),
      React.createElement(
        'button',
        null,
        'Edit'
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
      recepies: localStorage['recepies'] === undefined ? recepiesPreMade : JSON.parse(localStorage['recepies']),
      nameInput: ''
      // </bind>
    };_this.removeRecepie = _this.removeRecepie.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.addRecepies = _this.addRecepies.bind(_this);
    return _this;
  }
  // </removeRecepie>


  _createClass(Main, [{
    key: 'removeRecepie',
    value: function removeRecepie(x) {
      var temp = this.state.recepies;
      delete temp[x];
      temp = temp.filter(function (x) {
        return x !== undefined;
      });
      console.log(temp);
      this.setState({ recepies: temp });
    }
    // </removeIngredient>

  }, {
    key: 'removeIngredient',
    value: function removeIngredient(ob, item) {
      var tempArr = this.state.recepies;
      tempArr.ingredients;
      // this.setState({})
    }
    // </addRecepies>

  }, {
    key: 'addRecepies',
    value: function addRecepies() {
      var tempArr = this.state.recepies;
      tempArr.push({
        name: this.state.nameInput,
        ingredients: [],
        img: foodDefaultUrl
      });
      this.setState({ recepies: tempArr, nameInput: '' });
    }
    // </handleChange>

  }, {
    key: 'handleChange',
    value: function handleChange(x) {
      this.setState({ nameInput: x.target.value });
    }
    // </render>

  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      localStorage.setItem('recepies', JSON.stringify(this.state.recepies));

      var mapedRecepies = this.state.recepies.map(function (x, i) {
        return React.createElement(Recepie, { key: i, num: i, onClick: function onClick() {
            return _this2.removeRecepie(i);
          }, name: x.name, ingredients: x.ingredients.map(function (x, i) {
            return React.createElement(
              'li',
              null,
              React.createElement(
                'button',
                { className: 'recepie-remove-ingr' },
                'x'
              ),
              ' ',
              x
            );
          }) });
      });
      return React.createElement(
        'section',
        null,
        React.createElement(
          'div',
          { className: 'main' },
          mapedRecepies
        ),
        React.createElement('input', { value: this.state.nameInput, onChange: this.handleChange }),
        React.createElement(
          'button',
          { onClick: this.addRecepies },
          'Add Recepie'
        )
      );
    }
  }]);

  return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById('app'));