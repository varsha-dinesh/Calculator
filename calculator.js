const calculate = (n1, operator, n2) => {
    let result = ''
    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}


const keys = document.querySelector(".calculator")
let display = document.querySelector(".input")
const calculator = document.querySelector(".main")


keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        const key = e.target
        const keyContent = key.textContent
        const displayNum = display.textContent
        const action = key.dataset.action
        const previousKeyType = calculator.dataset.previousKeyType
        console.log(previousKeyType)

        Array.from(key.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (!action) {
            if (displayNum === "0" ||
                previousKeyType === "operator" ||
                previousKeyType === "calculate") {
                display.textContent = keyContent
            } else {
                display.textContent = displayNum + keyContent

            }
            calculator.dataset.previousKeyType = "number"
            console.log(calculator)


        }


        if (
            action === "add" ||
            action === "subtract" ||
            action === "multiply" ||
            action === "divide" ||
            action === "percentage"
        ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayNum

            if (
                firstValue &&
                operator &&
                previousKeyType !== "operator" &&
                previousKeyType !== "calculate"
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue

            } else {
                calculator.dataset.firstValue = displayNum
            }

            key.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action


        }

        if (action === "decimal") {
            if (!displayNum.includes(".")) {
                display.textContent = displayNum + "."
            } else if (
                previousKeyType === "operator" ||
                previousKeyType === "calculate") {
                display.textContent = "0."
            }
            calculator.dataset.previousKeyType = "decimal"
        }



        if (action === "clear") {
            calculator.dataset.firstValue = ''
            calculator.dataset.modValue = ''
            calculator.dataset.operator = ''
            calculator.dataset.previousKeyType = ''
            calculator.dataset.previousKeyType = "clear"
            display.textContent = "0"
        }

        if (action === "delete") {
            console.log("delete key")

        }

        if (action === "calculate") {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayNum

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayNum
                    secondValue = calculator.dataset.modValue
                }

                display.textContent = calculate(firstValue, operator, secondValue)
            }

            calculator.dataset.modValue = secondValue
            calculator.dataset.previousKeyType = 'calculate'

        }


    }

})