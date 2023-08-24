import PropTypes from 'prop-types';
function Button({ operation, step, increment }) {
    return <button onClick={() => {
        increment(step, operation)
    }}>{operation}{step}</button>
}

function ResetButton({ value, func }) {
    return <button onClick={() => {
        func(value)
    }}>Reset</button>
}

Button.propTypes = {
    operation: PropTypes.string,
    step: PropTypes.number,
    increment: PropTypes.any
}

ResetButton.propTypes = {
    func: PropTypes.any,
    value: PropTypes.number
}

export { Button, ResetButton };