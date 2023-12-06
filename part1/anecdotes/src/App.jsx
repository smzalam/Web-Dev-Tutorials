import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Button = ({ text, handler }) => {
  return (
    <button
      onClick={handler}
    >
      {text}
    </button>
  )
}

const Buttons = ({ anecdotes, votes, selected, setSelected, setVotes }) => {
  return (
    <div>
      <Button
        text={'vote'}
        handler={
          () => {
            const copy = [...votes]
            copy[selected] += 1
            setVotes(copy)
          }
        }
      />
      <Button
        text={'next anecdote'}
        handler={
          () => {
            setSelected(getRandomInt(anecdotes.length))
          }
        }
      />

    </div>
  )
}


const DailyAnecdote = ({ anecdotes, selected, setSelected, votes, setVotes }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {votes[selected]} votes</div>
      <Buttons 
        anecdotes={anecdotes}
        votes={votes} 
        selected={selected}
        setSelected={setSelected} 
        setVotes={setVotes} 
      />
    </div>
  )
}

const MostVotedAnecdote = ({ anecdotes, votes }) => {
  let indexOfMaxValue = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <div>{anecdotes[indexOfMaxValue]}</div>
      <div>has {votes[indexOfMaxValue]} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const anecdote_votes = new Uint8Array(anecdotes.length)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...anecdote_votes])

  return (
    <div>
      <DailyAnecdote 
        anecdotes={anecdotes} 
        selected={selected} 
        setSelected={setSelected} 
        votes={votes} 
        setVotes={setVotes} 
      />
      <MostVotedAnecdote 
        anecdotes={anecdotes}
        votes={votes}
      />
    </div>
  )
}

export default App