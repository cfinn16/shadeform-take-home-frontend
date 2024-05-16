export default function Instance({instance, handleDelete}) {
    // const [isExpanded, setIsExpanded] = useState(false)
    return (
        <div className="flex flex-row justify-between my-4">
            <p>{instance.name}</p>
            <p>{instance.cloud}</p>
            <p>{instance.region}</p>
            <button className="bg-red-700" onClick={() => handleDelete(instance.id)}>Delete</button>
        </div>
    )
}