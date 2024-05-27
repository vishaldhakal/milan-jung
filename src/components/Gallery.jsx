import React from 'react'

const Gallery = () => {

    const dummyData = [{
        title: 'Hello World',
        image: '/blog1.jpg',
        description: 'lorem ipsum ascws sder ger g erg erg ipsum ascws sder ger g erg ergipsum ascws sder ger g erg ergipsum ascws sder ger g erg erg'
    },
    {
        title: 'Hello World',
        image: '/blog2.jpg',
        description: 'lorem ipsum ascws sder ger g erg erg ipsum ascws sder ger g erg ergipsum ascws sder ger g erg ergipsum ascws sder ger g erg erg'
    }
        , {
        title: 'Hello World',
        image: '/logo512.png',
        description: 'lorem ipsum ascws sder ger g erg erg ipsum ascws sder ger g erg ergipsum ascws sder ger g erg ergipsum ascws sder ger g erg erg'
    },
    {
        title: 'Hello World',
        image: '/blog1.jpg',
        description: 'lorem ipsum ascws sder ger g erg erg ipsum ascws sder ger g erg ergipsum ascws sder ger g erg ergipsum ascws sder ger g erg erg'
    }
        , {
        title: 'Hello World',
        image: '/blog1.jpg',
        description: 'lorem ipsum ascws sder ger g erg erg ipsum ascws sder ger g erg ergipsum ascws sder ger g erg ergipsum ascws sder ger g erg erg'
    }];

    return (
        <section class="py-10 bg-white sm:py-16 lg:py-24">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="max-w-2xl mx-auto text-center">
                    <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        My Gallery
                    </h2>
                </div>

                <div className="mt-12">

                    <div className=" gap-12 h-96">
                        <div className="grid grid-cols-3 gap-12 ">
                            {dummyData.slice(0, 3).map((item, index) => {
                                return (
                                    <div className="flex flex-col  rounded-xl">
                                        <div className="overflow-hidden h-80">
                                            <img src={item.image} alt="image1" className='rounded-xl object-cover hover:scale-110 transition-all duration-500 cursor-pointer' />
                                        </div>

                                        <div className="py-2 mt-2">
                                            <p className='text-lg font-black '>{item.title}</p>
                                            <p className='text-xs font-medium mt-2'>{item.description.slice(0, 80)} </p>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>

                        {/* 
                        <div className="flex flex-col shadow-md hover:shadow-xl rounded-xl">
                            <div className="overflow-hidden  h-full">
                                <img src="/blog1.jpg" alt="image1" className='rounded-xl object-cover hover:scale-110 transition-all duration-500 cursor-pointer' />
                            </div>

                            <div className="p-2">
                                <p className='text-lg font-black '>Dummy Data</p>
                                <p className='text-xs font-medium mt-2'>Dummy Data Dummy Data Dummy Data Dummy Data Dummy Data </p>
                            </div>
                        </div>

                        <div className="flex flex-col shadow-md hover:shadow-xl rounded-xl">
                            <div className="overflow-hidden  h-full">
                                <img src="/blog1.jpg" alt="image1" className='rounded-xl object-cover hover:scale-110 transition-all duration-500 cursor-pointer' />
                            </div>

                            <div className="p-2">
                                <p className='text-lg font-black '>Dummy Data</p>
                                <p className='text-xs font-medium mt-2'>Dummy Data Dummy Data Dummy Data Dummy Data Dummy Data </p>
                            </div>
                        </div>

                        <div className="flex flex-col shadow-md hover:shadow-xl rounded-xl">
                            <div className="overflow-hidden  h-full">
                                <img src="/blog1.jpg" alt="image1" className='rounded-xl object-cover hover:scale-110 transition-all duration-500 cursor-pointer' />
                            </div>

                            <div className="p-2">
                                <p className='text-lg font-black '>Dummy Data</p>
                                <p className='text-xs font-medium mt-2'>Dummy Data Dummy Data Dummy Data Dummy Data Dummy Data </p>
                            </div>
                        </div> */}

                    </div>
                </div>
                <div className="flex justify-center items-center mt-24">
                    <a href="#">
                        <button className="button flex justify-center items-center text-center text-white w-28 bg-[#005A6D] rounded-md p-2 hover:shadow-2xl hover:bg-[#3b8391]">View all</button>
                    </a>
                </div>
            </div>

        </section>
    )
}

export default Gallery