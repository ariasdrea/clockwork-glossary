import { useEffect, useState } from "react";

export default function Autocomplete() {
    const [slovos, setSlovos] = useState([]);
    const [meaning, setMeaning] = useState("");

    useEffect(() => {
        document.addEventListener("keydown", (e) => {
            handleKeys(e);
        });
    }, []);

    const handleKeys = ({ key }) => {
        const results = document.querySelectorAll("div#slovos>p");
        const highlightedElem = document.querySelector(".highlight");

        if (key === "ArrowDown") {
            if (!highlightedElem) {
                results[0].classList.add("highlight");
            }

            if (results[results.length - 1].classList.contains("highlight")) {
                return;
            }

            if (highlightedElem) {
                highlightedElem.classList.remove("highlight");
                highlightedElem.nextSibling.classList.add("highlight");
            }
        }

        if (key === "ArrowUp") {
            if (!highlightedElem) {
                results[results.length - 1].classList.add("highlight");
            }

            if (results[0].classList.contains("highlight")) {
                return;
            }

            if (highlightedElem) {
                highlightedElem.classList.remove("highlight");
                highlightedElem.previousSibling.classList.add("highlight");
            }
        }

        if (key === "Enter") {
            document.querySelector("input").value = highlightedElem.innerHTML;
            setSlovos([]);
            grabMeaning(highlightedElem.innerHTML);
        }
    };

    const grabData = ({ target: { value } }) => {
        if (value.length) {
            fetch(`/get-inital-data/${value}`)
                .then((res) => res.json())
                .then((results) => {
                    const filteredResults = [];
                    results.forEach((each, idx) => {
                        if (idx < 5) {
                            filteredResults.push(each);
                        }
                    });

                    setMeaning("");
                    setSlovos(filteredResults);
                });
        }

        if (!value) {
            setMeaning("");
            setSlovos([]);
        }
    };

    const grabMeaning = (slovo) => {
        fetch(`/get-meaning/${slovo}`)
            .then((res) => res.json())
            .then((result) => {
                setMeaning(result);
            });
    };

    return (
        <div>
            <input type="text" onChange={(e) => grabData(e)} />
            <div id="results">
                <div id="slovos">
                    {slovos &&
                        slovos.map((each, idx) => (
                            <p key={idx}>{each.slovo}</p>
                        ))}
                </div>
                <h3>{meaning && meaning}</h3>
            </div>
        </div>
    );
}
