import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Checkbox from "@mui/material/Checkbox";
import SendIcon from "@mui/icons-material/Send";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useEffect, useState } from "react";
import { UserDateContext } from "../context/userContext";
import API from "./axiosConfig";
import CloseIcon from "@mui/icons-material/Close";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import useScoket from "../socket/socket";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const IndexPost = () => {
  const { user } = useContext(UserDateContext);
  const [cookie, setCookies, removeCookies] = useCookies(["token"]);
  const token = cookie["token"];
  const [userpost, setUserpost] = useState([]);
  const [isloading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState({});
  const [commenttoggle, setCommentToggle] = useState(null);
  const[comments,setComments]=useState()
  const[commentResult,setCommentResult]=useState([])
  const[isliked,setLiked]=useState(false)
  
 
  const socket=useScoket()
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get("/getAllPost", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        if (response.status === 200) {
         
         const like=response.data.map(post=>post.like.toString()===user._id.toString())
          if(like[0]){
            setLiked(true)
          }
          setUserpost(response.data.reverse());
         
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [token,isliked]);

    

    useEffect(()=>{
         socket.on("comments-recive",(data)=>{
           
            setCommentResult((prev)=>[...prev,data])
         })

         return ()=>{
            socket.off("comments-recive")
         }
    },[socket])
  const handleUserClick = (id) => {
    navigate(`/user/${id}`);
  };

  const toggleExpand = (index) => {
    setToggle((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleCommentClick = async(i,post_id) => {
     const postid={
       post_id:post_id
     }
    setCommentToggle((prev) => (prev === i ? null : i));

    try{
      const response=await API.post("/comments/getAllcomments",postid,{
         headers:{
            Authorization:`Bearer ${token}`
         }
      })
      
      const comment=response.data

      const fromatComment=comment.map((comment)=>({
         commentUser:comment,
         Sender:comment.SenderId
      }))
    setCommentResult(fromatComment)
      
}
catch(err){
console.log(err)
}
  };
  const handleCommentchange=(e)=>{
      setComments(e.target.value)
  }
  const handleSendComment=async(postId,post_authorId)=>{

     
        if(!comments) return null;
        const comment={
         post_id:postId,
         ReciverId:post_authorId,
         comment:comments
        }
        try{
            const response=await API.post("/comments/send-comments",comment,{
               headers:{
                  Authorization:`Bearer ${token}`
               }
            })
           
           setComments("")
        }
        catch(err){
         console.log(err)
        }
 
  }

  const handlelikeClick=async(postId)=>{
            const postid={
               post_id:postId
            }
            try{
                 const response=await API.post("/postlike",postid,{
                  headers:{
                     Authorization:`Bearer ${token}`
                  }
                 })
                if(response.status==200){
                  setLiked(true)
                }
                else{
                  setLiked(false)
                }
               
            }
            catch(err){
               console.log(err)
            }
      

  }




  return (
    <div className="w-full md:w-[900px] md:mt-7 md:px-4">
      <div className="flex  items-center overflow-x-auto gap-4 px-2.5 w-full md:h-[100px] h-[90px]   ">
        <div className="w-[60px] relative h-[60px] flex-none">
          <img src={user.profile} className="w-full rounded-full h-full" />
          <span className="absolute right-0 bottom-0 bg-black text-white rounded-full">
            <AddIcon />
          </span>
        </div>
      </div>

      {
        <div className="flex flex-col items-center max-[767px]:w-full ">
          {userpost.length === 0 ? (
            <div className="h-[400px] flex flex-col justify-center items-center">
              <div>No Public post available</div>
              <div className="cursor-pointer">
                <Link to="create">Create your post😊</Link>{" "}
              </div>
            </div>
          ) : (
            userpost.map((post, i) => {
              return (
                <div
                  key={post._id}
                  className="max-[767px]:w-full overflow-hidden  relative h-[fit] pb-9 w-[400px]"
                >
                  <div className="flex justify-between items-center max-[767px]:px-1 my-1">
                    <div
                      onClick={() => handleUserClick(post.post_author._id)}
                      className="flex cursor-pointer items-center"
                    >
                      <div className="w-[40px] relative h-[40px] overflow-hidden rounded-full">
                        <img
                          src={post.post_author.profile}
                          width="60"
                          height="60"
                          className="rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        />
                      </div>
                      <div className="ms-3">{post.post_author.user_name}</div>
                    </div>
                    <div>
                      <MoreHorizIcon />
                    </div>
                  </div>

                  <div className="w-full max-[767px]:h-[400px] h-[450px]">
                    <img src={post.post_url} width="100%" className="h-full" />
                  </div>

                  <div className="mt-2 px-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          onClick={()=>handlelikeClick(post._id)}
                          {...label}
                          checked={isliked}
                          icon={<FavoriteBorder sx={{ fontSize: 30 }} />}
                          checkedIcon={<Favorite sx={{ fontSize: 30 }} />}
                        />
                        <div onClick={() => handleCommentClick(i,post._id)}>
                          <ChatBubbleOutlineOutlinedIcon
                            sx={{ fontSize: 30 }}
                          />
                        </div>
                        <div>
                          <SendIcon sx={{ fontSize: 30 }} />
                        </div>
                      </div>
                      <div>
                        <div>
                          <BookmarkBorderIcon sx={{ fontSize: 30 }} />
                        </div>
                      </div>
                    </div>

                    <div className="my-3">
                      <div>{post.like.length} likes</div>
                    </div>
                    <div className=" ">
                      <div
                        className={
                          toggle[i]
                            ? "text-ellipsis text-nowrap overflow-hidden"
                            : "h-fit"
                        }
                      >
                        <span className="me-2">
                          {post.post_author.user_name}
                        </span>
                        <span onClick={() => toggleExpand(i)}>
                          {post.caption}
                        </span>
                      </div>
                      <div className="my-3 h-[30px] cursor-pointer overflow-hidden">
                        <div onClick={() => handleCommentClick(i,post._id)}>
                          View all comments
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`h-[100vh] z-20 fixed top-0 min-[769px]:flex justify-center items-center     ${
                      commenttoggle === i ? "left-[0%] right-0" : "left-[100%]"
                    } z-20  w-full  `}
                  >
                    <div className="min-[769px]:w-[400px] relative  min-[769px]:ms-[150px]   rounded-[20px] overflow-auto bg-white h-[450px] max-[768px]:h-[100vh]">
                      <div className=" sticky z-20 top-0">
                        <div className="relative rounded-tr-[20px]  w-full   bg-stone-200  rounded-tl-[20px] h-[70px]">
                          <div className="text-center">
                            <div className="pt-3">comments</div>
                          </div>
                          <div
                            className="absolute top-2 right-3 cursor-pointer"
                            onClick={() => setCommentToggle(null)}
                          >
                            <CloseIcon />
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 h-[300px] max-[768px]:h-[100vh] max-[768px]:pb-4 overflow-auto bg-white">
                          {
                             commentResult.length>0?
                             commentResult.map((comment,i)=>{
                               return  <div key={i} className="flex px-2 my-6 h-fit  items-center justify-between">
                               <div className="flex gap-3 cursor-pointer items-center">
                                 <div className="w-[40px] relative h-[40px] overflow-hidden rounded-full">
                                   <img
                                     src={comment.Sender.profile}
                                     width="60"
                                     height="60"
                                     className="rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                   />
                                 </div>
                                  <div>
                                  <div className=" text-[13px]">
                                  {
                                    comment.Sender.user_name
                                  }
                                  
                                 </div>
                                 <div className="text-[14px] w-[230px] text-justify">{comment.commentUser.comments}</div>
                                 <div className="text-[10px]">Reply</div>
                                  </div>
                               </div>
                               <div>
                                 <FavoriteBorder />
                               </div>
                             </div>
                             })
                            :<div className="text-center">Start Comment</div>
                          }
                      </div>
                      <div
                        style={{ borderTop: "1px solid #bdbab7" }}
                        className="sticky  py-3 bg-white left-0 w-full  bottom-0"
                      >
                        <div className="w-full flex items-center px-3   pb-3">
                          <div className="w-[30px] rounded-full relative overflow-hidden h-[30px]">
                            <img
                              src={user.profile}
                              className="w-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full"
                            />
                          </div>
                          <div className="w-[300px]">
                            <textarea
                              type="text"
                              value={comments}
                              onChange={handleCommentchange}
                              placeholder="start conversation.."
                              className="px-3 pt-3 resize-none h-[40px] w-full rounded-[10px] outline-none"
                            />
                          </div>
                          <div onClick={()=>handleSendComment(post._id,post.post_author._id)}>
                            <SendIcon  className="cursor-pointer" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      }
    </div>
  );
};
export default IndexPost;
