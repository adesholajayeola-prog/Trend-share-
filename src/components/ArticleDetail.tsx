import React, { useState } from 'react';
import { 
  ArrowLeft, ThumbsUp, MessageSquare, Eye, Calendar, User, 
  Share2, Twitter, Check, Send, Sparkles, Heart 
} from 'lucide-react';
import { Article, Comment } from '../types';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (slug: string) => void;
  relatedArticles: Article[];
  onAddComment: (articleId: string, comment: Omit<Comment, 'id' | 'date' | 'likes'>) => void;
  onLikeArticle: (articleId: string) => void;
}

export default function ArticleDetail({
  article,
  onBack,
  onSelectArticle,
  relatedArticles,
  onAddComment,
  onLikeArticle
}: ArticleDetailProps) {
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentErrors, setCommentErrors] = useState<Record<string, string>>({});
  const [showShareToast, setShowShareToast] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [commentLikes, setCommentLikes] = useState<Record<string, number>>({});
  const [activeSharePlatform, setActiveSharePlatform] = useState('');

  // Handle article liking
  const handleLike = () => {
    if (!hasLiked) {
      onLikeArticle(article.id);
      setHasLiked(true);
    }
  };

  // Handle comment submission with validation
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!commentName.trim()) {
      errors.name = 'Please provide your name.';
    }
    if (!commentEmail.trim()) {
      errors.email = 'An email is required for verification.';
    } else if (!/\S+@\S+\.\S+/.test(commentEmail)) {
      errors.email = 'Invalid email address format.';
    }
    if (!commentText.trim()) {
      errors.content = 'Comment body cannot be blank.';
    }

    if (Object.keys(errors).length > 0) {
      setCommentErrors(errors);
      return;
    }

    setCommentErrors({});
    onAddComment(article.id, {
      authorName: commentName,
      authorEmail: commentEmail,
      content: commentText
    });

    // Reset fields
    setCommentName('');
    setCommentEmail('');
    setCommentText('');
  };

  // Simulate sharing to networks
  const handleShare = (platform: string) => {
    setActiveSharePlatform(platform);
    setShowShareToast(true);
    setTimeout(() => {
      setShowShareToast(false);
    }, 3000);
  };

  // Handle comment individual like tracking
  const handleLikeComment = (commentId: string) => {
    setCommentLikes(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 0) + 1
    }));
  };

  return (
    <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeIn text-left" id={`article-detail-${article.id}`}>
      
      {/* Toast Alert */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className="bg-sky-500 text-white font-sans text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-1.5 border border-sky-400">
            <Check className="h-4 w-4" />
            <span>Success: Copied and shared Article via {activeSharePlatform}!</span>
          </div>
        </div>
      )}

      {/* Back navigation Row */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 cursor-pointer transition-colors focus:outline-none"
          id="back-to-home-btn"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Feed</span>
        </button>
      </div>

      {/* Article Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left main content body (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Headline block */}
          <div>
            <span className="inline-block bg-sky-500/10 text-sky-600 dark:text-sky-400 text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded">
              {article.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-sans font-bold text-gray-900 dark:text-white mt-3 tracking-tight leading-tight">
              {article.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mt-2 font-medium leading-relaxed italic">
              {article.excerpt}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-gray-100 dark:border-gray-900/60 text-xs text-gray-500 dark:text-gray-400 font-medium">
              <div className="flex items-center gap-1">
                <User className="h-3.5 w-3.5 text-sky-500" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5 ml-auto font-mono text-[11px]">
                <Eye className="h-3.5 w-3.5" />
                <span>{article.views.toLocaleString()} Reads</span>
              </div>
            </div>
          </div>

          {/* Hero cover image */}
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden shadow-xs relative bg-slate-900">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Text paragraph content */}
          <div className="prose prose-sky dark:prose-invert max-w-none space-y-5 text-gray-700 dark:text-gray-300 text-sm md:text-base leading-relaxed">
            {article.content.map((para, index) => (
              <p key={index} className="indent-0">{para}</p>
            ))}
          </div>

          {/* Quick interactive like footer */}
          <div className="flex items-center justify-between border-y border-gray-150 dark:border-gray-850 py-4 mt-8 font-sans">
            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                disabled={hasLiked}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer border transition-all ${
                  hasLiked 
                    ? 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-300 dark:border-rose-900/50 text-rose-500' 
                    : 'bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-850 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300'
                }`}
                id="like-article-btn"
              >
                <Heart className={`h-4 w-4 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                <span>{hasLiked ? 'Liked!' : 'Like Article'}</span>
                <span className="font-mono bg-white dark:bg-gray-950 px-1.5 py-0.5 rounded text-[10px] ml-1">
                  {article.likes + (hasLiked ? 1 : 0)}
                </span>
              </button>
            </div>

            {/* Social Sharing bar */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium">Share:</span>
              <button
                onClick={() => handleShare('Twitter')}
                className="p-2 bg-gray-50 hover:bg-sky-50 dark:bg-gray-900 dark:hover:bg-sky-950/20 hover:text-sky-500 border border-gray-200 dark:border-gray-800 rounded-xl transition-all cursor-pointer"
                title="Share on X (Twitter)"
                id="share-twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleShare('LinkedIn')}
                className="p-2 bg-gray-50 hover:bg-sky-50 dark:bg-gray-900 dark:hover:bg-sky-950/20 hover:text-sky-500 border border-gray-200 dark:border-gray-800 rounded-xl transition-all cursor-pointer"
                title="Share on LinkedIn"
                id="share-linkedin"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* User Comments System section */}
          <div className="space-y-6 pt-6" id="comments-section">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-sky-500" />
              Comments ({article.comments.length})
            </h3>

            {/* Post comment validation Form */}
            <form onSubmit={handleSubmitComment} className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Join the conversation. What is your trend outlook?
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    className="block w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-255 dark:border-gray-800 text-gray-900 dark:text-white focus:border-sky-500 focus:outline-none"
                    id="comment-name-input"
                  />
                  {commentErrors.name && (
                    <p className="text-[10px] text-rose-500 font-semibold mt-1">{commentErrors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Your Email (will not be published)"
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    className="block w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-255 dark:border-gray-800 text-gray-900 dark:text-white focus:border-sky-500 focus:outline-none"
                    id="comment-email-input"
                  />
                  {commentErrors.email && (
                    <p className="text-[10px] text-rose-500 font-semibold mt-1">{commentErrors.email}</p>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder="Type your respectful message here. Support ideas with stats."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="block w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-gray-900 border border-gray-255 dark:border-gray-800 text-gray-900 dark:text-white focus:border-sky-500 focus:outline-none"
                  id="comment-text-textarea"
                ></textarea>
                {commentErrors.content && (
                  <p className="text-[10px] text-rose-500 font-semibold mt-1">{commentErrors.content}</p>
                )}
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold text-xs rounded-xl shadow-md cursor-pointer transition-colors flex items-center gap-1.5 focus:outline-none"
                id="comment-submit-btn"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Submit Response</span>
              </button>
            </form>

            {/* List of comments */}
            <div className="space-y-3.5">
              {article.comments.length === 0 ? (
                <div className="text-center py-6 bg-gray-50/50 dark:bg-gray-900/10 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
                  <p className="text-xs text-gray-400">No responses posted yet. Be the first to analyze!</p>
                </div>
              ) : (
                article.comments.map((comm) => {
                  const localLks = commentLikes[comm.id] || 0;
                  return (
                    <div 
                      key={comm.id} 
                      className="p-4 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl space-y-2"
                      id={`comment-item-${comm.id}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white text-[11px] font-bold">
                            {comm.authorName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="text-xs font-bold text-gray-900 dark:text-white block">{comm.authorName}</span>
                            <span className="text-[10px] text-gray-400 font-mono">{comm.date}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLikeComment(comm.id)}
                          className="flex items-center gap-1 text-[10px] font-mono font-bold text-gray-400 hover:text-rose-500 transition-colors bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded"
                          id={`like-comment-btn-${comm.id}`}
                        >
                          <ThumbsUp className="h-3 w-3" />
                          <span>{comm.likes + localLks}</span>
                        </button>
                      </div>

                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed font-sans">
                        {comm.content}
                      </p>
                    </div>
                  );
                })
              )}
            </div>

          </div>

        </div>

        {/* Right sidebar column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Author Card detail */}
          <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-3">
              About The Writer
            </h4>
            <div className="flex items-center gap-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="h-12 w-12 rounded-full object-cover shadow-xs border border-gray-200 dark:border-gray-800"
                referrerPolicy="no-referrer"
              />
              <div>
                <h5 className="text-xs font-bold text-gray-950 dark:text-white">
                  {article.author.name}
                </h5>
                <p className="text-[10px] text-sky-500 font-medium">
                  {article.author.role}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
              {article.author.bio}
            </p>
          </div>



          {/* Related Articles column widget */}
          <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs">
            <h4 className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-widest mb-4">
              More related Trends
            </h4>

            <div className="space-y-4">
              {relatedArticles.map((rel) => (
                <button
                  key={rel.id}
                  onClick={() => {
                    onSelectArticle(rel.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="flex gap-3 text-left w-full group focus:outline-none cursor-pointer"
                  id={`related-item-${rel.id}`}
                >
                  <div className="h-14 w-20 rounded-lg overflow-hidden bg-slate-900 shrink-0 relative">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-sky-500 uppercase">
                      {rel.category}
                    </span>
                    <h5 className="text-xs font-bold text-gray-900 dark:text-white line-clamp-2 mt-0.5 group-hover:text-sky-500 transition-colors">
                      {rel.title}
                    </h5>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </article>
  );
}
