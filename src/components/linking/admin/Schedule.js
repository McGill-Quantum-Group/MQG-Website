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
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e) => {
    // Convert FileList to an array
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  const handleDateChange = (date) => {
    setDate(new Date(date));
    console.log(new Date(date));
  };

  const uploadImage = async (file) => {
    const filePath = `events-schedule/${Date.now()}_${file.name}`;

    // Upload data
    const { data, error } = await supabase.storage
      .from("schedule-images")
      .upload(filePath, file);

    if (error) throw error;

    // Public URL
    const { data: urlData } = supabase.storage
      .from("schedule-images")
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  };

  const submitToDatabase = async () => {
    if (!title || !date) return alert("Date and/or title missing!");
    setIsUploading(true);

    try {
      const imageUrls = await Promise.all(
        imageFiles.map((file) => uploadImage(file)),
      );

      const { error } = await supabase.from("events-schedule").insert([
        {
          title: title,
          date: date,
          location: location,
          description,
          description,
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
        <h1>Add a event to the schedule</h1>
        <h2 style={{ fontWeight: "bold" }}>Shows on calendar</h2>
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
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <label>Upload extra images (Max size - 5 MB):</label>
          <br />
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
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
