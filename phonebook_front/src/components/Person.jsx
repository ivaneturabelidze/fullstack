const Person = ({data}) => {
    return (
        <>
            <h2>{data.name}</h2>
            <p>{data.number}</p>
            <hr />
        </>
    )
}

export default Person