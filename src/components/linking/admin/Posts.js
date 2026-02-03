import { useState } from "react";
import "./Posts.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { supabase } from "../../supabaseConfig";

function Schedule() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [spotlightImage, setSpotlightImage] = useState("");
  const [description, setDescription] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [sameTitleChecked, setSameTitleChecked] = useState(false);
  const [shortDescription, setShortDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    // Convert FileList to an array
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleSpotlightImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSpotlightImage(e.target.files[0]);
    }
  };

  const handleDateChange = (date) => {
    setDate(new Date(date));
    console.log(new Date(date));
  };

  const uploadImage = async (file) => {
    const filePath = `events-past/${Date.now()}_${file.name}`;

    // Upload data
    const { data, error } = await supabase.storage
      .from("past-events-images")
      .upload(filePath, file);

    if (error) throw error;

    // Public URL
    const { data: urlData } = supabase.storage
      .from("past-events-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const uploadThumbnail = async (file) => {
    const filePath = `events-past/${Date.now()}_${file.name}`;

    // Upload data
    const { data, error } = await supabase.storage
      .from("past-events-thumbnails")
      .upload(filePath, file);

    if (error) throw error;

    // Public URL
    const { data: urlData } = supabase.storage
      .from("past-events-thumbnails")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const submitToDatabase = async () => {
    if (!title || !date || !spotlightImage || !postTitle)
      return alert(
        "Essential information missing! Please fill out all required (*) fields.",
      );
    setIsUploading(true);

    try {
      if (sameTitleChecked || postTitle == "" || postTitle == null) {
        setPostTitle(title);
      }

      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file)),
      );

      const thumbnailUrl = await uploadThumbnail(spotlightImage);

      const { error } = await supabase.from("events-past").insert([
        {
          title: title,
          short_description: shortDescription,
          post_title: postTitle,
          date: date,
          location: location,
          spotlight_image: thumbnailUrl,
          description: description,
          images: imageUrls,
        },
      ]);

      if (error) throw error;
      alert("Event published on schedule!");
      // Reset form
      setTitle("");
      setDescription("");
      setImageFiles([]);
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error uploading event");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="adminModalOverlay">
      <div className="postContainer">
        <h1>Add a event to past events</h1>
        <h2 style={{ fontWeight: "bold" }}>Shows in thumbnail</h2>
        <div>
          <form>
            <label style={{ fontSize: "large", marginRight: "10px" }}>
              {" "}
              Event Title:
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
              Event Short Description:
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
              Event date:
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
              Spotlight image:
            </label>
            <br />
            <input
              type="file"
              accept="image/*"
              onChange={handleSpotlightImageChange}
            />
          </form>
        </div>
        <br />
        <h2 style={{ fontSize: "x-large", fontWeight: "bold" }}>
          Shows on click
        </h2>
        <form>
          <label style={{ fontSize: "large" }}> Event Title in Post:</label>
          <br />
          <input
            type="text"
            id="postTitle"
            name="postTitle"
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
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Event images (Max size - 5 MB):</label>
          <br />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => setImageFiles(Array.from(e.target.files))}
          />
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

export default Schedule;
