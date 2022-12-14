import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { updateEvent } from "../../actions/events";

const Card = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const handleDisenroll = () => {
    props.event.participants.map((p) =>
      p.id === user.result._id ? props.event.participants.remove(p) : null
    );
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = user.result._id;
  //handling the registering function
  const handleRegister = () => {
    const response = window.confirm(
      "Are you sure you want to register to the event?"
    );
    if (response) {
      props.event.participants.push(userId);
      dispatch(updateEvent(props.event._id, props.event));
      navigate("/dashboard");
    }
  };

  console.log(props.event);
  return (
    <div class="max-w-sm  bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          class="rounded-t-lg oject-cover w-full h-48  "
          src={props.image}
          alt=""
        />
      </a>
      <div class="p-5  ">
        <a href="#">
          <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden">
            {props.title}
          </h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400 overflow-hidden">
          {props.details.toString().substring(0, 150)}
        </p>
        {props.isEvent ? (
          <>
            <p class="text-bold">
              Participants:{props.event.participants.length}{" "}
              <a class="underline text-blue-600">See Details</a>
            </p>
          </>
        ) : (
          <></>
        )}
        <Link
          to="/clubs/explore"
          state={{ event: props.event }}
          class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100 "
        >
          Explore
          <svg
            aria-hidden="true"
            class="ml-2 -mr-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </Link>
        {props.isEvent && !props.isOrganizer && !props.isReg ? (
          <button
            onClick={handleRegister}
            class="fixedt bottom-0 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 float-right"
          >
            Register
          </button>
        ) : props.isEvent ? (
          <Link
            onClick={handleDisenroll}
            class="fixedt bottom-0 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 float-right"
          >
            Disenroll
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
