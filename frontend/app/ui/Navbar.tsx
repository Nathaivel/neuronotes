export default function Navbar() {
  return (
    <div className="flex fixed top-0 left-0 gap-1.5 bg-black/75  text-white backdrop-blur-2xl w-screen py-5 px-2.5 shadow-2xl justify-between">
      <div>
        <h3 className="text-md font-black ">Neuronotes</h3>
      </div>

      <div className="justify-between space-x-2">
        <a>Notes</a>
        <a>Review</a>
        <a>Dashboard</a>
      </div>
    </div>
  );
}
