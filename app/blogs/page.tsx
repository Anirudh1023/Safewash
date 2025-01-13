import React from "react";
import { Carousel, Card } from "./carousel";
import blog1 from "./a-watch-and-pinstripe-suit.jpg";
import blog2 from "./mobile-phone-recording-person-doing-laundry.jpg";
import blog3 from "./white-doors-and-curtains-let-in-light-for-houseplants.jpg";
import blog4 from "./suitcase.jpg";
import blog5 from "./washing.jpg";
import blog6 from "./leather-jacket.jpg";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";

export default function Blogs() {
  const cards = data
    .filter((card) => card !== undefined)
    .map((card, index) => <Card key={index} card={card} index={index} />);

  return (
    <div
      id="blogs"
      className="min-h-screen bg-white dark:bg-neutral-950 pt-10 relative overflow-hidden px-10"
    >
      {/* Content Layer */}
      <div className="relative z-10 w-full">
        {/* Title in centered container */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
            Our Latest Blogs
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-5">
            Click on the card to know more
          </p>
        </div>

        {/* Full-width carousel */}
        <div className="w-full">
          <Carousel items={cards} />
        </div>
      </div>
    </div>
  );
}

// Rest of your existing components remain the same
const BlogContent = ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  return (
    <div className="prose dark:prose-invert max-w-none">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">
        {content.split("\n\n").map((paragraph, idx) => (
          <p key={idx} className="text-gray-600 dark:text-gray-300">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
};

const BlogPost1 = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="prose prose-lg text-gray-700">
        <p>
          When it comes to caring for your clothes, you might have wondered:
          what's the difference between laundry and dry cleaning? Although both
          processes are designed to clean garments, they differ significantly in
          terms of methods, benefits, and ideal applications. Let's break it
          down so you can make the best choice for your wardrobe.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Laundry: Water-Based Cleaning
        </h2>
        <p>
          Laundry involves washing clothes using water and detergent. This
          method is suitable for everyday clothing made from durable fabrics
          like cotton, polyester, and denim. The process typically includes:
        </p>

        <ul className="list-inside list-disc mb-4">
          <li>
            <strong>Washing:</strong> Clothes are soaked in water with detergent
            to remove dirt, stains, and odors.
          </li>
          <li>
            <strong>Rinsing:</strong> Garments are rinsed to remove soap and
            residue.
          </li>
          <li>
            <strong>Drying:</strong> Clothes are either air-dried or placed in a
            tumble dryer.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">
          Advantages of Laundry:
        </h3>
        <ul className="list-inside list-disc mb-4">
          <li>Affordable and widely accessible.</li>
          <li>Effective for sweat, dirt, and water-based stains.</li>
          <li>
            Gentle options like hand washing or delicate cycles are available
            for fragile items.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">
          Limitations of Laundry:
        </h3>
        <ul className="list-inside list-disc mb-4">
          <li>
            Water can shrink or damage delicate fabrics like silk, wool, or
            rayon.
          </li>
          <li>Not ideal for heavy stains like grease or oil.</li>
          <li>Colors may fade over time with frequent washing.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Dry Cleaning: A Specialized Approach
        </h2>
        <p>
          Dry cleaning uses a solvent instead of water to clean clothes. The
          most common solvent used is perchloroethylene (or "perc"), though
          eco-friendly alternatives are also available. The dry cleaning process
          involves:
        </p>

        <ul className="list-inside list-disc mb-4">
          <li>
            <strong>Inspection and Pre-Treatment:</strong> Stains are identified
            and treated before cleaning.
          </li>
          <li>
            <strong>Cleaning:</strong> Garments are placed in a specialized
            machine with solvent, which removes dirt and stains without water.
          </li>
          <li>
            <strong>Finishing:</strong> Clothes are pressed, steamed, or ironed
            to restore their shape and appearance.
          </li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">
          Advantages of Dry Cleaning:
        </h3>
        <ul className="list-inside list-disc mb-4">
          <li>Gentle on delicate fabrics like silk, wool, and leather.</li>
          <li>
            Effective for oil-based stains and preserving garment structure.
          </li>
          <li>Prevents shrinking, fading, and distortion.</li>
        </ul>

        <h3 className="text-xl font-semibold text-gray-800">
          Limitations of Dry Cleaning:
        </h3>
        <ul className="list-inside list-disc mb-4">
          <li>More expensive than traditional laundry.</li>
          <li>
            Involves the use of chemicals, though many cleaners offer
            eco-friendly options.
          </li>
          <li>Not necessary for most casual or everyday clothing.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Which Method is Right for Your Clothes?
        </h2>
        <p>
          The choice between laundry and dry cleaning depends on the fabric and
          the type of stain or dirt:
        </p>

        <ul className="list-inside list-disc mb-4">
          <li>
            <strong>Laundry</strong> is ideal for everyday wear like t-shirts,
            jeans, and activewear.
          </li>
          <li>
            <strong>Dry Cleaning</strong> is better suited for delicate,
            structured, or specialty items like suits, dresses, and outerwear.
          </li>
        </ul>

        <p>
          Understanding the difference between laundry and dry cleaning can help
          you keep your clothes looking their best for longer. For everyday
          clothing, laundry is cost-effective and efficient. For delicate or
          high-value garments, dry cleaning ensures proper care and
          preservation.
        </p>

        <p className="mt-6">
          At Safewash, we offer both services to cater to all your clothing care
          needs. Contact us today to learn more or schedule a service!
        </p>
        <div className="mt-8">
          <InteractiveHoverButton buttonText="Schedule a free pickup" />
        </div>
      </div>
    </div>
  );
};

const BlogPost2 = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Debunking Common Dry Cleaning Myths
      </h1>

      <div className="prose prose-lg text-gray-700">
        <p>
          Dry cleaning is an essential service for maintaining and preserving
          your delicate and high-quality garments. However, despite its
          importance, many misconceptions about dry cleaning persist. These
          myths often discourage people from using the service or lead to
          unrealistic expectations. Let's debunk four common dry cleaning myths
          and uncover the truth.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Myth 1: Dry Cleaning Shrinks Your Clothes
        </h2>
        <p>
          One of the most widespread myths is that dry cleaning shrinks
          garments. In reality, shrinkage is more likely to occur with improper
          laundering techniques using water and high heat. Dry cleaning uses
          specialized solvents instead of water, which are gentle on fabrics and
          do not cause shrinking. Professional cleaners also take great care to
          follow the care label instructions to prevent any damage.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Myth 2: Dry Cleaning is Only for Fancy Clothes
        </h2>
        <p>
          While it's true that dry cleaning is ideal for delicate fabrics like
          silk, wool, and cashmere, it's not just for high-end or formal attire.
          Everyday items such as workwear, coats, and even household textiles
          like curtains can benefit from dry cleaning. If your garments have
          tough stains, are made from sensitive materials, or require
          professional care, dry cleaning is a practical solution.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Myth 3: All Stains Can Be Removed by Dry Cleaning
        </h2>
        <p>
          Although dry cleaning is effective for many types of stains, it's not
          a magic fix for every stain. The success of stain removal depends on
          several factors, including the type of stain, the fabric, and how
          quickly the stain is treated. For example, some water-based stains may
          require pre-treatment, while older or set-in stains may be harder to
          remove. Professional cleaners do their best, but timely attention to
          stains is always the best approach.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Myth 4: Dry Cleaning Uses Harsh Chemicals That Harm Clothes
        </h2>
        <p>
          Traditional dry cleaning uses a solvent called perchloroethylene
          ("perc"), which some people believe is harsh on fabrics. However, when
          handled professionally, perc is safe and effective. Additionally, many
          modern dry cleaners now offer eco-friendly alternatives, such as
          hydrocarbon or liquid CO2 cleaning, which are gentle on clothes and
          better for the environment. Always ask your cleaner about the methods
          they use if you're concerned.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Conclusion
        </h2>
        <p>
          Dry cleaning is a reliable and effective method for maintaining your
          garments, but misconceptions can cloud its reputation. Understanding
          the truth behind these myths can help you make informed decisions
          about your clothing care. Whether you need to remove stubborn stains,
          care for delicate fabrics, or simply keep your clothes looking their
          best, dry cleaning can be a valuable part of your routine.
        </p>

        <p className="mt-6">
          At Safewash, we're here to answer your questions and provide
          professional, high-quality dry cleaning services. Contact us today to
          learn more or experience the difference for yourself!
        </p>
        <div className="mt-8">
          <InteractiveHoverButton buttonText="Schedule a free pickup" />
        </div>
      </div>
    </div>
  );
};

const BlogPost3 = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        How Often Should You Clean Your Curtains and Carpets?
      </h1>

      <div className="prose prose-lg text-gray-700">
        <p>
          Curtains and carpets play a vital role in creating a cozy and
          welcoming atmosphere in your home. However, they often go unnoticed
          when it comes to cleaning routines. Regular maintenance of these items
          is essential not just for their longevity but also for maintaining a
          healthy living environment. So, how often should you clean your
          curtains and carpets? Let's break it down.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Curtains: A Dust Magnet You Shouldn't Ignore
        </h2>
        <p>
          Curtains can accumulate dust, allergens, and even odors over time.
          Factors like indoor air quality, the presence of pets, and proximity
          to busy streets can influence how quickly they get dirty.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
          General Cleaning Guidelines
        </h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Light Dusting and Vacuuming:</strong> Weekly or bi-weekly
            dusting with a vacuum cleaner attachment helps prevent the buildup
            of dust and allergens.
          </li>
          <li>
            <strong>Deep Cleaning:</strong> Curtains should be deep cleaned at
            least every 6-12 months. However, if you live in a high-traffic
            area, have allergies, or smoke indoors, consider cleaning them more
            frequently.
          </li>
          <li>
            <strong>Special Cases:</strong> For delicate fabrics like silk or
            velvet, dry cleaning is recommended to avoid damage.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Carpets: A Hub for Dirt and Germs
        </h2>
        <p>
          Carpets endure a lot of wear and tear, from muddy shoes to accidental
          spills. They're also home to dust mites, bacteria, and allergens if
          not cleaned regularly.
        </p>

        <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
          General Cleaning Guidelines
        </h3>
        <ul className="list-disc pl-6">
          <li>
            <strong>Vacuuming:</strong> Carpets should be vacuumed at least once
            a week, or more frequently in high-traffic areas or if you have
            pets.
          </li>
          <li>
            <strong>Spot Cleaning:</strong> Address spills and stains
            immediately to prevent them from setting in.
          </li>
          <li>
            <strong>Professional Cleaning:</strong> It's recommended to have
            your carpets professionally cleaned every 12-18 months. Homes with
            pets, young children, or allergy sufferers may require cleaning
            every 6-12 months.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Why Regular Cleaning Matters
        </h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Improved Air Quality:</strong> Curtains and carpets can trap
            dust, allergens, and odors, which may affect your indoor air
            quality.
          </li>
          <li>
            <strong>Longevity:</strong> Regular maintenance prevents dirt and
            grime from breaking down fabric and carpet fibers.
          </li>
          <li>
            <strong>Aesthetic Appeal:</strong> Clean curtains and carpets
            enhance the overall appearance of your home.
          </li>
          <li>
            <strong>Health Benefits:</strong> Routine cleaning reduces allergens
            and bacteria, promoting a healthier living space.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-2">
          Tips for Effective Cleaning
        </h2>
        <ul className="list-disc pl-6">
          <li>
            <strong>Follow Care Labels:</strong> Always check the care
            instructions on your curtains and carpets to avoid damage during
            cleaning.
          </li>
          <li>
            <strong>Use the Right Tools:</strong> For vacuuming, use attachments
            designed for fabrics or carpets to ensure thorough cleaning.
          </li>
          <li>
            <strong>Schedule Professional Cleaning:</strong> Professional
            services can handle deep stains and delicate materials with care,
            giving you peace of mind.
          </li>
        </ul>

        <p className="mt-6">
          Curtains and carpets are often overlooked but essential parts of home
          maintenance. By following these cleaning guidelines, you can keep them
          looking fresh and ensure a healthier home environment. If it's been a
          while since your last deep clean, now is the perfect time to schedule
          a professional service.
        </p>

        <p className="mt-6">
          At Safewash, we specialize in curtain and carpet cleaning, using safe
          and effective methods to rejuvenate your home. Contact us today to
          learn more or book a service!
        </p>
        <div className="mt-8">
          <InteractiveHoverButton buttonText="Schedule a free pickup" />
        </div>
      </div>
    </div>
  );
};

const BlogPost4 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-gray-700 mb-6">
        Leather is a timeless material that adds elegance and durability to your
        wardrobe and home. However, keeping leather clean and well-maintained
        can be challenging. At{" "}
        <strong>Safewash Drycleaners in Hyderabad</strong>, we specialize in
        cleaning and caring for leather items. Follow this guide to clean your
        leather effectively and extend its life.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Why Proper Leather Cleaning Matters
      </h2>
      <p className="text-gray-700 mb-6">
        Leather is a natural material prone to drying, cracking, and
        discoloration if not cared for properly. With Hyderabad’s humid climate,
        regular cleaning is essential to protect your leather items from
        moisture and dirt damage.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        What You’ll Need
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>Microfiber cloths</li>
        <li>Mild soap (e.g., baby soap or saddle soap)</li>
        <li>White vinegar</li>
        <li>Leather conditioner</li>
        <li>Soft brush</li>
        <li>Lukewarm water</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Step-by-Step Guide to Cleaning Leather
      </h2>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        1. Dust and Wipe
      </h3>
      <p className="text-gray-700 mb-4">
        Use a dry microfiber cloth to remove loose dust and debris from the
        leather surface. Avoid using abrasive materials that can scratch the
        leather.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        2. Prepare a Cleaning Solution
      </h3>
      <p className="text-gray-700 mb-4">
        Mix lukewarm water with a few drops of mild soap. Alternatively, mix
        equal parts white vinegar and water for natural cleaning. Test the
        solution on a small, inconspicuous area to ensure it doesn’t discolor
        the leather.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        3. Gently Clean the Surface
      </h3>
      <p className="text-gray-700 mb-4">
        Dip a microfiber cloth into the cleaning solution and wring it out. Wipe
        the leather gently in circular motions to lift dirt and grime. Avoid
        soaking the leather, as excess moisture can damage it.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        4. Dry Thoroughly
      </h3>
      <p className="text-gray-700 mb-4">
        Use a dry microfiber cloth to remove any remaining moisture. Let the
        leather air dry completely away from direct sunlight or heat sources.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        5. Condition the Leather
      </h3>
      <p className="text-gray-700 mb-6">
        Apply a small amount of leather conditioner using a clean cloth. This
        helps restore the leather’s natural oils and prevent cracking. Buff the
        surface with a soft cloth to give it a polished finish.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Cleaning Tips for Specific Leather Items
      </h2>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Leather Jackets
      </h3>
      <p className="text-gray-700 mb-4">
        Spot-clean stains immediately using a damp cloth and mild soap. For deep
        cleaning, trust professional services like{" "}
        <strong>Safewash Drycleaners</strong>.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Leather Bags and Shoes
      </h3>
      <p className="text-gray-700 mb-4">
        Stuff bags with paper while cleaning to maintain their shape. Use a soft
        brush for cleaning leather shoes, especially in hard-to-reach areas.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Leather Furniture
      </h3>
      <p className="text-gray-700 mb-6">
        Vacuum with a soft brush attachment before cleaning. Wipe spills
        immediately to prevent staining.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        How to Protect Leather from Hyderabad’s Climate
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>
          <strong>Keep It Dry:</strong> Use a leather protectant spray to shield
          against humidity and water.
        </li>
        <li>
          <strong>Avoid Sun Exposure:</strong> Direct sunlight can fade and dry
          out leather.
        </li>
        <li>
          <strong>Store Properly:</strong> Store leather items in a cool,
          ventilated space using breathable covers.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Why Choose Safewash Drycleaners in Hyderabad?
      </h2>
      <p className="text-gray-700 mb-6">
        At <strong>Safewash Drycleaners</strong>, we offer specialized cleaning
        services for all types of leather garments and accessories. Our expert
        team uses safe, effective techniques to restore and maintain your
        leather items.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Call to Action
      </h2>
      <p className="text-gray-700 mb-6">
        Don’t let dirt and stains ruin your leather! Visit{" "}
        <strong>Safewash Drycleaners in Hyderabad</strong> for professional
        cleaning and maintenance services. Contact us today to keep your leather
        looking as good as new.
      </p>
      <div className="mt-8">
        <InteractiveHoverButton buttonText="Schedule a free pickup" />
      </div>
    </div>
  );
};

const BlogPost5 = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <p className="text-gray-700 mb-6">
        Color bleeding can turn laundry day into a nightmare, leaving your
        favorite clothes stained and discolored. Don’t worry! At{" "}
        <strong>Safewash Drycleaners in Hyderabad</strong>, we’re here to help
        you tackle these stubborn stains. Follow this step-by-step guide to
        restore your clothes and keep them looking fresh.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        What is Color Bleeding?
      </h2>
      <p className="text-gray-700 mb-6">
        Color bleeding occurs when loose dyes from one garment transfer to
        others during washing. This often happens when clothes are washed in hot
        water or mixed with contrasting colors. But fear not—most stains can be
        removed with the right approach.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        What You’ll Need
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>White vinegar</li>
        <li>Baking soda</li>
        <li>Oxygen bleach (non-chlorine)</li>
        <li>Mild detergent</li>
        <li>A large basin or sink</li>
        <li>Cold water</li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Steps to Remove Color Bleeding Stains
      </h2>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        1. Act Quickly
      </h3>
      <p className="text-gray-700 mb-4">
        Time is critical. Address stains as soon as possible. Avoid drying the
        stained clothes, as heat can set the dye permanently.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        2. Rinse with Cold Water
      </h3>
      <p className="text-gray-700 mb-4">
        Immediately rinse the stained garment under cold water to flush out
        loose dye. Do not use hot water, which may worsen the stain.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        3. Soak in a Vinegar Solution
      </h3>
      <p className="text-gray-700 mb-4">
        1. Fill a basin with cold water. <br />
        2. Add 1 cup of white vinegar and 1 tablespoon of mild detergent. <br />
        3. Submerge the garment and let it soak for 30-60 minutes. <br />
        4. Rinse thoroughly.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        4. Apply Baking Soda for Stubborn Stains
      </h3>
      <p className="text-gray-700 mb-4">
        1. Mix baking soda with water to form a paste. <br />
        2. Apply the paste directly to the stain and gently rub it in. <br />
        3. Let it sit for 15 minutes before rinsing.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        5. Use Oxygen Bleach
      </h3>
      <p className="text-gray-700 mb-4">
        1. Dissolve oxygen bleach in lukewarm water (check the product label for
        measurements). <br />
        2. Soak the garment for 1-6 hours, depending on the severity of the
        stain. <br />
        3. Rinse and inspect the garment.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        6. Try a Commercial Color Remover
      </h3>
      <p className="text-gray-700 mb-4">
        For tough stains, use a color remover as directed. Note: This may alter
        the garment’s original color, so test on a small area first.
      </p>

      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        7. Wash as Usual
      </h3>
      <p className="text-gray-700 mb-6">
        After treatment, wash the garment with a mild detergent in cold water.
        Check if the stain is gone before drying. Repeat the process if
        necessary.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        How to Prevent Color Bleeding
      </h2>
      <ul className="list-disc list-inside text-gray-700 mb-6">
        <li>
          <strong>Sort Your Laundry:</strong> Separate clothes by color groups
          (whites, darks, and brights).
        </li>
        <li>
          <strong>Wash New Clothes Separately:</strong> New garments often bleed
          during the first few washes.
        </li>
        <li>
          <strong>Use Cold Water:</strong> Washing in cold water reduces the
          risk of dye transfer.
        </li>
        <li>
          <strong>Try Color Catcher Sheets:</strong> These absorb loose dye
          during washing.
        </li>
        <li>
          <strong>Set the Dye:</strong> Before washing brightly colored clothes,
          soak them in a mixture of water and white vinegar (1 cup per gallon of
          water) to help set the dye.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Why Choose Safewash Drycleaners in Hyderabad?
      </h2>
      <p className="text-gray-700 mb-6">
        At <strong>Safewash Drycleaners</strong>, we specialize in handling
        delicate garments and removing stubborn stains, including color
        bleeding. Our professional services ensure your clothes are treated with
        care and restored to their original brilliance.
      </p>

      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Call to Action
      </h2>
      <p className="text-gray-700 mb-6">
        Struggling with color bleeding stains? Trust{" "}
        <strong>Safewash Drycleaners in Hyderabad</strong> to save your
        garments. Contact us today or visit our store for expert stain removal
        and premium laundry care.
      </p>
      <div className="mt-8">
        <InteractiveHoverButton buttonText="Schedule a free pickup" />
      </div>
    </div>
  );
};

const BlogPost6 = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <p className="text-xl text-gray-600 mt-4">
          From Safewash Drycleaners in Hyderabad
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Why Leather Jacket Care is Important
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          Leather is a natural material that can dry out, crack, or fade if
          neglected. With Hyderabad's varying weather conditions, from scorching
          heat to humid monsoons, maintaining your leather jacket becomes even
          more crucial. Follow these essential tips to protect your prized
          possession.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          1. Clean Regularly and Gently
        </h3>
        <div className="mt-4">
          <h4 className="text-xl font-semibold text-gray-800">Dust and Wipe</h4>
          <ul className="list-disc ml-6 text-lg text-gray-700 mt-2">
            <li>
              Use a soft microfiber cloth to remove dust and surface dirt.
            </li>
            <li>
              For deeper cleaning, dampen the cloth with water and a drop of
              mild soap (like baby soap).
            </li>
            <li>
              Avoid soaking the leather, as excess moisture can damage it.
            </li>
          </ul>
          <p className="mt-4 text-lg text-gray-700">
            <strong>Pro Tip:</strong> If you’re unsure about cleaning it
            yourself, bring your jacket to{" "}
            <strong>Safewash Drycleaners in Hyderabad</strong> for expert care.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          2. Condition to Prevent Cracking
        </h3>
        <p className="text-lg text-gray-700 mt-4">
          Leather needs conditioning to retain its softness and prevent
          cracking. Apply a high-quality leather conditioner every 3-6 months:
        </p>
        <ul className="list-disc ml-6 text-lg text-gray-700 mt-2">
          <li>
            Use a clean, soft cloth to apply a small amount of conditioner in
            circular motions.
          </li>
          <li>Let it absorb fully before buffing it with a dry cloth.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          3. Store Your Jacket Properly
        </h3>
        <ul className="list-disc ml-6 text-lg text-gray-700 mt-2">
          <li>
            <strong>Hang It Right:</strong> Use a padded hanger to maintain the
            jacket's shape.
          </li>
          <li>
            <strong>Avoid Direct Sunlight:</strong> Prolonged exposure can fade
            the leather.
          </li>
          <li>
            <strong>Use a Breathable Cover:</strong> Store your jacket in a
            fabric garment bag to prevent dust buildup while allowing air
            circulation.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          4. Protect Against Hyderabad’s Weather
        </h3>
        <p className="text-lg text-gray-700 mt-4">
          Leather is not waterproof, so avoid wearing your jacket in heavy rain.
          Use a leather protectant spray to add water resistance:
        </p>
        <ol className="list-decimal ml-6 text-lg text-gray-700 mt-2">
          <li>Spray evenly before wearing.</li>
          <li>Reapply periodically, especially during monsoon season.</li>
        </ol>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          5. Handle Stains Promptly
        </h3>
        <h4 className="text-xl font-semibold text-gray-800 mt-4">
          Oil or Grease Stains
        </h4>
        <p className="text-lg text-gray-700 mt-2">
          Sprinkle cornstarch or baking soda on the stain and let it sit
          overnight. Brush it off gently in the morning.
        </p>
        <h4 className="text-xl font-semibold text-gray-800 mt-4">Ink Stains</h4>
        <p className="text-lg text-gray-700 mt-2">
          Dab with a cotton swab soaked in rubbing alcohol, but always test on
          an inconspicuous area first.
        </p>
        <p className="mt-4 text-lg text-gray-700">
          For stubborn stains, trust <strong>Safewash Drycleaners</strong> to
          restore your jacket safely.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          6. Avoid Heat and Harsh Chemicals
        </h3>
        <ul className="list-disc ml-6 text-lg text-gray-700 mt-2">
          <li>
            Never use direct heat (e.g., blow dryers) to dry wet leather.
            Instead, blot with a towel and let it air dry.
          </li>
          <li>
            Avoid using alcohol-based cleaners or household detergents, as they
            can strip the leather's natural oils.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          7. Rotate Usage
        </h3>
        <p className="text-lg text-gray-700 mt-4">
          Wearing your jacket daily can lead to uneven wear and tear. Rotate it
          with other outerwear to give it a break.
        </p>
      </section>

      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          8. Opt for Professional Cleaning Services
        </h3>
        <p className="text-lg text-gray-700 mt-4">
          For deep cleaning or repairs, rely on a professional leather cleaning
          service like <strong>Safewash Drycleaners in Hyderabad</strong>. Our
          specialists use safe techniques to clean, condition, and preserve your
          jacket.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800">
          Why Choose Safewash Drycleaners in Hyderabad?
        </h2>
        <p className="text-lg text-gray-700 mt-4">
          At <strong>Safewash Drycleaners</strong>, we specialize in handling
          delicate and high-end fabrics, including leather. Our team uses
          advanced cleaning methods tailored to your garments' needs, ensuring
          your leather jacket remains spotless and well-maintained.
        </p>
      </section>

      <section className="mt-12">
        <h3 className="text-xl font-semibold text-gray-800">Call to Action</h3>
        <p className="text-lg text-gray-700 mt-4">
          Don’t let dirt or damage ruin your leather jacket! Visit{" "}
          <strong>Safewash Drycleaners in Hyderabad</strong> for professional
          cleaning and expert advice. Contact us today to keep your leather
          garments in top condition.
        </p>
        <div className="mt-8">
          <InteractiveHoverButton buttonText="Schedule a free pickup" />
        </div>
      </section>
    </div>
  );
};

const data = [
  ,
  {
    category: "Maintenance Tips",
    title: "How Often Should You Clean Your Curtains and Carpets?",
    src: blog3,
    content: <BlogPost1 />,
  },
  {
    category: "Expert Advice",
    title: "Four Common Dry Cleaning Myths You Need to Know About",
    src: blog1,
    content: <BlogPost2 />,
  },
  {
    category: "Laundry Guide",
    title: "What's the Difference Between Laundry and Dry Cleaning?",
    src: blog2,
    content: <BlogPost3 />,
  },
  {
    category: "Leather Care",
    title: "Keep Your Leather Jacket Looking New: Essential Care",
    src: blog6,
    content: <BlogPost6 />,
  },
  {
    category: "Leather Care",
    title: "How to Clean Leather? : The Complete Guide",
    src: blog4,
    content: <BlogPost4 />,
  },
  {
    category: "Stain Removal",
    title: "How to Remove Color Bleeding Stains from Clothes: A Quick Guide",
    src: blog5,
    content: <BlogPost5 />,
  },
];
