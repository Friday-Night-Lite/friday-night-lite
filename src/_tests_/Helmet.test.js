import React from 'react'
import {shallow} from '../enzyme'
import Helmet, {HelmetWrapper} from '../components/Helmet'
import renderer from 'react-test-renderer'
import 'jest-styled-components'


describe ('Helmet.jsx', () => {
    it('renders', () => {
        const wrapper = shallow(<Helmet/>)

        expect(wrapper.exists()).toBe(true)
    })
    it('matches snapshot', () => {
        const tree = renderer.create(<Helmet/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('Helmet css', () => {
        const tree = renderer.create(<HelmetWrapper/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
})