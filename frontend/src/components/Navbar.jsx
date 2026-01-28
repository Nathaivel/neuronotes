export default function Navbar() {
  return (
    <div className="flex sticky top-0 left-0 gap-1.5  bg-dark-soft  text-white backdrop-blur-2xl w-full py-5 px-2.5 shadow-2xl justify-between mb-5 ">
      <div className="flex space-x-2">
        <h3 className="text-md font-black sm:text-sm ">
          <a href="/">Neuronotes</a>
        </h3>
      </div>

      <div className="justify-between space-x-2 ">
        <a href="/">Notes</a>
        <a href="/review">Review</a>
        <a href="/dashboard">Dashboard</a>
      </div>
    </div>
  );
}
