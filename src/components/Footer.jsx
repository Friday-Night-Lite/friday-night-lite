import React from 'react'
import styled from 'styled-components'
import cat from '../assets/cat.png'

export const Wrapper = styled.div`
@import url('https://fonts.googleapis.com/css?family=Bungee+Shade|Frijole&display=swap');
display: flex;
align-items: center;
justify-content: center;
height: 100px;
background: #262626;
.container {
    width: 1200px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
h1{
    transition: all 1s ease;
    font-family: 'Frijole', cursive;
    color: red;
    font-size: 2rem;
    &:hover{
        color: white;
        cursor: pointer;
    }
}
.cat {
    height: 50px;
}`

const A = styled.a`
text-decoration: none;`

const Footer = () => {
    return (
        <Wrapper>

            <div className='container'>

            <A href='https://www.linkedin.com/in/chazguyton/' target='_blank'>
            <h1>Chaz</h1>
            </A>
            <A href='http://freddavison.info/' target='_blank'>
            <h1>Fred</h1>
            </A>
            <A href='https://www.linkedin.com/in/jeramiahfields/' target='_blank'> 
            <h1>Jeramiah</h1>
            </A>
            <A href='https://www.linkedin.com/in/johnclewis8/' target='_blank'>
            <h1>John</h1>
            </A>
            <A href='https://github.com/Friday-Night-Lite/friday-night-lite' target='_blank'>
            <img className='cat' src={cat} alt="github logo"/>
            </A>


           
            
            </div>
            
            
        </Wrapper>
    )
}

export default Footer

