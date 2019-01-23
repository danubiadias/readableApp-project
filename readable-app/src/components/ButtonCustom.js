import React from 'react'
import { Glyphicon } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const ButtonCustom = (props) => {

    const { icon, path, btnStyle } = props

    return (
        <Link to={path}>
            <button type="button" className={btnStyle}>
                <Glyphicon glyph={icon} />
            </button>
        </Link>
    )

}
export default ButtonCustom

