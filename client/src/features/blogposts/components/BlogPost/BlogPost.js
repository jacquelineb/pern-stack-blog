import React from 'react';
import { Link } from 'react-router-dom';
import formatDate from '../../../../utils/formatDate';
import style from './BlogPost.module.scss';

function BlogPost({ post }) {
  const { id, author, title, body, created_on } = post;
  return (
    <div>
      <h2 className={style.title}>
        <Link to={`/profile/${author}/post/${post.id}`}>{title}</Link>
      </h2>
      <p className={style.postMetaData}>
        Posted on <span className={style.date}>{formatDate(created_on).date}</span>
      </p>

      <div className={style.body}>
        {body.map((block) => {
          const html =
            block.type === 'paragraph'
              ? `<p>${block.data.text}</p>`
              : block.type === 'image'
              ? `<img src='${block.data.file.url}' />`
              : null;
          return (
            <div key={`${id}-${block.id}`} dangerouslySetInnerHTML={{ __html: html }}></div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogPost;
