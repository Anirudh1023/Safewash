import { cn } from "@/lib/utils";
import { Marquee } from "./marquee";
import { BackgroundLines } from "./background-lines";

const reviews = [
  {
    name: "Rachana Reddy",
    username: "Business Owner",
    body: "Unmatched convenience and quality with a seamless pick-up and delivery service.",
    rating: 5,
  },
  {
    name: "Vinay Kumar",
    username: "IT Professional",
    body: "Professional, quick turnaround, and consistently fresh, perfectly pressed results.",
    rating: 4,
  },
  {
    name: "Pravallika",
    username: "Engineer",
    body: "Dependable and straightforward service that has never disappointed over the years.",
    rating: 5,
  },
  {
    name: "Aishwarya",
    username: "IT Professional",
    body: "Convenient dry cleaning with pick-up, delivery, fair pricing, and satisfying results.",
    rating: 4,
  },
  {
    name: "Gowtham",
    username: "Doctor",
    body: "Reliable, consistent cleaning with on-time delivery for everyday laundry needs.",
    rating: 5,
  },
  {
    name: "Niveditha",
    username: "Designer",
    body: "Great service with careful handling of delicate fabrics and a professional approach",
    rating: 4,
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  name,
  username,
  body,
  rating,
}: {
  name: string;
  username: string;
  body: string;
  rating: number;
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={i < rating ? "text-yellow-500" : "text-gray-300"}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <figure
      className={cn(
        "relative w-[300px] h-[160px] cursor-pointer overflow-hidden rounded-xl border p-6", // Increased size of the card
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="absolute top-2 left-2 flex flex-col">
        <figcaption className="text-lg font-bold dark:text-white pl-3">
          {name}
        </figcaption>
        <p className="text-sm font-medium dark:text-white/60 pl-3">
          {username}
        </p>
      </div>
      <blockquote className="mt-8 text-base pt-4">{body}</blockquote>
      <div className="absolute top-2 right-2 flex pr-3">
        {renderStars(rating)}
      </div>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
      {/* Heading and Sub-heading */}
      <div className="relative top-10 text-center w-full mb-10">
        <h2 className="text-3xl font-bold  text-neutral-600 dark:text-neutral-600">
          TESTIMONIALS
        </h2>
        <p className="text-lg font-medium text-gray-500 dark:text-gray-300 py-5">
          Customer Experiences That Speak for Themselves!
        </p>
      </div>

      {/* Marquee */}
      <BackgroundLines>
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
      </BackgroundLines>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}
