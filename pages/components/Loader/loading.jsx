const Loading = ({ message='Loading' }) => {
  return (
    <div className='overflow-hidden flex items-center w-full flex-col py-4 sticky'>
      <div className='spinner mb-2'></div>
      <span className='px-2 py-1 rounded-full bg-black/20'>{message}</span>
    </div>
  )
}
export default Loading
