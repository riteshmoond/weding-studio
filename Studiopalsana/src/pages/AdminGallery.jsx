// import React, { useEffect, useState } from "react";
// import AdminSidebar from "../components/AdminSidebar";
// import AdminTopbar from "../components/AdminTopbar";
// import { Menu } from "lucide-react";

// export default function AdminGallery() {
//   const [images, setImages] = useState([]);
//   const [preview, setPreview] = useState(null);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   // Load saved images
//   useEffect(() => {
//     const saved = localStorage.getItem("adminGallery");
//     if (saved) setImages(JSON.parse(saved));
//   }, []);

//   const saveToStorage = (data) =>
//     localStorage.setItem("adminGallery", JSON.stringify(data));

//   // Preview selected image
//   const handlePreview = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => setPreview(reader.result);
//     reader.readAsDataURL(file);
//   };

//   // Upload image
//   const handleUpload = () => {
//     if (!preview) {
//       alert("Please select an image.");
//       return;
//     }

//     const updated = [...images, preview];
//     setImages(updated);
//     saveToStorage(updated);
//     setPreview(null);

//     alert("Image uploaded successfully!");
//   };

//   // Delete image
//   const deleteImage = (index) => {
//     const updated = images.filter((_, i) => i !== index);
//     setImages(updated);
//     saveToStorage(updated);
//   };

//   return (
//     <div className="flex bg-gray-100 min-h-screen">

//       {/* 🔥 MOBILE OVERLAY */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 sm:hidden"
//           onClick={() => setIsSidebarOpen(false)}
//         ></div>
//       )}

//       {/* 🔥 FIXED SIDEBAR (NO SCROLL) */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50
//           transform transition-transform duration-300
//           overflow-hidden
//           ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           sm:translate-x-0 sm:relative sm:z-auto sm:overflow-hidden
//         `}
//       >
//         <AdminSidebar closeSidebar={() => setIsSidebarOpen(false)} />
//       </div>

//       {/* MAIN AREA */}
//       <main className="flex-1 overflow-y-auto max-h-screen">

//         {/* 🔥 MOBILE TOPBAR */}
//         <div className="sm:hidden flex items-center bg-white p-4 shadow sticky top-0 z-20">
//           <button onClick={() => setIsSidebarOpen(true)}>
//             <Menu size={28} />
//           </button>
//           <h1 className="ml-3 text-xl font-semibold">Gallery</h1>
//         </div>

//         {/* 🔥 DESKTOP TOPBAR */}
//         <div className="hidden sm:block sticky top-0 z-20">
//           <AdminTopbar />
//         </div>

//         {/* PAGE BODY */}
//         <div className="p-4 sm:p-6 lg:px-8 py-6">
//           <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

//           {/* UPLOAD SECTION */}
//           <div className="bg-white p-6 rounded-xl shadow-lg mb-10">
//             <h2 className="text-xl font-semibold mb-4">Upload New Image</h2>

//             <input
//               type="file"
//               accept="image/*"
//               onChange={handlePreview}
//               className="w-full mb-4 cursor-pointer relative z-[9999]"
//               style={{ position: "relative" }}
//             />

//             {preview && (
//               <div className="mb-4 flex justify-center">
//                 <img
//                   src={preview}
//                   alt="preview"
//                   className="w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-xl border shadow"
//                 />
//               </div>
//             )}

//             <button
//               onClick={handleUpload}
//               className="bg-black text-white px-6 py-3 rounded-lg w-full sm:w-auto hover:bg-gray-800"
//             >
//               Upload Image →
//             </button>
//           </div>

//           {/* GALLERY GRID */}
//           <h2 className="text-2xl font-bold mb-4">Gallery Images</h2>

//           {images.length === 0 ? (
//             <p className="text-gray-600">No images uploaded yet.</p>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//               {images.map((img, index) => (
//                 <div
//                   key={index}
//                   className="relative rounded-xl overflow-hidden shadow-lg group"
//                 >
//                   <img
//                     src={img}
//                     alt="uploaded"
//                     className="w-full h-40 sm:h-48 object-cover"
//                   />

//                   {/* DELETE BUTTON */}
//                   <button
//                     onClick={() => deleteImage(index)}
//                     className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}

//         </div>
//       </main>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopbar from "../components/AdminTopbar";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [previewList, setPreviewList] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load saved images
  useEffect(() => {
    const saved = localStorage.getItem("adminGallery");
    if (saved) setImages(JSON.parse(saved));
  }, []);

  const saveToStorage = (data) =>
    localStorage.setItem("adminGallery", JSON.stringify(data));

  // MULTI IMAGE SELECTION + PREVIEW
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewList(previews);
  };

  // DRAG AND DROP UPLOAD
  const onDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (!files.length) return;

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewList(previews);
  };

  const onDragOver = (e) => e.preventDefault();

  // SAVE IMAGES
  const uploadAll = () => {
    if (previewList.length === 0) return alert("Please select images.");

    const updated = [...images, ...previewList];
    setImages(updated);
    saveToStorage(updated);
    setPreviewList([]);

    alert("Images uploaded successfully!");
  };

  // DELETE IMAGE
  const deleteImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    saveToStorage(updated);
  };

  // LIGHTBOX CONTROLS
  const nextImage = () =>
    setLightboxIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* FIXED SIDEBAR */}
      <div
        className={`
          fixed inset-y-0 left-0 w-64 z-50
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0
        `}
      >
        <AdminSidebar closeSidebar={() => setIsSidebarOpen(false)} />
      </div>

      {/* MAIN CONTENT SCROLLABLE */}
      <main className="flex-1 ml-0 sm:ml-64 overflow-y-auto max-h-screen">

        {/* MOBILE TOPBAR */}
        <div className="sm:hidden flex items-center bg-white shadow p-4 sticky top-0 z-20">
          <Menu size={28} onClick={() => setIsSidebarOpen(true)} />
          <h1 className="ml-3 text-xl font-semibold">Gallery</h1>
        </div>

        {/* DESKTOP TOPBAR */}
        <div className="hidden sm:block sticky top-0 z-20">
          <AdminTopbar />
        </div>

        {/* PAGE BODY */}
        <div className="p-4 sm:p-6 lg:p-8">

          <h1 className="text-3xl font-bold mb-6">Gallery Management</h1>

          {/* DRAG & DROP UPLOADER */}
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            className="bg-white p-6 border-2 border-dashed border-gray-400 rounded-xl text-center shadow"
          >
            <p className="text-gray-600 mb-4">Drag & Drop Images Here</p>

            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              className="w-full cursor-pointer relative z-20"
              style={{ position: "relative" }}
            />

            {/* Preview Selected Images */}
            {previewList.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                {previewList.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    className="w-full h-40 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            )}

            {previewList.length > 0 && (
              <button
                onClick={uploadAll}
                className="bg-black text-white px-6 py-3 rounded-lg mt-4 hover:bg-gray-800"
              >
                Upload All →
              </button>
            )}
          </div>

          {/* GALLERY GRID */}
          <h2 className="text-2xl font-bold mt-10 mb-4">All Images</h2>

          {images.length === 0 ? (
            <p className="text-gray-600">No images uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
                >
                  <img
                    src={img}
                    className="w-full h-40 sm:h-48 object-cover"
                    onClick={() => setLightboxIndex(idx)}
                  />

                  <button
                    onClick={() => deleteImage(idx)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 
                    rounded-md opacity-0 group-hover:opacity-100 transition"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* LIGHTBOX */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]">
          <button
            className="absolute top-5 right-5 text-white"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={40} />
          </button>

          <button
            className="absolute left-5 text-white"
            onClick={prevImage}
          >
            <ChevronLeft size={50} />
          </button>

          <img
            src={images[lightboxIndex]}
            className="max-h-[80%] max-w-[80%] object-contain rounded-lg shadow-2xl"
          />

          <button
            className="absolute right-5 text-white"
            onClick={nextImage}
          >
            <ChevronRight size={50} />
          </button>
        </div>
      )}
    </div>
  );
}
