import React, { useRef, useState } from "react"

// A Typescript boilerplate component

interface Person {
    firstName: string
    lastName: string
}

// ? = field is optional
interface Props {
    name: string
    age: number
    cool?: boolean
    fn: () => number
    obj: {
        prop1: string
    }
    pers: Person
    children: () => JSX.Element | null
}

const ComponentBoilerplate: React.FC<Props> = ({
    name,
    age,
    cool,
    fn,
    obj,
    pers,
    children,
}) => {
    const [count, setCount] = useState<number | null>(0)
    const inputRef = useRef()

    const handleSubmit: any = (param1: number) => {
        alert(`hello: ${param1}`)
    }

    return (
        <div>
            <p>Ts Test</p>
            <input ref={inputRef} />
            <button onClick={handleSubmit(count)}></button>
            {children}
        </div>
    )
}
export default ComponentBoilerplate
