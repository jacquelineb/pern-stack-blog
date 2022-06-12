import React from 'react';
import { formatDate } from '../utils/formatDate';
import style from '../styles/BlogPost.module.scss';

function BlogPost({ post }) {
  const { id, title, body, created_on } = post;
  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>{title}</h2>
      <p className={style.postMetaData}>
        Posted on <span className={style.date}>{formatDate(created_on)}</span>
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