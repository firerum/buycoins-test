export default function Data({ data, loading, error, arr, dat, value }) {
    if (loading) return <p>loading...</p>;
    if (error) return <p>error...</p>;

    return (
        <div className="data">
            <h1>{dat}</h1>
            {arr.map((d, idx) =>
                d.mission_name.toLowerCase().includes(value.toLowerCase()) ? (
                    <div className="data-wrapper" key={idx}>
                        <ul>
                            <li>id</li>
                            <li>mission_name</li>
                            <li>date</li>
                            <li>upcoming</li>
                        </ul>
                        <ul>
                            <li>{d.id}</li>
                            <li>{d.mission_name}</li>
                            <li>{d.launch_date_utc}</li>
                            <li>{d.upcoming.toString()}</li>
                        </ul>
                    </div>
                ) : null
            )}
        </div>
    );
}
