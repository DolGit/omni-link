import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import {extractLink} from '@dolnpm/link-extractor'

const setState = (url, type) => {
    return {url, type}
}

const findUrl = (to, href, link) => {
    if (href) return setState(href, 'anchor')
    if (to) return setState(href, 'link')
    if (link.href) return setState(link.href, 'anchor')
    if (link.to) return setState(link.to, 'link')

    return setState(null, 'link')
}

class OmniLink extends React.Component {
    constructor(props) {
        super(props)
        let {to, href, link} = props
        if (props.static) {
            link = extractLink(props.static)
        }
        this.state = findUrl(to, href, link)
    }

    anchor() {
        return (
            <a href={this.state.url} className={this.props.className} {...this.props.link}>
                {this.props.children}
            </a>
        )
    }

    link() {
        return (
            <Link to={this.state.url} className={this.props.className} {...this.props.link}>
                {this.props.children}
            </Link>
        )
    }

    render() {
        return this.state.type == 'anchor' ? this.anchor() : this.link()
    }
}

OmniLink.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    link:   PropTypes.oneOfType([
        PropTypes.object.isRequired,
        PropTypes.bool.isRequired
    ])
};

export default OmniLink