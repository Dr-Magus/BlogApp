import React from 'react'
import loading from '../Images/loading.gif'

function Loading() {
    return (
        <>
            <div className="load main d-flex align-items-center justify-content-center">
                <div className="gif overflow-hidden">
                    <img src={loading} alt="" className="w-100" />
                </div>
                <div className="loading">
                    Loading...
                </div>
            </div>
        </>
    )
}

export default Loading
