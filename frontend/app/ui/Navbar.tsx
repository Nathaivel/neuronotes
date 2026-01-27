import { Jersey_25 } from "next/font/google";
import Image from "next/image";

export default function Navbar() {
  return (
<<<<<<< HEAD
    <div className="flex sticky top-0 left-0 gap-1.5 bg-black/75  text-white backdrop-blur-2xl w-full py-5 px-2.5 shadow-2xl justify-between mb-1 ">
=======
    <div className="flex fixed top-0 left-0 gap-1.5 bg-black/75  text-white backdrop-blur-2xl w-screen py-5 px-2.5 shadow-2xl justify-between">
>>>>>>> f5b4991db8e71358934dab50217024f5aa1f3a70
      <div className="flex space-x-2">
        <Image
          className="dark:invert"
          src="/file.svg"
          alt="Notes icon"
          width={20}
          height={20}
        />
<<<<<<< HEAD
        <h3 className="text-md font-black ">
          <a href="/">Neuronotes</a>
        </h3>
=======
        <h3 className="text-md font-black ">Neuronotes</h3>
>>>>>>> f5b4991db8e71358934dab50217024f5aa1f3a70
      </div>

      <div className="justify-between space-x-2">
        <a>Notes</a>
        <a>Review</a>
        <a>Dashboard</a>
      </div>
    </div>
  );
}
