import { useState } from 'react'


const FeedbackButton = ({ text, handler }) => {
  return (
    <button
      onClick={handler}
    >
      {text}
    </button>
  )
}

const FeedbackSection = ({ goodHandler, neutralHandler, badHandler }) => {

  return (
    <div>
      <h1>give feedback</h1>
      <FeedbackButton text={'good'} handler={goodHandler}></FeedbackButton>
      <FeedbackButton text={'neutral'} handler={neutralHandler}></FeedbackButton>
      <FeedbackButton text={'bad'} handler={badHandler}></FeedbackButton>
    </div>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const StatisticsSection = ({ good, neutral, bad }) => {
  const all = (good + neutral + bad > 0) ? true : false
  return (
    <>
      {all ? (
        <div>
          <h1>statistics</h1>
          <table>
            <tbody>
              <StatisticLine text={'good'} value={good} />
              <StatisticLine text={'neutral'} value={neutral} />
              <StatisticLine text={'bad'} value={bad} />
              <StatisticLine text={'all'} value={good + bad + neutral} />
              <StatisticLine text={'average'} value={(good - bad) / (good + bad + neutral)} />
              <StatisticLine text={'positive'} value={good / (good + bad + neutral)} />
            </tbody>
          </table>

        </div>
      ) : (
        <div>
          <h1>statistics</h1>
          No feedback given
        </div>
      )}
    </>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedbackSection
        goodHandler={() => setGood(good + 1)}
        neutralHandler={() => setNeutral(neutral + 1)}
        badHandler={() => setBad(bad + 1)}
      />
      <StatisticsSection
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

export default App