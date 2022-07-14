import Data from "./components/Data";
import Search from "./components/Search";
import Filter from "./components/Filter";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

function App() {
    const [value, setValue] = useState("");
    const [filterValue, setFilterValue] = useState();
    const filters = ["upcoming", "mission_name", "id", "RESET"];

    const getData = gql`
        query {
            launches(limit: 100) {
                id
                mission_name
                launch_year
                launch_date_utc
                launch_date_local
                upcoming
            }
        }
    `;

    const { loading, error, data } = useQuery(getData);
    const [filtered, setFiltered] = useState();

    const m = data && data.launches;

    // group the incoming data according to date
    const groups =
        m &&
        m.reduce((groups, game) => {
            const date = game.launch_date_utc.split("-")[0];
            if (!groups[date]) {
                groups[date] = [];
            }
            groups[date].push(game);
            return groups;
        }, {});

    // put the grouped data in an array
    const groupArrays =
        groups &&
        Object.keys(groups).map((date) => {
            return {
                date,
                data: groups[date],
            };
        });

    return (
        <div className="app">
            <Search value={value} setValue={setValue} />
            <div className="filters">
                {filters.map((f, idx) => (
                    <Filter
                        filterValue={f}
                        key={idx}
                        data={data}
                        setFiltered={setFiltered}
                        setFilterValue={setFilterValue}
                    />
                ))}
            </div>

            {filtered && filtered[0] !== undefined ? (
                <div className="data">
                    <h1>Date</h1>
                    <div className="data-wrapper">
                        <ul>
                            <li>{filterValue}s</li>
                        </ul>
                        <ul>
                            {filtered.map((d, idx) => (
                                <li key={idx}>{d}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                groupArrays &&
                groupArrays.map((l) => (
                    <Data dat={l.date} arr={l.data} error={error} loading={loading} value={value} />
                ))
            )}
        </div>
    );
}

export default App;
