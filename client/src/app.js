import { useEffect, useState } from "react";

export default function App() {
    const [slovos, setSlovos] = useState([]);
    useEffect(() => {}, []);

    const grabInput = ({ target: { value } }) => {
        if (value.length > 0) {
            fetch(`/get-meaning/${value}`)
                .then((res) => res.json())
                .then((results) => setSlovos(results));
        }
    };

    return (
        <div>
            <h1>Hello</h1>
            <input type="text" onChange={(e) => grabInput(e)} />
            {slovos &&
                slovos.map((each, idx) => (
                    <div key={idx}>
                        <div>{each.slovo}</div>
                    </div>
                ))}
        </div>
    );
}
