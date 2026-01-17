import { useState, useEffect, useMemo, useRef } from 'react'
import Toolbar from '../components/Toolbar'
import './Page.css'

function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const noteDate = new Date(Date.now() - 5 * 86400000)
  const formattedDate = noteDate.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
  const formattedTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

  // Keep photo list stable across renders
  const photos = useMemo(
    () => [
      { src: '/images/IMG_0001.png', description: "se30 except eugene was sick and kevin's batman" },
      { src: '/images/IMG_0002.png', description: 'antelope canyon, arizona' },
      { src: '/images/IMG_0003.png', description: 'senior prom' },
      { src: '/images/IMG_0004.png', description: 'yantai, shandong' },
      { src: '/images/IMG_0032.png', description: 'beach' },
      { src: '/images/IMG_0569.png', description: 'first time in toronto' },
      { src: '/images/IMG_0579.png', description: 'eaton centre' },
      { src: '/images/IMG_0587.png', description: 'downtown toronto' },
      { src: '/images/IMG_0622.png', description: 'philadelphia' },
      { src: '/images/IMG_0960.png', description: 'waterloo in a nutshell' },
      { src: '/images/IMG_1003.png', description: 'first snowfall ive seen in waterloo' },
      { src: '/images/IMG_1036.png', description: 'view from black friday air bnb' },
      { src: '/images/IMG_1049.png', description: 'turns out cactus club does not serve cactus' },
      { src: '/images/IMG_1278.png', description: 'new york window display' },
      { src: '/images/IMG_1706.png', description: 'horseshoe bend, arizona' },
      { src: '/images/IMG_2367.png', description: 'vegas - my favorite city of all time' },
      { src: '/images/IMG_3074.png', description: 'cool canyon but i forgot where' },
      { src: '/images/IMG_3129.png', description: 'yellowstone national park' },
      { src: '/images/IMG_3131.png', description: 'yellowstone sunset' },
      { src: '/images/IMG_4926.png', description: 'high school graduation, class of 2025' },
      { src: '/images/IMG_4933.png', description: 'maine' },
      { src: '/images/IMG_5444_jpg.png', description: 'japan' },
      { src: '/images/IMG_5855.png', description: 'times square' },
      { src: '/images/IMG_5942.png', description: 'rockefeller center' },
      { src: '/images/IMG_6093.png', description: 'cool japanese garden' },
      { src: '/images/IMG_6105.png', description: 'texas' },
      { src: '/images/IMG_6209.png', description: 'friends in my dorm' },
      { src: '/images/IMG_6735.png', description: 'home sweet home' },
      { src: '/images/IMG_6738.png', description: 'cool sunset in my neighborhood' },
      { src: '/images/IMG_7025.png', description: 'RV trip!' },
      { src: '/images/IMG_9482.png', description: 'japan' },
      { src: '/images/IMG_9590.png', description: 'yantai, shandong' },
      { src: '/images/IMG_9709.png', description: 'plane view' },
      { src: '/images/IMG_9723.png', description: 'cool japan photo' },
      { src: '/images/IMG_9736.png', description: 'another cool japan photo' },
      { src: '/images/IMG_9771.png', description: 'gyubeeeee' },
    ],
    []
  )

  // Persist preloaded Image objects to prevent garbage collection
  const preloadedImagesRef = useRef([])

  // Preload remaining images in batches using requestIdleCallback
  useEffect(() => {
    // Skip first 6 images as they're eager-loaded
    const imagesToPreload = photos.slice(6)
    if (imagesToPreload.length === 0) return

    let cancelled = false
    const preloadedImages = []

    const schedulePreload = (callback) => {
      if (typeof window !== 'undefined' && window.requestIdleCallback) {
        return window.requestIdleCallback(callback, { timeout: 2000 })
      }
      return setTimeout(callback, 100)
    }

    const cancelSchedule = (id) => {
      if (typeof window !== 'undefined' && window.cancelIdleCallback) {
        window.cancelIdleCallback(id)
      } else if (id) {
        clearTimeout(id)
      }
    }

    const preloadBatch = (startIndex, batchSize = 4) => {
      if (cancelled) return

      const batch = imagesToPreload.slice(startIndex, startIndex + batchSize)
      if (batch.length === 0) return

      batch.forEach((photo) => {
        const img = new Image()
        img.src = photo.src
        img.decoding = 'async'
        preloadedImages.push(img)
      })

      preloadedImagesRef.current = preloadedImages

      if (startIndex + batchSize < imagesToPreload.length) {
        const id = schedulePreload(() => {
          preloadBatch(startIndex + batchSize, batchSize)
        })
        if (cancelled) {
          cancelSchedule(id)
        }
      }
    }

    const id = schedulePreload(() => {
      preloadBatch(0)
    })

    return () => {
      cancelled = true
      cancelSchedule(id)
    }
  }, [photos])

  return (
    <div className="page">
      <div className="page-header">
        <Toolbar />
        <div className="page-date">
          {formattedDate} at {formattedTime}
        </div>
      </div>

      <div className="page-content photos-content">
        <h1 className="about-title">photos</h1>
        <p className="photos-description">a collection of some of my favorite memories. click on any of them to enlarge</p>

        <div className="photos-gallery">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="photo-item"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="photo-wrapper">
                <div className="photo-image-container">
                  <img
                    src={photo.src}
                    alt={`Photo ${index + 1}`}
                    className="photo-image"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    decoding="async"
                    fetchpriority={index === 0 ? 'high' : 'auto'}
                    onError={(e) => {
                      const target = e.currentTarget
                      console.error(`Failed to load image:`, {
                        photoSrc: photo.src,
                        currentSrc: target.currentSrc,
                        imgSrc: target.src,
                        error: e
                      })
                    }}
                  />
                </div>
                <div className="photo-description">{photo.description}</div>
              </div>
            </div>
          ))}
        </div>

        {selectedPhoto && (
          <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
            <div
              className="photo-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="photo-modal-close"
                onClick={() => setSelectedPhoto(null)}
              >
                ×
              </button>
              <img
                src={selectedPhoto.src}
                alt="Enlarged photo"
                className="photo-modal-image"
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget
                  console.error(`Failed to load modal image:`, {
                    photoSrc: selectedPhoto.src,
                    currentSrc: target.currentSrc,
                    imgSrc: target.src,
                    error: e
                  })
                }}
              />
              <div className="photo-modal-description">
                {selectedPhoto.description}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Photos
