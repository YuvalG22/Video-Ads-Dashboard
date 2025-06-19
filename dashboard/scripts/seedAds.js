import axios from "axios";

//generate ads

function randomDateWithinLast30Days() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  now.setDate(now.getDate() - daysAgo);
  return now.toISOString();
}

function generateAd(title, advertiser) {
  const impressions = Math.floor(Math.random() * 2000) + 100;
  const clicks = Math.floor(impressions * (Math.random() * 0.3));
  return {
    title,
    advertiser,
    duration: [15, 30, 45, 60][Math.floor(Math.random() * 4)],
    videoUrl: "https://cdn.example.com/video.mp4",
    impressions,
    clicks,
    createdAt: randomDateWithinLast30Days(),
  };
}

const rawAds = [
  ["Sneaker Sale", "Sportify"],
  ["Back to School", "EduMart"],
  ["Holiday Deals", "TravelCo"],
  ["Coffee Time", "CafeX"],
  ["Gamer Gear", "TechZone"],
  ["Flash Sale", "ShopNow"],
  ["Fitness Fever", "FitLife"],
  ["Movie Night", "StreamIt"],
  ["Coding Bootcamp", "DevSchool"],
  ["Luxury Watches", "TimePro"],
  ["Winter Collection", "StylePro"],
  ["Pet Food Promo", "PawMart"],
  ["Concert Tickets", "EventHub"],
  ["Online Courses", "SkillLab"],
  ["Smart Home", "HomeTech"],
  ["Skincare Secrets", "GlowUp"],
  ["Daily Groceries", "FreshGo"],
  ["Book Fair", "ReadNow"],
  ["Discount Flights", "FlyAway"],
  ["Streaming Pass", "WatchAll"],
  ["Used Cars Deal", "AutoLine"],
  ["Guitar Lessons", "TuneIt"],
  ["Pizza Party", "SliceZone"],
  ["Phone Upgrade", "Mobix"],
  ["Home Insurance", "SafeHouse"],
  ["Job Offers", "HireMe"],
  ["Travel Bags", "CarryCo"],
  ["Kids Toys", "PlayMax"],
  ["Online Banking", "FinBank"],
  ["Interior Design", "DecoNest"],
];

const ads = rawAds.map(([title, advertiser]) => generateAd(title, advertiser));

async function seed() {
  for (const ad of ads) {
    try {
      const res = await axios.post("https://video-ads-api.onrender.com/api/ads", ad);
      console.log("✅ Added:", res.data.title);
    } catch (err) {
      console.error("❌ Error:", ad.title, err.response?.data || err.message);
    }
  }
}

seed();