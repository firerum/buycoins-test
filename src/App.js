import Data from "./components/Data";
import Search from "./components/Search";
import Filter from "./components/Filter";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

function App() {
    const [value, setValue] = useState("");
    const [filter, setFilter] = useState();
    const filters = ["upcoming", "mission_name", "id", "RESET"];

    const getData = gql`
        query {
            launches(limit: 10) {
                id
                mission_name
                launch_date_local
                upcoming
            }
        }
    `;

    const { loading, error, data } = useQuery(getData);
    const [fresh, setFresh] = useState();

    return (
        <div className="app">
            <Search value={value} setValue={setValue} />
            <div className="filters">
                {filters.map((d, idx) => (
                    <Filter
                        filter={d}
                        key={idx}
                        data={data}
                        setFresh={setFresh}
                        setFilter={setFilter}
                    />
                ))}
            </div>

            {fresh && fresh[0] !== undefined ? (
                <div className="data">
                    <h1>Date</h1>
                    <div className="data-wrapper">
                        <ul>
                            <li>{filter}s</li>
                        </ul>
                        <ul>
                            {fresh.map((d, idx) => (
                                <li key={idx}>{d}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : (
                data &&
                data.launches.map((d, idx) =>
                    d.mission_name.toLowerCase().includes(value.toLowerCase()) ? (
                        <Data data={d} error={error} loading={loading} key={idx} />
                    ) : null
                )
            )}
        </div>
    );
}

export default App;
