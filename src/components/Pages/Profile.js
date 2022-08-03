import React, { useRef, useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import github from "../../Assets/github.jpeg";
import url from "../../Assets/url.jpeg";
import CartContext from "../Cart/CartContext";
import { Link } from "react-router-dom";
import "./Profile.css";
const Profile = (props) => {
  const crtCtx = useContext(CartContext);
  const history = useHistory();

  const [name, setIsName] = useState([]);
  const [imageLink, setImageLink] = useState([]);
  const [verifyEmail, setVerifiedEmail] = useState(true);
  const nameRef = useRef();
  const imageUrlRef = useRef();

  async function getBackData() {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBMoCmrXulQToPQEvD8GVvnW5klI3An3Ps",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
      }
    );
    const data = await response.json();
    // const userData = data.users;
    console.log(data);
    setIsName(data.displayName);
    setImageLink(data.photoUrl);
    data.emailVerified && setVerifiedEmail(false);
  }
  useEffect(() => {
    getBackData();
  }, []);

  const submitHandler = (item) => {
    item.preventDefault();
    const enteredName = nameRef.current.value;
    const enteredImageUrl = imageUrlRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBMoCmrXulQToPQEvD8GVvnW5klI3An3Ps",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
          displayName: enteredName,
          photoUrl: enteredImageUrl,
          returnSecureToken: true,
        }),
      }
    ).then((res) => {
      console.log(res.json());
      history.replace("/Welcome");
    })
  };

  const verifyHandler = (mail) => {
    mail.preventDefault();
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBMoCmrXulQToPQEvD8GVvnW5klI3An3Ps",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "VERIFY_EMAIL",
          idToken: localStorage.getItem("token"),
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log("Email Not Verified");
      });
  };
  console.log(imageUrlRef);

  return (
    <div className="main">
      <div className="title">
        <span className="title-span1">
          Winner Never Quits, Quitter Never Wins
        </span>
        <span className="title-span2">
          Your Profile is 35% Completed. <br></br>
          <Link className="complete-button" to="/profile">
            Complete Now
          </Link>
        </span>
      </div>

      <div className="form-main">
      
        <h2>Contact Details</h2>
        {/* <img className="profile_image" src={imageUrlRef.current.value} alt=""></img> */}
        <form onSubmit={submitHandler}>
          <span className="form-div">
            <label className="form-lable" htmlFor="name">
              <img alt="" className="imageName" src={github}></img>Full Name :
            </label>
            <input
              className="form-input"
              type="text"
              id="name"
              required
              ref={nameRef}
              defaultValue={name}
            />
          </span>

          <span className="form-div">
            <img alt="" className="imageName" src={url}></img>
            <label className="form-lable" htmlFor="imageUrl">
              Profile Photo Url :
            </label>
            <input
              className="form-input"
              type="text"
              id="imageUrl"
              required
              ref={imageUrlRef}
              defaultValue={imageLink}
            />
            <br></br>
          </span>

          <div className="button-div">
            <span>
              <button className="button-update" type="submit">
                Update
              </button>
            </span>
            <span>
              <button className="button-logout" onClick={crtCtx.removeToken}>
                Logout
              </button>
            </span>
          </div>
        </form>
        {verifyEmail && (
          <button className="button-verify" onClick={verifyHandler}>
            Verify E-mail
          </button>
        )}
      </div>
    </div>
  );
};
export default Profile;
