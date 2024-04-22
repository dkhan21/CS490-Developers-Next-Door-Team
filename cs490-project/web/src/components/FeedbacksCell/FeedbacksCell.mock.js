// Define your own mock data here:
export const standard = (/* vars, { ctx, req } */) => ({
  feedbacks: [{
    id: 1, name: 'Daniyal Khan', rating: 5,
    body: 'This is my first feedback here helloo', inLanguage: 'java', outLanguage: 'python', inText: 'System.out.println("hello");', outText: 'print("hello")',
    createdAt: '2020-01-02T12:34:56Z'
  },
  {
    id: 2, name: 'Richard', rating: 5,
    body: 'This is my first feedback here Wazgooodd', inLanguage: 'python', outLanguage: 'cpp', inText: 'print("hello")', outText: 'cout << "hello";',
    createdAt: '2020-07-02T12:34:56Z',
  },
  {
    id: 3, name: 'Matt', rating: 2,
    body: 'This is my first feedback here Morning ', inLanguage: 'cpp', outLanguage: 'c', inText: 'cout << "hello";', outText: 'printf("hello");',
    createdAt: '2020-09-02T12:34:56Z',
  },
  {
    id: 4, name: 'John', rating: 4,
    body: 'This is my first feedback here Evening', inLanguage: 'c', outLanguage: 'javascript', inText: 'printf("hello");', outText: 'console.log("hello");',
    createdAt: '2020-12-02T12:34:56Z',
  }],
})
