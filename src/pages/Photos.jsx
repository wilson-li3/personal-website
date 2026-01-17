import { useState, useEffect } from 'react'
import Toolbar from '../components/Toolbar'
import './Page.css'
import img0001 from '../images/IMG_0001.png'
import img0002 from '../images/IMG_0002.png'
import img0003 from '../images/IMG_0003.png'
import img0004 from '../images/IMG_0004.png'
import img0032 from '../images/IMG_0032.png'
import img0569 from '../images/IMG_0569.png'
import img0579 from '../images/IMG_0579.png'
import img0587 from '../images/IMG_0587.png'
import img0622 from '../images/IMG_0622.png'
import img0960 from '../images/IMG_0960.png'
import img1003 from '../images/IMG_1003.png'
import img1036 from '../images/IMG_1036.png'
import img1049 from '../images/IMG_1049.png'
import img1278 from '../images/IMG_1278.png'
import img1706 from '../images/IMG_1706.png'
import img2367 from '../images/IMG_2367.png'
import img3074 from '../images/IMG_3074.png'
import img3129 from '../images/IMG_3129.png'
import img3131 from '../images/IMG_3131.png'
import img4926 from '../images/IMG_4926.png'
import img4933 from '../images/IMG_4933.png'
import img5444 from '../images/IMG_5444_jpg.png'
import img5855 from '../images/IMG_5855.png'
import img5942 from '../images/IMG_5942.png'
import img6093 from '../images/IMG_6093.png'
import img6105 from '../images/IMG_6105.png'
import img6209 from '../images/IMG_6209.png'
import img6735 from '../images/IMG_6735.png'
import img6738 from '../images/IMG_6738.png'
import img7025 from '../images/IMG_7025.png'
import img9482 from '../images/IMG_9482.png'
import img9590 from '../images/IMG_9590.png'
import img9709 from '../images/IMG_9709.png'
import img9723 from '../images/IMG_9723.png'
import img9736 from '../images/IMG_9736.png'
import img9771 from '../images/IMG_9771.png'

function Photos() {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const noteDate = new Date(Date.now() - 5 * 86400000)
  const formattedDate = noteDate.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  })
  const formattedTime = new Date().toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  })

  // Photos array with IMG_0001 first, then the rest
  const photos = [
    { src: img0001, description: 'se30 except eugene was sick and kevin\'s batman' },
    { src: img0002, description: 'antelope canyon, arizona' },
    { src: img0003, description: 'senior prom' },
    { src: img0004, description: 'yantai, shandong' },
    { src: img0032, description: 'beach' },
    { src: img0569, description: 'first time in toronto' },
    { src: img0579, description: 'eaton centre' },
    { src: img0587, description: 'downtown toronto' },
    { src: img0622, description: 'philadelphia' },
    { src: img0960, description: 'waterloo in a nutshell' },
    { src: img1003, description: 'first snowfall ive seen in waterloo' },
    { src: img1036, description: 'view from black friday air bnb' },
    { src: img1049, description: 'turns out cactus club does not serve cactus' },
    { src: img1278, description: 'new york window display' },
    { src: img1706, description: 'horseshoe bend, arizona' },
    { src: img2367, description: 'vegas - my favorite city of all time' },
    { src: img3074, description: 'cool canyon but i forgot where' },
    { src: img3129, description: 'yellowstone national park' },
    { src: img3131, description: 'yellowstone sunset' },
    { src: img4926, description: 'high school graduation, class of 2025' },
    { src: img4933, description: 'maine' },
    { src: img5444, description: 'japan' },
    { src: img5855, description: 'times square' },
    { src: img5942, description: 'rockefeller center' },
    { src: img6093, description: 'cool japanese garden' },
    { src: img6105, description: 'texas' },
    { src: img6209, description: 'friends in my dorm' },
    { src: img6735, description: 'home sweet home' },
    { src: img6738, description: 'cool sunset in my neighborhood' },
    { src: img7025, description: 'RV trip!' },
    { src: img9482, description: 'japan' },
    { src: img9590, description: 'yantai, shandong' },
    { src: img9709, description: 'plane view' },
    { src: img9723, description: 'cool japan photo' },
    { src: img9736, description: 'another cool japan photo' },
    { src: img9771, description: 'gyubeeeee' },
  ]

  useEffect(() => {
    // Preload all images with staggered loading for better Chrome compatibility
    // Chrome has limits on concurrent connections, so we'll load in batches
    const imageCache = []
    const batchSize = 6 // Load 6 at a time for Chrome compatibility
    
    const loadBatch = (startIndex) => {
      const endIndex = Math.min(startIndex + batchSize, photos.length)
      
      for (let i = startIndex; i < endIndex; i++) {
        const photo = photos[i]
        const img = new Image()
        img.loading = 'eager'
        img.onload = () => {
          imageCache[i] = img
        }
        img.src = photo.src
      }
      
      // Load next batch after a short delay
      if (endIndex < photos.length) {
        setTimeout(() => loadBatch(endIndex), 50)
      }
    }
    
    // Start loading immediately
    loadBatch(0)
    
    return () => {
      // Keep images in cache
    }
  }, [])

  return (
    <div className="page">
      <div className="page-header">
        <Toolbar />
        <div className="page-date">{formattedDate} at {formattedTime}</div>
      </div>
      <div className="page-content photos-content">
        <h1 className="about-title">photos</h1>
        <div className="photos-gallery">
          {photos.map((photo, index) => (
            <div 
              key={index} 
              className="photo-item"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="photo-wrapper">
                <img 
                  src={photo.src}
                  alt={`Photo ${index + 1}`}
                  className="photo-image"
                  loading="eager"
                  decoding="sync"
                  fetchPriority={index < 3 ? "high" : "auto"}
                />
                <div className="photo-description">{photo.description}</div>
              </div>
            </div>
          ))}
        </div>
        {selectedPhoto && (
          <div className="photo-modal" onClick={() => setSelectedPhoto(null)}>
            <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="photo-modal-close" onClick={() => setSelectedPhoto(null)}>×</button>
              <img 
                src={selectedPhoto.src} 
                alt="Enlarged photo"
                className="photo-modal-image"
              />
              <div className="photo-modal-description">{selectedPhoto.description}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Photos
