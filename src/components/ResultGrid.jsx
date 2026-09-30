import { useDispatch, useSelector } from 'react-redux'
import { fetchPhotos, fetchVideos, fetchGIF } from '../api/mediaApi'
import { setLoading, setError, setResults } from '../redux/features/searchSlice'
import { useEffect } from 'react'
import ResultCard from './ResultCard'

const ResultGrid = () => {

    const dispatch = useDispatch()

    const { query, activeTab, results, loading, error } =
        useSelector((store) => store.search)

    useEffect(function () {

        if (!query) return

        const getData = async () => {

            try {

                dispatch(setLoading())

                let data = []

                // PHOTOS
                if (activeTab === 'photos') {

                    let response = await fetchPhotos(query)

                    data = response.results.map((item) => ({
                        id: item.id,
                        type: 'photo',
                        title: item.alt_description,
                        thumbnail: item.urls.small,
                        src: item.urls.full,
                        url: item.links.html
                    }))
                }

                // VIDEOS - PIXABAY
                if (activeTab === 'videos') {

                    let response = await fetchVideos(query)

                    data = response.hits.map((item) => ({
                        id: item.id,
                        type: 'video',
                        title: item.tags || 'Video',
                        thumbnail: item.videos.medium.thumbnail,
                        src: item.videos.medium.url,
                        url: item.pageURL
                    }))
                }

                // GIF
                if (activeTab === 'gif') {

                    let response = await fetchGIF(query)

                    data = response.data.map((item) => ({
                        id: item.id,
                        title: item.title || 'GIF',
                        type: 'gif',
                        thumbnail: item.images.fixed_width_small.url,
                        src: item.images.original.url,
                        url: item.url
                    }))
                }

                dispatch(setResults(data))

            } catch (err) {

                dispatch(setError(err.message))

            }

        }

        getData()

    }, [query, activeTab, dispatch])


    if (error) return <h1>Error: {error}</h1>

    if (loading) return <h1>Loading...</h1>


    return (
        <div className='flex justify-between w-full flex-wrap gap-6 overflow-auto px-10'>

            {results.map((item) => {

                return (
                    <div key={item.id}>
                        <ResultCard item={item} />
                    </div>
                )

            })}


        </div>
    )
}

export default ResultGrid