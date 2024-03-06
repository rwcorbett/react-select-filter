import React, { useMemo, useEffect, useState } from "react";
import data from "./data";

const parseData = () => {
    let parsedData: any = [];
    // needed to look this function up on StackOverflow - reduce the incoming data into groups by "cuisine"
    parsedData = data.reduce(function (newArr: any, value) {
        // group by the type of "cuisine" (see data.js)
        let group = (value['cuisine']);
        (newArr[group] ? newArr[group] : (newArr[group] = null || [])).push(value);
        return newArr;
    }, {});
    return parsedData;
}

const App = () => {
    // the data object to display in view, is updated with the filtered data
    const [theData, setTheData] = useState(parseData());
    const [matchFound, setMatchFound] = useState(false);
    const [queryString, setQueryString] = useState("");

    /**
     * Search bar, text input, feedback to user on search query and no results state
     * TODO: input scrubbing (i.e. no numbers or special chars)
     */
    const SearchBox = () => {

        // filter the data using recursive loops, could probably use more advance technique like the initial data parse above, but this is functional and readable
        const filterTheData = (value: string) => {
            let filteredData: any = [];
            if (value.length > 2) {
                for (const cat in theData) {
                    for (const i in theData[cat]) {
                        const cuisine: string = theData[cat][i].cuisine.toLowerCase();
                        const name: string = theData[cat][i].name.toLowerCase();
                        if (cuisine.includes(queryString.toLowerCase())) { // as opposed to cuisine.indexOf(queryString) > 0
                            if (filteredData[cat]) {
                                filteredData[cat].push(theData[cat][i]);
                            } else {
                                filteredData[cat] = [];
                                filteredData[cat].push(theData[cat][i]);
                            }
                            setMatchFound(true);
                        }
                        if (name.includes(queryString.toLowerCase())) { // as opposed to name.indexOf(queryString) > 0
                            if (filteredData[cat]) {
                                filteredData[cat].push(theData[cat][i]);
                            } else {
                                filteredData[cat] = [];
                                filteredData[cat].push(theData[cat][i]);
                            }
                            setMatchFound(true);
                        }
                    }
                }
            }
            if (matchFound) {
                console.debug(filteredData);
                const newData = filteredData;
                setTheData(newData);
            } else {
                setTheData(parseData());
            }
        }
        // capture the input value
        const handleChange = (event: any) => {
            const queryValue = event.target.value;
            setTimeout(() => {
                setQueryString(queryValue); // setting this for use elsewhere in the UI
                filterTheData(queryValue); // send to fn to filter data
            }, 100);
        }

        return (
            <>
                <form>
                    <label htmlFor="query">Input query</label>
                    <input key="query" name="query" id="query" type="text" onChange={handleChange} value={queryString} autoFocus="autoFocus" placeholder="i.e. chicken" />
                </form>
                <p className="search-query-string">Searching for: <i>{queryString}</i>
                    {!matchFound ? (
                        <span className="search-no-result">No results</span>
                    ) : (
                        <></>
                    )}
                </p>
            </>
        )
    };

    const Categories = () => {
        const dataKeys: string[] = Object.keys(theData);

        // handle item clicks
        const handleClick = (event) => {
            const elem = event.target;
            alert("you selected "+`"${elem.getAttribute('data-item-name')}" (id:${elem.getAttribute('data-item-id')})`)
            console.info("Clicked:",elem);
        }

        return (
            <>
                {dataKeys.map((key: string, index: number) => {
                    const items = theData[key];
                    return (
                        <div key={index} className={"cat" + index + " category"}>
                            <p className="category-title">{key}</p>
                            <ul>
                                {items.map((item: any, index: number) => (
                                    <li key={index} data-item-id={item.id} data-item-name={item.name} onClick={(event) => handleClick(event)}>{item.name}</li>
                                ))}
                            </ul>
                        </div>
                    )
                }
                )}
            </>
        );
    }

    return (
        <>
            <header><h1>Search Filter</h1></header>
            <main>
                <section className="search-box">
                    <SearchBox />
                </section>
                <section className="categories">
                    <Categories />
                </section>
            </main>
        </>
    );
}

export default App;