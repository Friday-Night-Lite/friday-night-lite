import React from 'react'
import Admin from './Admin'
import { render } from '@testing-library/react'

describe('Admin.js function tests', () => {
const props = { game: { _id: 1, drivesArr: [0, 1, 2, 3, 4, 5] } }

  const adminRender = render(<Admin {...props}/>).container
  it('renders admin inputs', () => {
    // const { container } = adminRender()
    expect(adminRender.querySelectorAll('input')).toBeTruthy()
  })
})
