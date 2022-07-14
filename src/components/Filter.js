export default function Filter({ data, setFresh, filter, setFilter }) {
    const m = data && data.launches;

    const handleFilter = (filter) => {
        const result = m.map((d) => d[filter]?.toString());
        setFresh(result);
        setFilter(filter);
    };

    return (
        <div>
            <button onClick={() => handleFilter(filter)}>Filter by {filter}</button>
        </div>
    );
}
