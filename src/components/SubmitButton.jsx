import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
	box-shadow:inset 0px 1px 0px 0px #f5978e;
	background:linear-gradient(to bottom, #f24537 5%, #c62d1f 100%);
	background-color:#f24537;
	border-radius:6px;
	border:1px solid #d02718;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family:Arial;
	font-size:15px;
	font-weight:bold;
	padding:6px 24px;
	text-decoration:none;
	text-shadow:0px 1px 0px #810e05;
:hover {
	background:linear-gradient(to bottom, #c62d1f 5%, #f24537 100%);
	background-color:#c62d1f;
}
:active {
	position:relative;
	top:1px;
}
:disabled {
    opacity: 0.5;
}
`

const SubmitButton = props => {
    console.log(props.disable)
    
    return (

    <Button
    disabled={props.disable}
    onClick={()=>props.addScore()}
    >{props.title}</Button>

    )
}

export default SubmitButton