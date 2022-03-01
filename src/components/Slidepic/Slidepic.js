import React, { useState, useEffect } from "react"
import pics from "./SlidepicData"
import config from "./SlidepicConfig"

const Slidepic = () => {
  pics.sort(compare)

  const [index, setIndex] = useState(1)
  const { file, date, text } = pics[index - 1]

  useEffect(() => {
    const oldButtons = Array.from(document.querySelectorAll(".btn-older, .btn-oldest"))
    const newButtons = Array.from(document.querySelectorAll(".btn-newer, .btn-newest"))
    const allButtons = Array.from(document.querySelectorAll(".btn-older, .btn-oldest, .btn-newer, .btn-newest"))

    allButtons.map(button => (button.disabled = false))

    if (index === pics.length) {
      oldButtons.map(button => button.setAttribute("disabled", "disabled"))
    }

    //
    if (index === 1) {
      newButtons.map(button => button.setAttribute("disabled", "disabled"))
    }

    document.querySelector(".getpic").value = index
  }, [index])

  const validateIndex = number => {
    if (number > pics.length) return 1
    if (number < 1 || number > pics.length) return index
    return number
  }

  const getOldestPic = () => {
    setIndex(validateIndex(pics.length))
  }

  const getOlderPic = () => {
    setIndex(validateIndex(index + 1))
  }

  const getNewerPic = () => {
    setIndex(validateIndex(index - 1))
  }

  const getNewestPic = () => {
    setIndex(validateIndex(1))
  }

  const getRandomPic = () => {
    let randomNumber = Math.ceil(Math.random() * pics.length)
    // avoid picking the index of the same picture
    if (randomNumber === index) {
      randomNumber = index - 1
    }
    setIndex(validateIndex(randomNumber))
  }

  const getPic = e => {
    e.preventDefault()
    setIndex(validateIndex(parseInt(e.target.value) || index))
  }

  function compare(a, b) {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  }

  return (
    <section className="slidepic">
      <header className="slidepic-title">
        <h1>{config.title}</h1>
      </header>

      <aside className="slidepic-controls">
        <p>
          <button aria-controls="slidepic-status" className="btn-newest" onClick={getNewestPic}>
            <span aria-hidden="true">{config.newest}</span>
            <span className="sr-only">{config.ally.newest}</span>
          </button>
          <button aria-controls="slidepic-status" className="btn-newer" onClick={getNewerPic}>
            <span aria-hidden="true">{config.newer}</span>
            <span className="sr-only">{config.ally.newer}</span>
          </button>
          <button aria-controls="slidepic-status" className="btn-random" onClick={getRandomPic}>
            <span aria-hidden="true">{config.random}</span>
            <span className="sr-only">{config.ally.random}</span>
          </button>
          <button aria-controls="slidepic-status" className="btn-older" onClick={getOlderPic}>
            <span aria-hidden="true">{config.older}</span>
            <span className="sr-only">{config.ally.older}</span>
          </button>
          <button aria-controls="slidepic-status" className="btn-oldest" onClick={getOldestPic}>
            <span aria-hidden="true">{config.oldest}</span>
            <span className="sr-only">{config.ally.oldest}</span>
          </button>
        </p>
        <p>
          <label htmlFor="getpic">{config.goToImage} </label>
          <input className="getpic" name="getpic" placeholder={index} onChange={getPic} required="required" type="number" min="1" max={pics.length} /> {config.of} {pics.length}
        </p>
      </aside>

      <div role="region" id="slidepic-status" class="sr-only" aria-live="assertive" tabindex="-1">
        {config.ally.nowOn} {index} of {pics.length}
      </div>

      <figure className="slidepic-image">
        <img onClick={getOlderPic} src={file} alt="" />
      </figure>

      <div className="slidepic-data">
        <p>{text}</p>
        <p>{date}</p>
      </div>
    </section>
  )
}

export default Slidepic
