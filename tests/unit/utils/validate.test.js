// import { describe, it, expect } from 'jest'
import { validUsername, isExternal, formatFileSize } from '@/utils/validate.js'

describe('Utils:validate', () => {
  it('validURL', () => {
    expect(isExternal('https://www.xiaoyizhou.com')).toBe(true)
  })
  it('validUsername', () => {
    expect(validUsername('staff_v1')).toBe(true)
    expect(validUsername('staff_v2')).toBe(true)
    expect(validUsername('admin')).toBe(false)
  })
  it('formatFileSize', () => {
    expect(formatFileSize(960)).toBe('960B')
    expect(formatFileSize(1024)).toBe('1.00KB')
    expect(formatFileSize(3367990)).toBe('3.21MB')
    expect(formatFileSize(6543367990)).toBe('6.09GB')
  })
})
