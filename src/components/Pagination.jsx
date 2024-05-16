export default function Pagination({page, setPage}) {
    const handleNextClick = () => {
        setPage((prevPage) => prevPage + 1)
    }  
    const handlePrevClick = () => {
        setPage((prevPage) => prevPage - 1)
    }

    return (
        <div className="flex flex-row w-full justify-between">   
            <button
                className="bg-sky-500 rounded px-8 py-2 disabled:opacity-50" 
                disabled={page === 0}
                onClick={handlePrevClick}
            > 
                Prev
            </button>
            <p>Page {page + 1}</p>
            <button
                className="bg-sky-500 rounded px-8 py-2 disabled:opacity-50" 
                // disable={page === }
                onClick={handleNextClick}
            >
                Next
            </button>
        </div>
    )
}