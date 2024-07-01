const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
  }


const totalLikes = (blogs) => {
    const reducer = (total, blog) => {
        return total += blog.likes
    }
    
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

    if(blogs.length === 0 ) return 0;

    let favorite = blogs.reduce(((fav, blog) => {
        return fav.likes < blog.likes ? fav = blog : fav
    }), blogs[0])

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0 ) return 0;

    // With lodash

    const groupAuthors = _.groupBy(blogs, 'author')

    const authorBlogs = _.map(groupAuthors, (blog, author) => ({
        author: author,
        blogs: blog.length
    }))

    const mostBlog = _.maxBy(authorBlogs, 'blogs')

    return mostBlog

    // Without lodash

    // let authors = blogs.reduce((authors, blog) => {
    //     authors.set(blog.author, (authors.get(blog.author) || 0 ) + 1)
    //     return authors
    // }, new Map())

    // let topAuthor = { author: '', blogs: 0 };

    // authors.forEach((blogs, author) => {
    //     if (blogs > topAuthor.blogs) {
    //         topAuthor = { author, blogs };
    //     }
    // });

    // return topAuthor
}

const mostLikes = (blogs) => {
    if (blogs.length === 0 ) return 0;

    const groupAuthors = _.groupBy(blogs, 'author')

    const mappedAuthors = _.map(groupAuthors, (blog, author) =>
        ({
            author: author,
            likes: totalLikes(blog)
        })
    )

    const mostLikedAuthor = _.maxBy(mappedAuthors, 'likes')

    return mostLikedAuthor
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }