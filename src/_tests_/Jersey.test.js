import React from 'react'
import {shallow} from '../enzyme'
import Jersey from '../components/Footer'
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe ('Jersey.jsx', () => {
    it('renders', () => {
        const wrapper = shallow(<Jersey/>)

        expect(wrapper.exists()).toBe(true)
    })
    it('matches snapshot', () => {
        const tree = renderer.create(<Jersey/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('Footer css', () => {
        const tree = renderer.create(<Jersey/>).toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toHaveStyleRule('height', '100px')
    })
})
