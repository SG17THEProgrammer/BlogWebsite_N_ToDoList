import React from 'react';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from 'react-share';

const SharePopup = ({ post }) => {
  const shareUrl = `http://localhost:5500/completePost/${post?._id}`;
  const title = post?.title;
  const tags = post?.tags?.join(', ');
  const description = post?.description;

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <WhatsappShareButton url={shareUrl} title={title}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <TwitterShareButton url={shareUrl} title={`${title} - ${tags}`}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        url={shareUrl}
        title={title}
        summary={description}
        source="YourBlogName"
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>
    </div>
  );
};

export default SharePopup;
