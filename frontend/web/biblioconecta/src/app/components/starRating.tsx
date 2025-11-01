import { useState } from "react";

interface StarRatingProps {
  totalStars?: number;
}

export default function StarRating({ totalStars = 5 }: StarRatingProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-1">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        return (
          <button
            key={index}
            type="button"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
            className="text-2xl transition"
          >
            <span
              className={
                starValue <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            >
              ★
            </span>
          </button>
        );
      })}
    </div>
  );
}
