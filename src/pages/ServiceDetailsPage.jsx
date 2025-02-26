import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardHeader, CardFooter, Button, Textarea } from "@material-tailwind/react";
import ReactRating from "react-rating";
import { FaEdit, FaRegStar, FaStar, FaStarHalfAlt, FaTrashAlt } from "react-icons/fa";
import AuthContext from "../context/AuthContext/AuthContext";
import axios from "axios";
import Details from "./Details";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ServiceDetailsPage = () => {
  const { serviceId } = useParams(); // Get service ID from URL
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    description: "",
    rating: 0,
  });

  const API_URL = import.meta.env.VITE_API_URL; // Correct API URL

  // Fetch reviews only for this specific service
  useEffect(() => {
    axios
      .get(`${API_URL}/reviews?serviceId=${serviceId}`) // Corrected URL
      .then((res) => setReviews(res.data))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [serviceId]);

  // Delete functionality
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API_URL}/review/${id}`); // Corrected URL
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
      // Remove the deleted Review from the state
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
              onClick={() => {
                toast.dismiss(t.id);
                handleDelete(id);
              }}>
              Yes
            </button>
            <button
              className='bg-green-400 text-white px-3 py-1 rounded-md'
              onClick={() => toast.dismiss(t.id)}>
              Cancel
            </button>
          </div>
        </div>
      )
    );
  };

   // Handle new review submission
   const handleReviewSubmit = async () => {
    if (!newReview.description || newReview.rating === 0) {
      alert("Please enter a review and rating.");
      return;
    }

    const reviewData = {
      serviceId,
      userId: user?.uid,
      userName: user?.displayName,
      userPhoto: user?.photoURL,
      description: newReview.description,
      rating: newReview.rating,
      createdAt: new Date(),
    };

    try {
      await axios.post(`${API_URL}/reviews`, reviewData);
      setNewReview({ description: "", rating: 0 }); // Reset form

      // Fetch updated reviews
      axios.get(`${API_URL}/reviews?serviceId=${serviceId}`).then((res) => {
        setReviews(res.data);
      });
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Service Details */}
      <Details />

      {/* Total Review Count */}
      <h3 className="text-lg font-bold mb-4">Total Reviews: {reviews.length}</h3>

      {/* Add Review Form */}
      {user && (
        <Card className="p-4 my-4">
          <CardBody>
            <h4 className="text-lg font-bold">Add Your Review</h4>
            <ReactRating
              emptySymbol={<FaRegStar />}
              fullSymbol={<FaStar />}
              halfSymbol={<FaStarHalfAlt />}
              initialRating={newReview.rating}
              onChange={(value) => setNewReview({ ...newReview, rating: value })}
              className="mt-2"
            />
            <Textarea
              placeholder="Write your review..."
              value={newReview.description}
              onChange={(e) => setNewReview({ ...newReview, description: e.target.value })}
              className="mt-2"
            />
          </CardBody>
          <CardFooter>
            <Button className="text-black" color="blue" onClick={handleReviewSubmit}>
              Submit Review
            </Button>
          </CardFooter>
        </Card>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <Card key={review._id} className="p-4 my-2">
            <CardBody>
              <div className="flex items-center">
                <img src={review.userPhoto} alt={review.userName} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h5 className="font-bold">{review.userName}</h5>
                  <ReactRating
                    emptySymbol={<FaRegStar />}
                    fullSymbol={<FaStar />}
                    halfSymbol={<FaStarHalfAlt />}
                    initialRating={review.rating}
                    readonly
                  />
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="mt-2">{review.description}</p>
            </CardBody>
            <div className="space-x-5">
              {/* Update Review Button */}
              <button className="text-black ml-4">
                <FaEdit />
              </button>
              {/* Delete Review Button */}
              <button onClick={() => hotToast(review._id)} className="text-black">
                <FaTrashAlt />
              </button>
            </div>
          </Card>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default ServiceDetailsPage;
