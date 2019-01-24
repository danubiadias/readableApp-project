import React from 'react'
import ButtonCustom from './ButtonCustom'

const Page404 = (props) => {

    return (
        <div>
            <ButtonCustom icon={"arrow-left"} path={"/"} btnStyle={"btn btn-primary btn-circle btn-lg btn-left "} /><br /><br />
            <h3 align="center"> Post não encontrado (404) </h3>
        </div>
    )

}
export default Page404
