import Data from "./components/Data";
import Search from "./components/Search";
import Filter from "./components/Filter";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

function App() {
    const [value, setValue] = useState("");
    const [filter, setFilter] = useState();
    const filters = ["upcoming", "mission_name", "id", "status"];

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

            {data &&
                data.launches.map((d, idx) =>
                    d.mission_name.toLowerCase().includes(value.toLowerCase()) ? (
                        <Data
                            data={d}
                            error={error}
                            loading={loading}
                            key={idx}
                            fresh={fresh}
                            filter={filter}
                        />
                    ) : null
                )}
        </div>
    );
}

export default App;
