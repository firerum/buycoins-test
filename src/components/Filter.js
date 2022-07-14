export default function Filter({ data, setFiltered, filterValue, setFilterValue }) {
    const m = data && data.launches;

    const handleFilter = (filterValue) => {
        const result = m.map((d) => d[filterValue]?.toString());
        setFiltered(result);
        setFilterValue(filterValue);
    };

    return (
        <div>
            <button onClick={() => handleFilter(filterValue)}>Filter by {filterValue}</button>
        </div>
    );
}
