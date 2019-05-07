'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _linkExtractor = require('@dolnpm/link-extractor');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var setState = function setState(url, type) {
    return { url: url, type: type };
};

var findUrl = function findUrl(to, href, link) {
    if (href) return setState(href, 'anchor');
    if (to) return setState(to, 'link');
    if (link.href) return setState(link.href, 'anchor');
    if (link.to) return setState(link.to, 'link');

    return setState(null, 'link');
};

var OmniLink = function (_React$Component) {
    _inherits(OmniLink, _React$Component);

    function OmniLink(props) {
        _classCallCheck(this, OmniLink);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = _this.refresh(props);
        return _this;
    }

    OmniLink.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.setState(this.refresh(nextProps));
    };

    OmniLink.prototype.refresh = function refresh(props) {
        var to = props.to,
            href = props.href,
            link = props.link;

        if (props.static) {
            link = (0, _linkExtractor.extractLink)(props.static);
        }
        return findUrl(to, href, link);
    };

    OmniLink.prototype.anchor = function anchor() {
        return _react2.default.createElement(
            'a',
            _extends({ href: this.state.url }, this.props, this.props.link, { className: this.props.className }),
            this.props.children || this.props.link.text
        );
    };

    OmniLink.prototype.link = function link() {
        return _react2.default.createElement(
            _reactRouterDom.Link,
            _extends({ to: this.state.url }, this.props, this.props.link, { className: this.props.className }),
            this.props.children || this.props.link.text
        );
    };

    OmniLink.prototype.render = function render() {
        return this.state.type == 'anchor' ? this.anchor() : this.link();
    };

    return OmniLink;
}(_react2.default.Component);

OmniLink.propTypes = process.env.NODE_ENV !== "production" ? {
    href: _propTypes2.default.string.isRequired,
    to: _propTypes2.default.oneOfType([_propTypes2.default.string.isRequired, _propTypes2.default.object.isRequired]),
    link: _propTypes2.default.oneOfType([_propTypes2.default.object.isRequired, _propTypes2.default.bool.isRequired])
} : {};

exports.default = OmniLink;
module.exports = exports['default'];