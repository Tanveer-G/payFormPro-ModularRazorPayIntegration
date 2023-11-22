/* eslint-disable react/prop-types */

export default function ErrorMessage({errorMessage}) {
  return (
    <div className="my-8 h-52">
    <h1 className="text-6xl red-gradient-text mt-3">Error</h1>
    <p className="text-3xl silver-gradient-text mt-3">{errorMessage}</p>
    <i>Please try again!</i>
    </div>
  )
}
