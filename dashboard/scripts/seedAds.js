import axios from "axios";

const advertiserToCategory = {
  Sportify: "Lifestyle",
  FitLife: "Lifestyle",
  TuneIt: "Lifestyle",
  EduMart: "Education",
  DevSchool: "Education",
  SkillLab: "Education",
  TravelCo: "Travel",
  FlyAway: "Travel",
  CarryCo: "Travel",
  StreamIt: "Entertainment",
  WatchAll: "Entertainment",
  EventHub: "Entertainment",
  CafeX: "Food",
  SliceZone: "Food",
  GlowUp: "Beauty",
  TimePro: "Fashion",
  PlayMax: "Kids",
  HomeTech: "Technology",
  TechZone: "Technology",
  Mobix: "Technology",
  AutoLine: "Automotive",
  FreshGo: "E-Commerce",
  FinBank: "Finance",
};

const rawAds = [
  ["Sneaker Sale", "Sportify"],
  ["Fitness Gear", "Sportify"],
  ["Yoga Promo", "FitLife"],
  ["Healthy Living", "FitLife"],
  ["Guitar Basics", "TuneIt"],
  ["Learn Guitar", "TuneIt"],
  ["Back to School", "EduMart"],
  ["Study Deals", "EduMart"],
  ["Code Fast", "DevSchool"],
  ["JS Bootcamp", "DevSchool"],
  ["Upskill Now", "SkillLab"],
  ["Career Boost", "SkillLab"],
  ["Holiday Deals", "TravelCo"],
  ["Beach Escape", "TravelCo"],
  ["Fly Cheap", "FlyAway"],
  ["Quick Flights", "FlyAway"],
  ["Travel Bags", "CarryCo"],
  ["Luggage Promo", "CarryCo"],
  ["Movie Night", "StreamIt"],
  ["New Series", "StreamIt"],
  ["Watch More", "WatchAll"],
  ["Streaming Pass", "WatchAll"],
  ["Live Music", "EventHub"],
  ["Concerts Now", "EventHub"],
  ["Morning Coffee", "CafeX"],
  ["Coffee Break", "CafeX"],
  ["Pizza Party", "SliceZone"],
  ["Slice Deals", "SliceZone"],
  ["Skincare Sale", "GlowUp"],
  ["Beauty Tips", "GlowUp"],
  ["Luxury Time", "TimePro"],
  ["Watch Deals", "TimePro"],
  ["Toys Time", "PlayMax"],
  ["Play Big", "PlayMax"],
  ["Smart Home", "HomeTech"],
  ["Tech Deals", "HomeTech"],
  ["Gaming Setup", "TechZone"],
  ["Upgrade PC", "TechZone"],
  ["Phone Promo", "Mobix"],
  ["Mobile Deals", "Mobix"],
  ["Used Cars", "AutoLine"],
  ["Car Deals", "AutoLine"],
  ["Grocery Now", "FreshGo"],
  ["Fresh Basket", "FreshGo"],
  ["Bank Online", "FinBank"],
  ["Save Smart", "FinBank"],
];

function randomDateWithinLastYear() {
  const now = new Date();
  const past = new Date(now);
  past.setFullYear(now.getFullYear() - 1);
  const timestamp =
    past.getTime() + Math.random() * (now.getTime() - past.getTime());
  return new Date(timestamp).toISOString();
}

function generateAd(title, advertiser) {
  const impressions = Math.floor(Math.random() * 2000) + 100;
  const clicks = Math.floor(impressions * (Math.random() * 0.3));
  const category = advertiserToCategory[advertiser];

  return {
    title,
    advertiser,
    category,
    duration: [15, 30, 45, 60][Math.floor(Math.random() * 4)],
    videoUrl: "https://cdn.example.com/video.mp4",
    impressions,
    clicks,
    createdAt: randomDateWithinLastYear(),
  };
}

const ads = rawAds.map(([title, advertiser]) => generateAd(title, advertiser));

async function clearAllAds() {
  try {
    const res = await axios.get("https://video-ads-api.onrender.com/api/ads");
    for (const ad of res.data) {
      await axios.delete(
        `https://video-ads-api.onrender.com/api/ads/${ad._id}`
      );
      console.log("❌ Deleted:", ad.title);
    }
  } catch (err) {
    console.error("⚠️ Error deleting:", err.response?.data || err.message);
  }
}

async function seed() {
  await clearAllAds();
  for (const ad of ads) {
    try {
      const res = await axios.post(
        "https://video-ads-api.onrender.com/api/ads",
        ad
      );
      console.log("✅ Added:", res.data.title);
    } catch (err) {
      console.error("❌ Error:", ad.title, err.response?.data || err.message);
    }
  }
}

seed();