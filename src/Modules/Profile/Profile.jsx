import React, { useState, useRef } from "react";
import Header from "../../Components/Header/Header";
import Sidebar from "../../Components/SideBar/SideBar";
import { FiEdit2 } from "react-icons/fi";
import profileImg from "../../assets/Images/Profile_image.png";
import "./Profile.css";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(profileImg);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fileInputRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    username: "johnd",
    phone: "+91 7777777777",
  });

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => setIsEditing(false);

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Replace with your API call if needed
    // toast or notification instead of alert in production
    alert("Profile updated successfully!");
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleChangePhotoClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <>
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="Profile-root">
        {/* Top small toolbar inside content: Hamburger + Title */}
        <div className="Profile-topbar">
         <button
  className="Profile-hamburger"
  aria-label="Toggle menu"
  aria-expanded={sidebarOpen}
  onClick={toggleSidebar}
  type="button"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="14"
    viewBox="0 0 20 14"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="20" height="2" rx="1" fill="currentColor" />
    <rect y="6" width="12" height="2" rx="1" fill="currentColor" />
    <rect y="12" width="20" height="2" rx="1" fill="currentColor" />
  </svg>
</button>


          <h1 className="profile-title">Profile</h1>
        </div>

        <div className="Profile-outerCard">
          <div className="Profile-container">
            {/* Photo Section */}
            <div className="Profile-card">
              <div className="Profile-photoSection">
                <div className="Profile-photoHeader">Change Photo</div>
                <div className="Profile-photoContent">
                  <img
                    src={selectedImage}
                    alt="Profile"
                    className="Profile-avatar"
                  />

                  <div className="Profile-photoActions">
                    <button
                      type="button"
                      className="Profile-changePhotoBtn"
                      onClick={handleChangePhotoClick}
                    >
                      Change
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  
                  </div>
                </div>
              </div>
            </div>

            {/* Info Section */}
            <div className="Profile-infoCard">
              <div className="Profile-infoHeader">
                <span className="Profile-infoTitle">Personal Information</span>

                {!isEditing ? (
                  <button
                    className="Profile-editBtn"
                    onClick={handleEditClick}
                    type="button"
                    aria-label="Edit profile"
                  >
                    <FiEdit2 size={16} style={{ marginRight: 6 }} />
                    Edit
                  </button>
                ) : null}
              </div>

              <div className="Profile-infoSection">
                <form className="Profile-form" onSubmit={handleSaveClick}>
                  <div className="Profile-formRow">
                    {/* Full Name */}
                    <div className="Profile-formGroup">
                      <label className="Profile-label">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="Profile-input"
                          placeholder="Enter Your Full Name"
                        />
                      ) : (
                        <span className="Profile-readOnly">
                          {formData.fullName}
                        </span>
                      )}
                    </div>

                    {/* Username */}
                    <div className="Profile-formGroup">
                      <label className="Profile-label">Username</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className="Profile-input"
                          placeholder="Enter Your Username"
                        />
                      ) : (
                        <span className="Profile-readOnly">
                          {formData.username}
                        </span>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="Profile-formGroup">
                      <label className="Profile-label">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="Profile-input"
                          placeholder="+91 7777777777"
                        />
                      ) : (
                        <span className="Profile-readOnly">{formData.phone}</span>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="Profile-btnRow">
                      <button type="submit" className="Profile-saveBtn">
                        Save
                      </button>
                      <button
                        type="button"
                        className="Profile-cancelBtn"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
