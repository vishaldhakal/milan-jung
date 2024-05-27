import React, { useEffect, useState } from 'react'

const Gallery = ({ viewAll }) => {
    const [isLoading, setIsLoading] = useState(true)

    const dummyData = [{
        title: 'Hello World',
        image: '/blog1.jpg',
        description: 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his.'
    },
    {
        title: 'Hello World',
        image: '/blog2.jpg',
        description: 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his.'
    }
        , {
        title: 'Hello World',
        image: '/logo512.png',
        description: 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his.'
    },
    {
        title: 'Hello World',
        image: '/blog1.jpg',
        description: 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his.'
    }
        , {
        title: 'Hello World',
        image: '/blog2.jpg',
        description: 'Whole wound wrote at whose to style in. Figure ye innate former do so we. Shutters but sir yourself provided you required his.'
    }];

    useEffect(() => {
        setIsLoading(false);    // Set isLoading to false once the component mounts
    }, []);

    // if (isLoading) {
    //     return <h1>Loading.....</h1>;
    // }

    return (
        <section class="py-10 bg-white sm:py-16 lg:pt-24">
            <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div class="max-w-2xl mx-auto text-center">
                    <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                        My Gallery
                    </h2>
                </div>

                <div className="mt-12">

                    <div className="gap-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
                            {!viewAll ?
                                (dummyData.slice(0, 3).map((item, index) => {
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
                                })
                                ) :
                                (dummyData.map((item, index) => {
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
                                }))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Gallery