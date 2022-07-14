export default function Search({ setValue, value }) {
    return (
        <div>
            <input
                type="search"
                placeholder="search"
                defaultValue={value}
                onChange={(e) => setValue(e.target.value)}
            />
        </div>
    );
}
