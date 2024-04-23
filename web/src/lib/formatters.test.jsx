import { render, waitFor, screen } from '@redwoodjs/testing/web'

import {
  formatEnum,
  jsonTruncate,
  truncate,
  timeTag,
  jsonDisplay,
  checkboxInputTag,
} from './formatters'

describe('formatEnum', () => {
  it('handles nullish values', () => {
    expect(formatEnum(null)).toEqual('')
    expect(formatEnum('')).toEqual('')
    expect(formatEnum(undefined)).toEqual('')
  })

  it('formats a list of values', () => {
    expect(
      formatEnum(['RED', 'ORANGE', 'YELLOW', 'GREEN', 'BLUE', 'VIOLET'])
    ).toEqual('Red, Orange, Yellow, Green, Blue, Violet')
  })

  it('formats a single value', () => {
    expect(formatEnum('DARK_BLUE')).toEqual('Dark blue')
  })

  it('returns an empty string for values of the wrong type (for JS projects)', () => {
    // @ts-expect-error - Testing JS scenario
    expect(formatEnum(5)).toEqual('')
  })
})

describe('truncate', () => {
  it('truncates really long strings', () => {
    expect(truncate('na '.repeat(1000) + 'batman').length).toBeLessThan(1000)
    expect(truncate('na '.repeat(1000) + 'batman')).not.toMatch(/batman/)
  })

  it('does not modify short strings', () => {
    expect(truncate('Short strinG')).toEqual('Short strinG')
  })

  it('adds ... to the end of truncated strings', () => {
    expect(truncate('repeat'.repeat(1000))).toMatch(/\w\.\.\.$/)
  })

  it('accepts numbers', () => {
    expect(truncate(123)).toEqual('123')
    expect(truncate(0)).toEqual('0')
    expect(truncate(0o000)).toEqual('0')
  })

  it('handles arguments of invalid type', () => {
    // @ts-expect-error - Testing JS scenario
    expect(truncate(false)).toEqual('false')

    expect(truncate(undefined)).toEqual('')
    expect(truncate(null)).toEqual('')
  })
})

describe('jsonTruncate', () => {
  it('truncates large json structures', () => {
    expect(
      jsonTruncate({
        foo: 'foo',
        bar: 'bar',
        baz: 'baz',
        kittens: 'kittens meow',
        bazinga: 'Sheldon',
        nested: {
          foobar: 'I have no imagination',
          two: 'Second nested item',
        },
        five: 5,
        bool: false,
      })
    ).toMatch(/.+\n.+\w\.\.\.$/s)
  })
})

describe('timeTag', () => {
  it('renders a time tag with correct dateTime and title attributes', () => {
    // Define a sample date and time string
    const dateTimeString = '2024-03-30T10:00:00Z';
    //Create the output of the date here then compare and see if its render in the const object
    const localDateTimeT = new Date(dateTimeString).toLocaleString();
    const { getByTitle } = render(timeTag(dateTimeString));

    // Assert that the time tag is rendered
    const timeElement = getByTitle(localDateTimeT);
    expect(timeElement).toBeInTheDocument();

    // Assert that the time tag has the correct dateTime attribute
    expect(timeElement).toHaveAttribute('dateTime', dateTimeString);
  });


  it('can take an empty input string', async () => {
    expect(timeTag('')).toEqual('')
  })
})

describe('jsonDisplay', () => {
  it('produces the correct output', () => {
    expect(
      jsonDisplay({
        title: 'TOML Example (but in JSON)',
        database: {
          data: [['delta', 'phi'], [3.14]],
          enabled: true,
          ports: [8000, 8001, 8002],
          temp_targets: {
            case: 72.0,
            cpu: 79.5,
          },
        },
        owner: {
          dob: '1979-05-27T07:32:00-08:00',
          name: 'Tom Preston-Werner',
        },
        servers: {
          alpha: {
            ip: '10.0.0.1',
            role: 'frontend',
          },
          beta: {
            ip: '10.0.0.2',
            role: 'backend',
          },
        },
      })
    ).toMatchInlineSnapshot(`
      <pre>
        <code>
          {
        "title": "TOML Example (but in JSON)",
        "database": {
          "data": [
            [
              "delta",
              "phi"
            ],
            [
              3.14
            ]
          ],
          "enabled": true,
          "ports": [
            8000,
            8001,
            8002
          ],
          "temp_targets": {
            "case": 72,
            "cpu": 79.5
          }
        },
        "owner": {
          "dob": "1979-05-27T07:32:00-08:00",
          "name": "Tom Preston-Werner"
        },
        "servers": {
          "alpha": {
            "ip": "10.0.0.1",
            "role": "frontend"
          },
          "beta": {
            "ip": "10.0.0.2",
            "role": "backend"
          }
        }
      }
        </code>
      </pre>
    `)
  })
})

describe('checkboxInputTag', () => {
  it('can be checked', () => {
    render(checkboxInputTag(true))
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('can be unchecked', () => {
    render(checkboxInputTag(false))
    expect(screen.getByRole('checkbox')).not.toBeChecked()
  })

  it('is disabled when checked', () => {
    render(checkboxInputTag(true))
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })

  it('is disabled when unchecked', () => {
    render(checkboxInputTag(false))
    expect(screen.getByRole('checkbox')).toBeDisabled()
  })
})
