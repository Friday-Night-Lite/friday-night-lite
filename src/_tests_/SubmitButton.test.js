import React from 'react'
import {shallow} from '../enzyme'
import SubmitButton from '../components/SubmitButton'
import renderer from 'react-test-renderer'
import 'jest-styled-components'

describe ('SubmitButton.jsx', () => {
    it('renders', () => {
        const wrapper = shallow(<SubmitButton/>)

        expect(wrapper.exists()).toBe(true)
    })
    it('matches snapshot', () => {
        const tree = renderer.create(<SubmitButton/>).toJSON()
        expect(tree).toMatchSnapshot()
    })
    it('SubmitButton css', () => {
        const tree = renderer.create(<SubmitButton/>).toJSON()
        expect(tree).toMatchSnapshot()
        expect(tree).toHaveStyleRule('display', 'inline-block')
    })
})