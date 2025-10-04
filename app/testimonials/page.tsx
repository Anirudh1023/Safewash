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
          className={i < rating ? "text-[#65A006]" : "text-gray-300"}
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
        "relative w-[320px] h-[180px] cursor-pointer overflow-hidden rounded-2xl p-6",
        "bg-white/70 backdrop-blur-xl",
        "border-2 border-dashed border-[#65A006]/30",
        "transition-all duration-300",
        "hover:bg-white/90 hover:border-[#65A006]/60",
        "hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#65A006]/30"
      )}
    >
      <div className="flex flex-col gap-2 mb-3">
        <div className="flex items-center justify-between">
          <figcaption className="text-lg font-bold text-gray-800">
            {name}
          </figcaption>
          <div className="flex">
            {renderStars(rating)}
          </div>
        </div>
        <p className="text-sm font-medium text-gray-600">
          {username}
        </p>
      </div>
      <blockquote className="text-sm text-gray-700 leading-relaxed">
        {body}
      </blockquote>
    </figure>
  );
};

export default function Testimonials() {
  return (
    <div
      id="testimonials"
      className="relative w-full min-h-[800px] flex items-center justify-center overflow-hidden bg-white py-24 px-4 md:px-8 lg:px-16"
    >
      {/* Large glassomorphic container card */}
      <div className="relative w-full max-w-[1600px] min-h-[700px] rounded-3xl border-2 border-dashed border-[#65A006]/40 bg-gradient-to-b from-white/50 via-[#E8F5E9] via-[#C8E6C9] to-white/50 backdrop-blur-sm p-8 md:p-12 lg:p-16 overflow-hidden">

        {/* Background Lines Effect (Confetti) */}
        <BackgroundLines className="absolute inset-0">
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">

            {/* Heading and Sub-heading */}
            <div className="text-center w-full mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#65A006] mb-4">
                BEST SERVICE GUARANTEED
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
                Customer Experiences That Speak for Themselves!
              </p>
            </div>

            {/* Marquee */}
            <div className="relative w-full">
              <Marquee pauseOnHover className="[--duration:30s]">
                {firstRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:30s] mt-4">
                {secondRow.map((review) => (
                  <ReviewCard key={review.username} {...review} />
                ))}
              </Marquee>

              {/* Gradient fade edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white via-white/50 to-transparent z-20"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white via-white/50 to-transparent z-20"></div>
            </div>
          </div>
        </BackgroundLines>
      </div>
    </div>
  );
}
