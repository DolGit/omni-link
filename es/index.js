var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { extractLink } from '@dolnpm/link-extractor';

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
            link = extractLink(props.static);
        }
        return findUrl(to, href, link);
    };

    OmniLink.prototype.anchor = function anchor() {
        return React.createElement(
            'a',
            _extends({ href: this.state.url }, this.props, this.props.link, { className: this.props.className }),
            this.props.children || this.props.link.text
        );
    };

    OmniLink.prototype.link = function link() {
        return React.createElement(
            Link,
            _extends({ to: this.state.url }, this.props, this.props.link, { className: this.props.className }),
            this.props.children || this.props.link.text
        );
    };

    OmniLink.prototype.render = function render() {
        return this.state.type == 'anchor' ? this.anchor() : this.link();
    };

    return OmniLink;
}(React.Component);

OmniLink.propTypes = process.env.NODE_ENV !== "production" ? {
    href: PropTypes.string.isRequired,
    to: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.object.isRequired]),
    link: PropTypes.oneOfType([PropTypes.object.isRequired, PropTypes.bool.isRequired])
} : {};

export default OmniLink;