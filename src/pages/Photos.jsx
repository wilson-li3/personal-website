import { useState } from 'react'
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
    { src: img0001, description: 'add description here' },
    { src: img0002, description: 'add description here' },
    { src: img0003, description: 'add description here' },
    { src: img0004, description: 'add description here' },
    { src: img0032, description: 'add description here' },
    { src: img0569, description: 'add description here' },
    { src: img0579, description: 'add description here' },
    { src: img0587, description: 'add description here' },
    { src: img0622, description: 'add description here' },
    { src: img0960, description: 'add description here' },
    { src: img1003, description: 'add description here' },
    { src: img1036, description: 'add description here' },
    { src: img1049, description: 'add description here' },
    { src: img1278, description: 'add description here' },
    { src: img1706, description: 'add description here' },
    { src: img2367, description: 'add description here' },
    { src: img3074, description: 'add description here' },
    { src: img3129, description: 'add description here' },
    { src: img3131, description: 'add description here' },
    { src: img4926, description: 'add description here' },
    { src: img4933, description: 'add description here' },
    { src: img5444, description: 'add description here' },
    { src: img5855, description: 'add description here' },
    { src: img5942, description: 'add description here' },
    { src: img6093, description: 'add description here' },
    { src: img6105, description: 'add description here' },
    { src: img6209, description: 'add description here' },
    { src: img6735, description: 'add description here' },
    { src: img6738, description: 'add description here' },
    { src: img7025, description: 'add description here' },
    { src: img9482, description: 'add description here' },
    { src: img9590, description: 'add description here' },
    { src: img9709, description: 'add description here' },
    { src: img9723, description: 'add description here' },
    { src: img9736, description: 'add description here' },
    { src: img9771, description: 'add description here' },
  ]

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
