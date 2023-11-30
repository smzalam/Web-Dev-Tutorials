const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}
const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.num} part={part.part} exercises={part.exercises} />
      ))}
    </div>
  )
}

const Total = ({ parts }) => {
  let sum = 0
  parts.map((part) => {
    sum = sum + part.exercises
  })
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      num: 1,
      part: 'Fundamentals of React',
      exercises: 10
    },
    {
      num: 2,
      part: 'Using props to pass data',
      exercises: 7
    },
    {
      num: 3,
      part: 'State of a component',
      exercises: 14
    },
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App