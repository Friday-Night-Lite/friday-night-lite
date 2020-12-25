import React from 'react'
import styled from 'styled-components'
import cat from '../assets/cat.png'

export const Wrapper = styled.div`
         @import url('https://fonts.googleapis.com/css?family=Bungee+Shade|Frijole&display=swap');
         display: flex;
         box-sizing: border-box;
         contain: content;
         align-items: center;
         justify-content: center;
         height: 75px;
         background: #262626;
         position: sticky;
         width: 100%;
         bottom: -75px;
         .container {
           box-sizing: border-box;
           width: 100%;
           padding: 25px;
           display: flex;
           justify-content: space-evenly;
           align-items: center;
         }
         h1 {
           transition: all 1s ease;
           font-family: 'Frijole', cursive;
           color: red;
           font-size: 3vw;
           &:hover {
             color: white;
             cursor: pointer;
           }
         }
         .cat {
            margin: 15px;
            height: 5vw;
         }
       `

const A = styled.a`
text-decoration: none;`

const Footer = () => {
    return (
        <Wrapper>
            <div className='container'>
            <A href='https://www.linkedin.com/in/chazguyton/' target='_blank' rel="noreferrer">
            <h1>Chaz</h1>
            </A>
            <A href='https://www.linkedin.com/in/fdavison1/' target='_blank' rel="noreferrer">
            <h1>Fred</h1>
            </A>
            <A href='https://www.linkedin.com/in/jeramiahfields/' target='_blank' rel="noreferrer"> 
            <h1>Jeramiah</h1>
            </A>
            <A href='https://www.linkedin.com/in/johnclewis8/' target='_blank' rel="noreferrer">
            <h1>John</h1>
            </A>
            <A href='https://github.com/Friday-Night-Lite/friday-night-lite' target='_blank' rel="noreferrer">
            <img className='cat' src={cat} alt="github logo"/>
            </A>
            </div>
        </Wrapper>
    )
}

export default Footer

