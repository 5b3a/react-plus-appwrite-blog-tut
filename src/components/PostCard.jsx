import { Link } from "react-router-dom";
import appwriteService from "../appwrite/conf";

function PostCard({ $id, image, title }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full p-4 rounded-md bg-gray-400">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(image)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
