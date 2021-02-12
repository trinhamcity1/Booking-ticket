import React from 'react'

const SearchResult = (props) => {
    return (
        <div>
            <ul>
            {
                props.results.map((r) => 
                    <li>{r}</li>
                )
            }
            </ul>
        </div>
    )
}

export default SearchResult
