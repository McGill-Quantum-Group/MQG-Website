import { useState, useRef, useEffect } from "react";
import "../Posts.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { secureDbRequest, secureImageUpload } from "../AdminUtils";

import { useNavigate } from "react-router-dom";

function ScheduleAdd({ operation = "insert", data }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [prevImageUrls, setPrevImageUrls] = useState([]);
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef("");
  const maxSize = 5 * 1024 * 1024; // MB
  const navigator = useNavigate();

  // Update only
  const handleAddImage = (images) => {
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      setImageFiles((prevImg) => {
        const newImg = prevImg.includes(img)
          ? prevImg.filter((selectedImg) => selectedImg !== img) // Remove if exists
          : [...prevImg, img]; // Add if doesn't exist

        console.log("Current selected IDs:", newImg);
        return newImg;
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      for (let i = 0; i < fileList.length; i++) {
        // Check for oversize
        const file = fileList[i];
        const fsize = file.size;

        if (fsize > maxSize) {
          alert(`${file.name} is too large! Please keep uploads under 5 MB.`);

          // Reset state
          setImageFiles([]);

          // Clear the actual HTML input so the filename disappears
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
          return;
        }
      }
      if (operation === "update") {
        handleAddImage(fileList);
      } else {
        setImageFiles(fileList);
      }
    }
  };

  const submitToDatabase = async () => {
    if (!title || !date || !location)
      return alert(
        "Essential fields missing! Make sure you have filled out all the * fields.",
      );
    setIsUploading(true);

    try {
      // 1. Upload images securely via Signed URLs
      // Maps over the files and uploads them to the "schedule-images" bucket inside the "events-schedule" folder
      const newImageUrls = await Promise.all(
        imageFiles.map((file) =>
          secureImageUpload("schedule-images", "events-schedule", file),
        ),
      );

      const imageUrls = [...newImageUrls, ...prevImageUrls];

      // 2. Insert text data and image URLs into the database
      const payload = {
        title: title,
        date: date,
        location: location,
        description: description,
        images: imageUrls,
      };

      if (operation === "update") {
        payload.id = data.id;
      }

      console.log(payload);

      await secureDbRequest(operation, "events-schedule", payload);

      if (operation === "update") {
        alert("Event updated on schedule!");
        navigator("/admin/schedule");
      } else {
        setTitle("");
        setDate(new Date()); // Convert string to Date object
        setLocation("");
        setDescription("");
        setPrevImageUrls([]);
        alert("Event created on schedule!");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }

      // Reload page if update is complete
      if (operation === "update") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Upload failed: " + (error.message || "Unknown error occurred"));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDateChange = (date) => {
    setDate(new Date(date));
  };

  useEffect(() => {
    if (operation === "update" && data) {
      setTitle(data.title || "");
      setDate(new Date(data.date)); // Convert string to Date object
      setLocation(data.location || "");
      setDescription(data.description || "");
      setPrevImageUrls(data.images || []);
    }
  }, [operation, data]);

  return (
    <div className="adminModalOverlay">
      <div className="postContainer">
        <h1>Schedule: {operation === "update" ? "Update" : "Add"} a event</h1>
        <h2 style={{ fontWeight: "bold" }}>Shows on calendar</h2>
        <div>
          <form>
            <label style={{ fontSize: "large", marginRight: "10px" }}>
              {" "}
              Event Title (*):
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <br />
            <br />
            <label style={{ fontSize: "large", marginRight: "10px" }}>
              {" "}
              Event date (*):
            </label>
            <DatePicker
              selected={date}
              onChange={(date) => handleDateChange(date)}
              showTimeSelect
              dateFormat="Pp"
            />
            <br />
            <br />
            <label style={{ fontSize: "large", marginRight: "10px" }}>
              {" "}
              Event location (*):
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </form>
        </div>
        <br />
        <h2 style={{ fontSize: "x-large", fontWeight: "bold" }}>
          Shows on click
        </h2>
        <form>
          <label style={{ fontSize: "large" }}>Event description:</label>
          <br />
          <textarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Upload extra images (Max size - 5 MB):</label>
          <br />
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <br />
          <br />
          {operation === "update" ? (
            <div>
              Images already uploaded:
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  overflowX: "auto",
                }}
              >
                {prevImageUrls.map((image, index) => (
                  <img
                    key={index}
                    style={{
                      width: "75px",
                      padding: "5px",
                    }}
                    src={image}
                    alt={`Uploaded ${index}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div />
          )}
        </form>
        <br />
        <button
          style={{ fontWeight: "bold" }}
          onClick={() => submitToDatabase()}
        >
          Submit!
        </button>
      </div>
    </div>
  );
}

export default ScheduleAdd;
