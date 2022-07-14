export default function Data({ data, loading, error }) {
    if (loading) return <p>loading...</p>;
    if (error) return <p>error...</p>;

    return (
        <div className="data">
            <h1>Date</h1>
            <div className="data-wrapper">
                <ul>
                    <li>id</li>
                    <li>mission_name</li>
                    <li>date</li>
                    <li>upcoming</li>
                </ul>
                <ul>
                    <li>{data.id}</li>
                    <li>{data.mission_name}</li>
                    <li>{data.launch_date_local}</li>
                    <li>{data.upcoming.toString()}</li>
                </ul>
            </div>
        </div>
    );
}