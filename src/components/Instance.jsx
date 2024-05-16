export default function Instance({instance, handleDelete}) {
    return (
        <div className="flex flex-row basis-5/12 justify-between my-4 rounded">
            <div className="flex flex-row justify-between drop-shadow-md bg-zinc-500 w-full p-2">
            <div className="flex flex-col">
                <p>Name: {instance.name}</p>
                <p>Cloud: {instance.cloud}</p>
            </div>
            <div className="flex flex-col">
                <p>Region: {instance.region}</p>
                <p>Shade Instance Type: {instance.shade_instance_type}</p>
            </div>
            <div className="flex flex-col">
                <p>Shade Cloud: {instance.shade_cloud ? 'Yes' : 
                'No'}</p>
                <button className="bg-red-700 rounded px-4 py-1" onClick={() => handleDelete(instance.id)}>Delete</button>
            </div>
            </div>
            
        </div>
    )
}