import React, { useState } from 'react'
import Gallery from './Gallery'

const GalleryView = ({ viewAll }) => {
    return (
        <div className='mb-24 '>
            <Gallery viewAll={viewAll} />
            {!viewAll && <div className="flex justify-center items-center ">
                <a href="/gallery">
                    <button
                        type="button"
                        className=" flex justify-center items-center text-center  border-2 transition duration-500 ease-in-out bg-midgreen p-3 hover:bg-normaldark text-white rounded"
                    >
                        VIEW ALL
                    </button>
                </a>
            </div>}
        </div>
    )
}

export default GalleryView