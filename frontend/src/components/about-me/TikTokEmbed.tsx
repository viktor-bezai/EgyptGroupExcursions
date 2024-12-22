const TikTokEmbed = () => {
  const videos = [
    "7058817659211234567", // Replace with real TikTok video IDs
    "7058817662211234568",
  ];

  return (
    <div>
      {videos.map((id) => (
        <div key={id} style={{ marginBottom: "16px" }}>
          <blockquote
            className="tiktok-embed"
            cite={`https://www.tiktok.com/@username/video/${id}`}
            data-video-id={id}
            style={{ maxWidth: "605px", margin: "0 auto" }}
          >
            <section></section>
          </blockquote>
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
      ))}
    </div>
  );
};

export default TikTokEmbed;
