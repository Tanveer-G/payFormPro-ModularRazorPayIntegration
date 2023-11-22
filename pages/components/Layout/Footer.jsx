import Socials from "./Socials"
const Footer = () => {
  return (
    <footer className='bg-black/20 rounded-md py-2 flex flex-col bottom-0 relative text-center justify-center items-center text-[#fe7f00] font-semibold w-full'>
     <h5 className="text-[#FF1E27]"> &#169; Develope and Design by Tanveer H.</h5>
      <a
        href='https://tanveer-portfolio.vercel.app/en-US/contact'
        className=' flex text-white hover:text-[#FF1E27] active:text-[#7D141D] hover:underline'
      >
        Contact me.
      </a>
      <Socials/>
    </footer>
  )
}
export default Footer
