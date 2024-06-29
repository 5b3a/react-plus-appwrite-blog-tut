import { useEffect, useState } from 'react'
import appwriteService from '../appwrite/conf'
import { Container, PostCard } from '../components'
function AllPost() {
    const [posts,setPosts] = useState([])
    useEffect(()=>{},[])
    appwriteService.getpost([]).then((posts)=>{
        if (posts) {
            setPosts(posts.document)
        }
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>

            </div>
            {
                posts.map((post)=>(
                    <div className='p-2 w-1/4' key={post.$id}>
                        <PostCard post={post}/>
                    </div>
                ))
            }
        </Container>
    </div>
  )
}

export default AllPost