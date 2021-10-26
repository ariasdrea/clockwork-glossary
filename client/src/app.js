import { useEffect } from "react";

export default function App() {
    useEffect(() => {
        console.log("component mounted");
    }, []);
    return (
        <div>
            <h1>Hello</h1>
        </div>
    );
}
