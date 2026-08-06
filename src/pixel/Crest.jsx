const CREST = '/images/waterloocrest-pixel.png'

/*
 * The Waterloo crest as a pixel sticker on the felt: a 32x32 crest blown up
 * on the grid, sitting behind the greeting and the bag.
 */
function Crest({ className = '' }) {
  return (
    <img
      className={`crest ${className}`}
      src={CREST}
      alt="University of Waterloo crest"
      width="192"
      height="192"
    />
  )
}

export default Crest
