import { returnText } from '../functions/returnText'

describe('returnText function tests', ()=> {
    it('should return a string', ()=> {
        let result = returnText()
        expect(result).toBe('string')
    })
})