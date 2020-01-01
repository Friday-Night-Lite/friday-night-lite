  import React from 'react'
import Admin from '../components/Admin'
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
//Chaz's test #1

describe('Admin.js function tests', () => {
const props = { game: { _id: 1, drivesArr: [0, 1, 2, 3, 4, 5] } }

  const adminRender = render(<Admin {...props}/>).container
  it('renders admin inputs', () => {
    expect(adminRender.querySelectorAll('input')).toBeTruthy()
  })
  it('matches snapshot', () => {
    const tree = renderer.create(<Admin {...props}/>).toJSON()
    expect(tree).toMatchSnapshot()
})
})
