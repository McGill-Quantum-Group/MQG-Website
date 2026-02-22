import { useState, useEffect, useRef } from "react";
import "../Posts.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { secureImageUpload, secureDbRequest } from "../AdminUtils";
import { useNavigate } from "react-router-dom";

function PastEventsAdd({ operation = "insert", data }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [spotlightImage, setSpotlightImage] = useState("");
  const [description, setDescription] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [sameTitleChecked, setSameTitleChecked] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [prevImageUrls, setPrevImageUrls] = useState([]);
  const fileInputRef = useRef("");
  const [isUploading, setIsUploading] = useState(false);
  const maxSize = 5 * 1024 * 1024;

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    // Convert FileList to an array
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const oversized = files.find((file) => file.size > maxSize);
      if (oversized) {
        alert(`File ${oversized.name} is too large!`);
        e.target.value = null;
        return;
      }
      setImageFiles(files);
    }
  };

  const handleSpotlightImageChange = (e) => {
    if (e.target.files[0].size > maxSize) {
      alert(`File ${e.target.files[0].name} is too large!`);
      e.target.value = null;
      return;
    }

    if (e.target.files && e.target.files[0]) {
      setSpotlightImage(e.target.files[0]);
    }
  };

  const handleDateChange = (date) => {
    setDate(new Date(date));
    console.log(new Date(date));
  };

  const uploadImage = async (file) => {
    // Pass the File object so the actual image bytes are uploaded (not the path string)
    return await secureImageUpload("past-events-images", "events-past", file);
  };

  const uploadThumbnail = async (file) => {
    // Pass the File object so the actual image bytes are uploaded (not the path string)
    if (isValidUrl(file)) {
      return;
    }
    return await secureImageUpload(
      "past-events-thumbnails",
      "events-past",
      file,
    );
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (err) {
      return false;
    }
  };

  const submitToDatabase = async () => {
    const finalPostTitle = sameTitleChecked || !postTitle ? title : postTitle;

    if (!title || !date || !spotlightImage)
      return alert(
        "Essential information missing! Please fill out all required (*) fields.",
      );
    setIsUploading(true);

    try {
      const newImageUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file)),
      );

      const imageUrls = [...newImageUrls, ...prevImageUrls];
      const thumbnailUrl = await uploadThumbnail(spotlightImage);

      const payload = {
        title: title,
        short_description: shortDescription,
        post_title: finalPostTitle,
        date: date,
        location: location,
        spotlight_image: thumbnailUrl,
        description: description,
        images: imageUrls,
      };

      if (operation === "update") {
        payload.id = data.id;
      }

      await secureDbRequest(operation, "events-past", payload);

      if (operation === "update") {
        alert("Event updated on schedule!");
        navigate("admin/past-events");
      } else {
        alert("Event created on schedule!");
        setTitle("");
        setDate(new Date()); // Convert string to Date object
        setLocation("");
        setDescription("");
        setPrevImageUrls([]);
        setShortDescription("");
        setPostTitle("");
        setSpotlightImage("");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error uploading event");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (operation === "update" && data) {
      console.log(data);
      setTitle(data.title || "");
      setDate(new Date(data.date)); // Convert string to Date object
      setLocation(data.location || "");
      setDescription(data.description || "");
      setPrevImageUrls(data.images || []);
      setShortDescription(data.short_description);
      setPostTitle(data.post_title);
      setSpotlightImage(data.spotlight_image);
    }
  }, [operation, data]);

  return (
    <div className="adminModalOverlay">
      <div className="postContainer">
        <h1>
          Past events: {operation === "update" ? "Update" : "Add"} an event
        </h1>
        <h2 style={{ fontWeight: "bold" }}>Shows in thumbnail</h2>
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
              Event Short Description (*):
            </label>
            <input
              type="text"
              id="shortDescription"
              name="shortDescription"
              value={shortDescription}
              onChange={(e) => {
                setShortDescription(e.target.value);
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
              Event location:
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
            <br />
            <br />
            <label style={{ fontSize: "large", marginRight: "10px" }}>
              {" "}
              Spotlight image (*) - Max 5 MB:
            </label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleSpotlightImageChange}
            />
            {operation === "update" ? (
              <div>
                Previous spotlight image
                <br />
                <img
                  style={{ width: "200px" }}
                  src={spotlightImage}
                  alt="Previous spotlight image"
                />
              </div>
            ) : (
              <div />
            )}
          </form>
        </div>
        <br />
        <h2 style={{ fontSize: "x-large", fontWeight: "bold" }}>
          Shows on click
        </h2>
        <form>
          <label style={{ fontSize: "large" }}> Event Title in Post (*):</label>
          <br />
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            disabled={sameTitleChecked}
            value={postTitle}
            onChange={(e) => {
              setPostTitle(e.target.value);
            }}
          />
          <br />
          <div style={{ display: "flex", justifyItems: "center" }}>
            Use same title as event title?
            <input
              type="checkbox"
              id="sameTitles"
              name="sameTitles"
              checked={sameTitleChecked}
              onChange={() => setSameTitleChecked(!sameTitleChecked)}
            />
          </div>
          <span style={{ margin: "0 px" }}>
            (Note: this is the title that appears after the user clicks. For
            most purposes, it will probably be the same as the thumbnail title.)
          </span>
          <br />
          <br />
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
          <label>Event images (Max size - 5 MB):</label>
          <br />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
          />
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

export default PastEventsAdd;
