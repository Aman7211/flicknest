import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import "./CircleRating.scss";

const CircleRating = ({ rating }) => {
    return (
        <div className="circleRating">
            <CircularProgressbar  // it is a imported component which is used to make green circle in CircleRating div
                value={rating}
                maxValue={10}  // if it is not used then maxvalue is considered at 100
                text={rating}   
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green", //setting colour based on rating value
                })}
            />
        </div>
    );
};

export default CircleRating;