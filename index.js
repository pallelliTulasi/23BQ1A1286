const axios = require("axios");
const priority = { Placement: 3, Result: 2, Event: 1 };
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiIyM2JxMWExMjg2QHZ2aXQubmV0IiwiZXhwIjoxNzgwNjM0OTEzLCJpYXQiOjE3ODA2MzQwMTMsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIwNDVlMDg3OC04NWQ2LTRiNzEtYTFlMi1lM2RjODBmZDRlMjIiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJwYWxsZWxsaSB0dWxhc2kiLCJzdWIiOiI5OTA0ZWJmZC1lMzhiLTRjZWYtYTRhMi1iZGZlZjAxMDgxODgifSwiZW1haWwiOiIyM2JxMWExMjg2QHZ2aXQubmV0IiwibmFtZSI6InBhbGxlbGxpIHR1bGFzaSIsInJvbGxObyI6IjIzYnExYTEyODYiLCJhY2Nlc3NDb2RlIjoiUVFkRVl5IiwiY2xpZW50SUQiOiI5OTA0ZWJmZC1lMzhiLTRjZWYtYTRhMi1iZGZlZjAxMDgxODgiLCJjbGllbnRTZWNyZXQiOiJjSE16cE1WRkRGTVhQTUNKIn0.fjR7OpGkPBQ3gP0TgJxvn545TYEX21k4RT-6th7aI80";
async function fetchNotifications() {
  try {
    const res = await axios.get("http://4.224.186.213/evaluation-service/notifications", {
      headers: { Authorization: TOKEN }
    });
    const notifications = res.data.notifications;
    const sorted = notifications.sort((a, b) => {
      if (priority[b.Type] !== priority[a.Type]) {
        return priority[b.Type] - priority[a.Type];
      }
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });
    const top10 = sorted.slice(0, 10);
    console.log("✅ Top 10 Priority Notifications:");
    console.table(top10); 
  } catch (err) {
    console.error("❌ Error fetching notifications:", err.message);
  }
}

fetchNotifications();
