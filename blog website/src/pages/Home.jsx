import { Link, NavLink } from "react-router-dom";
import styles from "../components/styles/Home.module.css"
import { useAuth } from "../store/auth";
import { MdAddReaction } from "react-icons/md";
const Home = () => {
    const {blogs, storeBlogIdTokenInLocale} = useAuth();
    const sortedBlogs = [...blogs].reverse();

    const setSingleBlogId = (id) => {
        console.log(id)
        storeBlogIdTokenInLocale(id)
    }
    return ( 
        <div className={styles.container}>
            <div className={styles.wallpaperContainer}>
                <div className={styles.wallpaperImgContainer}>
                    <img className={styles.wallpaperImg} src="images/homepage.jpg" alt="wallpaper image" />
                </div>
            </div>
            <div className={styles.mainContainer}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.headingTitle}><NavLink  aria-label="Go to the blog Page">Blogs</NavLink></h1>
                    <p className={styles.websitePara}>Discover a world of ideas and inspiration at Blog Adda. Dive into engaging articles written by our passionate team of writers and contributors. Join our community today and let your journey of exploration begin. Blog Adda - Where knowledge meets adventure.</p>
                </div>
                <div className={styles.blogsContainer}>
                    {sortedBlogs.map((blog, index) => 
                    <div className={styles.blogCard} key={index}>
                        <div className={styles.blogTitle}>{blog.title}</div>
                        <div className={styles.blogBody}><div className={styles.blogBodyText}>{blog.body}</div></div>
                        <div className={styles.reactionBox}><MdAddReaction /> {blog.reactions}</div>
                        <div className={styles.tagBox}>{blog.tags.map((tag, index) => <span key={index} className={styles.tagSpan}>{tag}</span>)}</div>
                        <NavLink  aria-label="Go to the blog Page" to={`/blog/${blog.title.replace(/\s+/g, '-')}`}>
                        <button className={styles.readBtn} type="button" onClick={() => setSingleBlogId(blog._id)}>Read More</button>
                        </NavLink>
                    </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default Home;
