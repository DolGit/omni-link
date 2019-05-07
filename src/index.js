import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {extractLink} from '@dolnpm/link-extractor'

const setState = (url, type) => {
    return {url, type}
}

const findUrl = (to, href, link) => {
    if (href) return setState(href, 'anchor')
    if (to) return setState(to, 'link')
    if (link.href) return setState(link.href, 'anchor')
    if (link.to) return setState(link.to, 'link')

    return setState(null, 'link')
}

class OmniLink extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.refresh(props)
    }

    componentWillReceiveProps(nextProps) {
        this.setState(this.refresh(nextProps))
    }

    refresh(props) {
        let {to, href, link} = props
        if (props.static) {
            link = extractLink(props.static)
        }
        return findUrl(to, href, link)
    }

    anchor() {
        return (
            <a href={this.state.url} {...this.props} {...this.props.link} className={this.props.className}>
                {this.props.children || this.props.link.text}
            </a>
        )
    }

    link() {
        return (
            <Link to={this.state.url} {...this.props} {...this.props.link} className={this.props.className}>
                {this.props.children || this.props.link.text}
            </Link>
        )
    }

    render() {
        return this.state.type == 'anchor' ? this.anchor() : this.link()
    }
}

OmniLink.propTypes = {
    href: PropTypes.string,
    to: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    link: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.bool
    ])
};

export default OmniLink