

function NewsCard({ url, title,image }) {
  const imageBase =
    "https://media.gettyimages.com/id/1434149985/it/foto/concetto-criptovaluta-sulle-banconote.jpg?s=612x612&w=0&k=20&c=JtEp7r4QbpaaUH_2cLC00H_bDpw4ELYaGykUGIlXQCo=";

  return (
    <a
      href={url || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="notizia"
        style={{
          backgroundImage: `url(${image || imageBase})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3 className="titolo text-xl">{title || "Senza titolo"}</h3>
      </div>
    </a>
  );
}

export default NewsCard;