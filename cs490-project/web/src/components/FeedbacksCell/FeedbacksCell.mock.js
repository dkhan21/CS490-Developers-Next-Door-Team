// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  feedbacks: [{
    id: 1, name: 'Daniyal Khan', rating: 5,
    body: 'This is my first feeback here helloo',
    createdAt: '2020-01-02T12:34:56Z',
  },
  {
    id: 2, name: 'Richard', rating: 5,
    body: 'This is my first feeback here Wazgooodd',
    createdAt: '2020-07-02T12:34:56Z',
  },
  {
    id: 3, name: 'Matt', rating: 2,
    body: 'This is my first feeback here Morning ',
    createdAt: '2020-09-02T12:34:56Z',
  }],
})
