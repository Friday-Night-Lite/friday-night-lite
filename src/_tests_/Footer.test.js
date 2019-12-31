import React from 'react'
import {shallow} from '../enzyme'
import Footer, {Wrapper} from '../components/Footer'
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe ('footer.jsx', () => {
    it('renders', () => {
        const wrapper = shallow(<Footer/>)

        expect(wrapper.exists()).toBe(true)
    })
    it('matches snapshot', () => {
        const tree = renderer.create(<Footer/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('Footer css', () => {
        const tree = renderer.create(<Wrapper/>).toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toHaveStyleRule('height', '100px')
    })
})
