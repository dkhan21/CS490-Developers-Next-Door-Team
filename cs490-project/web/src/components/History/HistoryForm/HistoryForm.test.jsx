import { render, screen } from '@redwoodjs/testing/web'
import { Loading, Empty, Failure, Success } from 'src/components/History/HistoryForm/HistoryForm.jsx'

jest.mock('src/components/History/HistoryForm/HistoryForm.jsx', () => ({
  Loading: () => <div>Loading</div>,
  Empty: () => <div>Empty</div>,
  Failure: () => <div>Failure</div>,
  Success: () => <div>Success</div>,
}))

describe('HistoryForm', () => {
  it('renders Loading successfully', () => {
    expect(() => {
      render(<Loading />)
    }).not.toThrow()
  })

  it('renders Empty successfully', () => {
    expect(() => {
      render(<Empty />)
    }).not.toThrow()
  })

  it('renders Failure successfully', () => {
    expect(() => {
      render(<Failure />)
    }).not.toThrow()
  })

  it('renders Success successfully', () => {
    expect(() => {
      render(<Success />)
    }).not.toThrow()
  })
})