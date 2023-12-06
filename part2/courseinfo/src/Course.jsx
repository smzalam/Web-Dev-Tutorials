const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
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
                <Part key={part.name} part={part.name} exercises={part.exercises} />
            ))}
        </div>
    )
}

const Total = ({ parts }) => {
    const total_exercises = parts.reduce((sum, part) => sum + part.exercises, 0)

    return (
        <p><b>total of {total_exercises} exercises</b></p>
    )
}

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course