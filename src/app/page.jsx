'use client'
import Instance from "@/components/Instance";
import Pagination from "@/components/Pagination";
import { useEffect, useState } from "react";

export default function Home() {
  const PER_PAGE = 10
  const [instances, setInstances] = useState([])
  const [page, setPage] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:3000/instances?limit=${PER_PAGE}&offset=${page}`)
      .then(res => res.json())
      .then(data => setInstances(data))
  }, [page])

  const handleDelete = async(id) => {
    const res = await fetch(`http://localhost:3000/instances/${id}/`, {
      method: 'DELETE'
    })
    setPage(0)
  }

 

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Instances</h2>
      <div className="flex flex-col justify-between w-full">
      {instances.map((instance) => {
        return (
          <Instance key={instance.id} instance={instance} handleDelete={handleDelete}/>
        )
      })}
      </div>
      <Pagination 
        page={page} 
        setPage={setPage}
        />
    </main>
  );
}
