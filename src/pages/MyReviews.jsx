import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext/AuthContext';
import { format } from 'date-fns';
import ReactRating from 'react-rating';
import { FaEdit, FaRegStar, FaStar, FaStarHalfAlt, FaTrash } from 'react-icons/fa';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
 
import axios from 'axios';

const MyReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [updatedRating, setUpdatedRating] = useState(0);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const { user } = useContext(AuthContext);
  const [editingReviewId, setEditingReviewId] = useState(null);
 

  useEffect(() => {
    if (user) {
      fetchAllReviews();
    }
  }, [user]);

  const fetchAllReviews = async () => {
    try {
      const { data } = await axiosSecure.get(`/reviews/${user?.email}`);
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };


 // Open update form inside card
 const startEditing = (review) => {
  setEditingReviewId(review._id);
  setUpdatedRating(review.rating);
  setUpdatedDescription(review.description);
};

// Update Review
const handleUpdateReview = async (reviewId) => {
  try {
    const updatedReview = { rating: updatedRating, description: updatedDescription };
    await axios.put(`/reviews/${reviewId}`, updatedReview);

    // Update state to reflect changes
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === reviewId ? { ...review, rating: updatedRating, description: updatedDescription } : review
      )
    );

    toast.success("Review updated successfully!");
    setEditingReviewId(null);  
  } catch (error) {
    console.error("Error updating review:", error);
    toast.error("Failed to update review.");
  }
};

 // Delete functionality
 const handleDelete = async (id) => {
  
     

  try {
    const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}/review/${id}`);
    console.log(data);

    toast.success('Review deleted successfully!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // Remove the deleted  Review from the state
    setReviews(reviews.filter(review => review._id !== id));
  } catch (err) {
    console.log(err);
    alert('There was an error deleting the review.');
  }
};
const hotToast = (id) => {
toast(
  (t) => (
    <div className='flex gap-3 items-center'>
       <div className=""><p>Are you <b>sure?</b></p></div>
       <div className='gap-2 flex'> 
       <button 
       className='bg-red-400 text-white px-3 py-1 rounded-md'
       onClick={() =>  {
         toast.dismiss(t.id)
        handleDelete(id)
        }}>Yes</button>
        <button
        className='bg-green-400 text-white px-3 py-1 rounded-md'
         onClick={() => toast.dismiss(t.id)}>Cancel</button>
       </div>
       
    </div>
  )
 
);
}

  return (
    <div className="my-reviews">
      <div className="mt-5 ml-7 grid grid-cols-2 mb-2 gap-4">
        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((review) => {
            const { _id, description, rating, buyer, title, createdAt } = review || {};
            return (
              <div key={_id} className="card bg-red-100 w-96 shadow-xl">
                <div className="card-body">
                  <img className="w-16 h-16 rounded-full" src={buyer?.photo} alt={buyer?.name} />
                  <p>{buyer?.name}</p>
                  <p>Title: {title}</p>
                  <p>Date: {format(new Date( ), 'P')}</p>
                  <div className="form-control mb-3">
                    <label className="label">
                      <span className="label-text">Rating:</span>
                    </label>
                    <ReactRating
                      emptySymbol={<FaRegStar />}
                      fullSymbol={<FaStar />}
                      halfSymbol={<FaStarHalfAlt />}
                      initialRating={rating}
                      fractions={2}
                      readonly
                    />
                  </div>
                  <p>Description: {description}</p>

                   <div className="gap-5 space-x-5">
                    {/* Update Button */}
                  <button onClick={() => startEditing(review)} >    <FaEdit /> </button>

{/* Delete Button */}
<button onClick={() => hotToast(review._id)} ><FaTrash /> </button>
                   </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal for Updating Review */}
      {selectedReview && (
        <Modal
          isOpen={true}
          onRequestClose={closeModal}
          contentLabel="Update Review"
        >
          <h2>Update Review</h2>
          <div className="form-group">
            <label>Rating</label>
            <ReactRating
              initialRating={updatedRating}
              onChange={(newRating) => setUpdatedRating(newRating)}
              emptySymbol={<FaRegStar />}
              fullSymbol={<FaStar />}
              halfSymbol={<FaStarHalfAlt />}
              fractions={2}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
              rows="4"
              className="form-control"
            />
          </div>

          <button className="btn btn-success" onClick={() => handleUpdateReview(selectedReview._id)}>
            Save Changes
          </button>
          <button className="btn btn-secondary" onClick={closeModal}>
            Close
          </button>
        </Modal>
      )}
          <ToastContainer/>
    </div>
       
  );
};

export default MyReviews;
