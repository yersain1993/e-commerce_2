import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../store/slices/user.slice';
import userImage from '../assets/image/user.png';
import { useSelector } from 'react-redux';

const Profile = () => {
  const dispatch = useDispatch();

  const firstNameUser = useSelector((state) => state.user.firstName);
  const lastNameUser = useSelector((state) => state.user.lastName);

  return (
    <div>
      <div className="flex flex-col justify-center items-center bg-white py-16 rounded-md">
        <img src={userImage} alt="profile_image" className="w-1/4" />
        <p> {`${firstNameUser} ${lastNameUser}`} </p>
        <button onClick={() => dispatch(reset())}>LogOut</button>
      </div>
    </div>
  );
};

export default Profile;
