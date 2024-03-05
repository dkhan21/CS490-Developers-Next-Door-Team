// Pass props to your component by passing an `args` object to your story
//
// ```jsx
// export const Primary = {
//  args: {
//    propName: propValue
//  }
// }
// ```
//
// See https://storybook.js.org/docs/react/writing-stories/args.

import Feedback from './Feedback'

export const generated = () => {
  return (
    <Feedback
      feedback={{
        name: "Daniyal Khan",
        rating: 5,
        body: 'This is the first feedback! I am so happy to be here and develop this site ajksdf ajkldf hakjl sdhfkla sdv kasdkjhadkjf hask asd asdkjf asdkfj asdfh  jdnajsd hfkajsdh fkas dfjkhaiu hwaed fnasd kjfaslkd jfhajksd fhkajsd hfjks djkflha wjega jskdn aksdjfhad sjfh ajsdkf aklsdjfaskdl ajsdkf aklsdjfaskdl asdh ash askldjfgakd asdkfjlasgd aksdjfa adj  askldjfgakd asdkfjlasgd  aksdjfa adj',
        createdAt: '2020-01-01T12:34:56Z'
      }
      }
    />
  )
}


export default {
  title: 'Components/Feedback',
  component: Feedback
}

