import { NavLink } from "react-router";
import { useRef, useState } from "react";

function navClassName({ isActive }: { isActive: boolean }) {
  return `flex gap-4 items-center ${isActive && "rounded-md bg-themed-card"}`;
}

export default function LeftPanel() {
  return (
    <nav className="md:w-52 lg:w-64 xl:w-72 sticky top-0 p-2 lg:p-4 border-r border-themed-border flex flex-col shrink-0">
      <NavLink className={navClassName} to="/">
        <div className="w-13 p-3 shrink-0 aspect-square rounded-md overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-current"
          >
            <path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Z" />
          </svg>
        </div>
        <span className="hidden md:block">Home</span>
      </NavLink>
      <NavLink className={navClassName} to="/explore">
        <div className="w-13 p-3 shrink-0 aspect-square rounded-md overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-current"
          >
            <path d="m300-300 280-80 80-280-280 80-80 280Zm180-120q-25 0-42.5-17.5T420-480q0-25 17.5-42.5T480-540q25 0 42.5 17.5T540-480q0 25-17.5 42.5T480-420Zm0 340q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
          </svg>
        </div>
        <span className="hidden md:block">Explore</span>
      </NavLink>
      <Library />
    </nav>
  );
}

function Library() {
  return (
    <>
      <div className="flex justify-between items-center my-2 md:border-y md:border-themed-border">
        <p className="hidden md:block cursor-default text-themed-text-muted">
          Your library
        </p>
        <CreatePlaylist />
      </div>
    </>
  );
}

function CreatePlaylist() {
  const [load, setLoad] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  function handleClick() {
    dialogRef.current?.showModal();
  }

  return (
    <>
      <button
        onClick={handleClick}
        className="w-13 p-3 shrink-0 aspect-square rounded-md overflow-hidden bg-themed-card md:bg-transparent outline-0"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          fill="#e3e3e3"
          className="w-full fill-themed-text-muted hover:fill-themed-text"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </button>
      <dialog
        ref={dialogRef}
        className="left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 backdrop:backdrop-blur-xs bg-themed-card text-themed-text shadow shadow-themed-border rounded-xl px-6 py-5"
      >
        <div className="flex justify-between items-center mb-5">
          <p className="text-lg font-semibold">Create Playlist</p>
          <div>
            <button
              onClick={() => {
                dialogRef.current?.close();
              }}
              className="w-6 h-6 p-1.5 bg-themed-border rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#e3e3e3"
                className="w-full"
              >
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
              </svg>
            </button>
          </div>
        </div>
        <form method="dialog">
          <div className="flex gap-3 mb-5">
            <div className="w-40 aspect-square flex justify-center items-center border border-themed-border rounded-lg overflow-hidden">
              <img
                src={"https://picsum.photos/200/300.webp"}
                className="object-cover w-full aspect-square"
              />
            </div>
            <div className="flex flex-col gap-3 w-72">
              <input
                type="text"
                name="title"
                placeholder="Title"
                className="px-3 py-1.5 rounded-md focus:outline-2 focus:outline-offset-1 focus:outline-themed-text-muted bg-themed-bg"
              />
              <textarea
                name="description"
                placeholder="Description"
                className="resize-none px-3 py-1.5 rounded-md focus:outline-2 focus:outline-offset-1 focus:outline-themed-text-muted bg-themed-bg grow"
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              disabled={load}
              type="submit"
              className="disabled:bg-white/50 flex justify-center items-center px-3 py-1.5 rounded-full bg-white text-black"
            >
              <span>Create</span>
              {load && (
                <div className="w-6 aspect-square">
                  <svg
                    version="1.1"
                    id="L9"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 100 100"
                    enableBackground="new 0 0 0 0"
                    xmlSpace="preserve"
                  >
                    <path
                      fill="#000"
                      d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
                    >
                      <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        dur="1s"
                        from="0 50 50"
                        to="360 50 50"
                        repeatCount="indefinite"
                      />
                    </path>
                  </svg>
                </div>
              )}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
