const { useState, useRef, useEffect } = React;

function ChatView({ showChat, closeChat }) {
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [hasText, setHasText] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'image', imageUrl: 'https://i.ibb.co/fKxWKb3/Screenshot-20251129-120749.jpg', time: '17:06', sent: true, date: 'Tuesday' }
  ]);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const stickyDateRef = useRef(null);

  const toggleKeyboard = () => {
    setIsKeyboardActive(!isKeyboardActive);
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleInputClick = () => {
    if (showEmojiPicker) {
      setShowEmojiPicker(false);
      setIsKeyboardActive(false);
    }
    
    const scrollToBottom = () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    };
    
    scrollToBottom();
    setTimeout(scrollToBottom, 100);
    setTimeout(scrollToBottom, 300);
    setTimeout(scrollToBottom, 500);
  };

  const handleInput = (e) => {
    const text = e.currentTarget.textContent.trim();
    setHasText(text.length > 0);
    
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 50);
  };

  const handleBlur = (e) => {
    if (e.currentTarget.textContent.trim() === '') {
      e.currentTarget.textContent = '';
    }
  };

  const handleSend = () => {
    if (inputRef.current && hasText) {
      const text = inputRef.current.textContent.trim();
      if (text) {
        const newMessage = {
          id: messages.length + 1,
          text: text,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          sent: true
        };
        setMessages([...messages, newMessage]);
      }
      inputRef.current.innerHTML = '';
      setHasText(false);
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (e) => {
    // Disable Enter key from sending on mobile devices
  };

  useEffect(() => {
    if (showChat && messages.length > 1) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 300);
    }
  }, [messages, showChat]);

  useEffect(() => {
    if (showEmojiPicker && showChat) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 350);
    }
  }, [showEmojiPicker, showChat]);

  useEffect(() => {
    const scrollContainer = chatContainerRef.current;
    if (!scrollContainer || !showChat) return;

    const handleScroll = () => {
      const dateSeparators = scrollContainer.querySelectorAll('.date-separator, .message-date-badge');
      const stickyDate = stickyDateRef.current;
      if (!stickyDate) return;

      let shouldShowSticky = false;
      let currentDateText = '';
      const chatHeaderHeight = 65;

      dateSeparators.forEach(separator => {
        const rect = separator.getBoundingClientRect();
        
        if (rect.top <= chatHeaderHeight && rect.bottom >= 0) {
          shouldShowSticky = true;
          const badge = separator.querySelector('.date-badge');
          if (badge) {
            currentDateText = badge.textContent;
          }
        }
      });

      const stickyBadge = stickyDate.querySelector('.date-badge');
      if (shouldShowSticky && currentDateText && stickyBadge) {
        stickyBadge.textContent = currentDateText;
        stickyDate.style.opacity = '1';
        stickyDate.classList.add('visible');
      } else {
        if (stickyBadge) stickyBadge.textContent = '';
        stickyDate.style.opacity = '0';
        stickyDate.classList.remove('visible');
      }
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    
    setTimeout(handleScroll, 100);
    
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [showChat, messages]);

  return (
    <div className={`chat-view ${showChat ? 'translate-x-0' : ''}`}>
      {/* Chat Header */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e5', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
          <button 
            onClick={closeChat}
            style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#fb923c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: '600' }}>DS</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontWeight: '600', color: '#111827', fontSize: '18px', margin: 0 }}>Daddy Steve</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>last seen 11/3/2025</p>
          </div>
          <button style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>

      {/* Sticky Date at Top */}
      <div className="sticky-date" ref={stickyDateRef}>
        <div className="date-badge"></div>
      </div>

      {/* Messages Container */}
      <div 
        ref={chatContainerRef}
        style={{ 
        flex: 1,
        backgroundImage: 'url(https://i.ibb.co/fzG6R49y/Screenshot-20251125-105049.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#f5f5f5',
        overflowY: 'auto',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0
      }}>
        <div style={{ 
          flex: 1,
          minHeight: 'min-content'
        }}></div>
        <div style={{
          padding: '16px',
          paddingBottom: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>

        {messages.map((message) => {
          if (message.type === 'image') {
            return (
              <React.Fragment key={message.id}>
                {message.date && (
                  <div className="message-date-badge">
                    <div className="date-badge">{message.date}</div>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: '16px 1px 1px 16px', 
                    padding: '4px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                    maxWidth: '290px',
                    position: 'relative'
                  }}>
                    <img 
                      src={message.imageUrl} 
                      alt="Sent image" 
                      style={{ 
                        width: '100%', 
                        display: 'block', 
                        borderRadius: '12px',
                        maxWidth: '290px'
                      }} 
                    />
                    <div style={{ 
                      position: 'absolute',
                      bottom: '12px',
                      right: '12px',
                      fontSize: '11px',
                      color: 'white',
                      textShadow: '0 1px 2px rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      {message.time}
                      {message.sent && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))' }}>
                          <path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.5 17l6 6l13-13"/>
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          }
          
          if (!message.text) return null;
          
          const isLongMessage = message.text.length > 50;
          const isMediumMessage = message.text.length > 30 && message.text.length <= 50;
          
          return (
            <div key={message.id} style={{ display: 'flex', justifyContent: 'flex-end' }}>
              {isLongMessage ? (
                <div style={{ 
                  background: 'white', 
                  borderRadius: '16px 1px 1px 16px', 
                  padding: '8px 12px 4px 12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  maxWidth: '290px'
                }}>
                  <div style={{ fontSize: '14px', lineHeight: '1.3', color: '#111' }}>
                    {message.text}
                    <span style={{ 
                      float: 'right', 
                      marginLeft: '6px',
                      fontSize: '11px',
                      color: '#6b7280',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      position: 'relative',
                      bottom: '-5px'
                    }}>
                      {message.time}
                      {message.sent && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" style={{ position: 'relative', top: '-2px' }}>
                          <path fill="none" stroke="#808080" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.5 17l6 6l13-13"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              ) : isMediumMessage ? (
                <div style={{ 
                  background: 'white', 
                  borderRadius: '16px 1px 1px 16px', 
                  padding: '8px 12px 4px 12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  maxWidth: '85%'
                }}>
                  <div style={{ fontSize: '14px', lineHeight: '1.3', color: '#111' }}>
                    {message.text}
                    <span style={{ 
                      float: 'right', 
                      marginLeft: '6px',
                      fontSize: '11px',
                      color: '#6b7280',
                      whiteSpace: 'nowrap',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      position: 'relative',
                      bottom: '-5px'
                    }}>
                      {message.time}
                      {message.sent && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" style={{ position: 'relative', top: '-2px' }}>
                          <path fill="none" stroke="#808080" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.5 17l6 6l13-13"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              ) : (
                <div style={{ 
                  background: 'white', 
                  borderRadius: '16px 1px 1px 16px', 
                  padding: '8px 12px',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                  maxWidth: '85%'
                }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', whiteSpace: 'nowrap' }}>
                    <span style={{ color: '#111', fontSize: '14px' }}>{message.text}</span>
                    <span style={{ 
                      fontSize: '11px', 
                      color: '#6b7280', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      flexShrink: 0
                    }}>
                      {message.time}
                      {message.sent && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 32 32" style={{ position: 'relative', top: '-1px' }}>
                          <path fill="none" stroke="#808080" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m6.5 17l6 6l13-13"/>
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
        </div>

        <div className={`emoji-picker ${showEmojiPicker ? 'show' : ''}`}>
        </div>
      </div>

      {/* Footer - Fixed at bottom */}
      <div className="footer" style={{ flexShrink: 0 }}>
          <svg className="left-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g className="attachment-clip-outline">
              <path fill="#666666" fillRule="evenodd" d="M8 7.308c0-.558.186-1.434.659-2.14C9.1 4.504 9.779 4 10.88 4c1.134 0 1.88.499 2.373 1.155c.52.692.746 1.555.746 2.153v7.54a.8.8 0 0 1-.073.223c-.065.141-.166.3-.3.447c-.269.295-.61.482-1.002.482c-.436 0-.777-.18-1.02-.433c-.263-.274-.355-.574-.355-.72v-7.56a1 1 0 0 0-2 0v7.56c0 .75.358 1.527.912 2.105A3.38 3.38 0 0 0 12.625 18c1.085 0 1.93-.532 2.48-1.134c.517-.567.895-1.335.895-2.02V7.308c0-1.001-.35-2.292-1.146-3.354C14.029 2.856 12.716 2 10.88 2c-1.867 0-3.13.925-3.885 2.055A6.13 6.13 0 0 0 6 7.308v8.695C6 19.402 9.003 22 12.5 22c3.498 0 6.5-2.597 6.5-5.997V7a1 1 0 1 0-2 0v9.003C17 18.123 15.079 20 12.5 20C9.923 20 8 18.122 8 16.003z" className="Vector" clipRule="evenodd"/>
            </g>
          </svg>

          <div className="input-box-wrapper">
            {isKeyboardActive ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 432 384" onClick={toggleKeyboard} style={{ cursor: 'pointer' }}>
                <path fill="#666666" d="M384 43q18 0 30.5 12.5T427 85v214q0 17-12.5 29.5T384 341H43q-18 0-30.5-12.5T0 299V85q0-17 12.5-29.5T43 43h341zm-192 64v42h43v-42h-43zm0 64v42h43v-42h-43zm-64-64v42h43v-42h-43zm0 64v42h43v-42h-43zm-21 42v-42H64v42h43zm0-64v-42H64v42h43zm192 150v-43H128v43h171zm0-86v-42h-43v42h43zm0-64v-42h-43v42h43zm64 64v-42h-43v42h43zm0-64v-42h-43v42h43z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={toggleKeyboard} style={{ cursor: 'pointer' }}>
                <path fill="#666666" d="M464 256a208 208 0 1 0-416 0a208 208 0 1 0 416 0M0 256a256 256 0 1 1 512 0a256 256 0 1 1-512 0m177.3 63.4c15 15.6 41.1 32.6 78.7 32.6s63.7-17 78.7-32.6c9.2-9.6 24.4-9.9 33.9-.7s9.9 24.4.7 33.9c-22.1 23-60 47.4-113.3 47.4s-91.2-24.4-113.3-47.4c-9.2-9.6-8.9-24.8.7-33.9s24.8-8.9 33.9.7M144 208a32 32 0 1 1 64 0a32 32 0 1 1-64 0m192-32a32 32 0 1 1 0 64a32 32 0 1 1 0-64"/>
              </svg>
            )}
            <div 
              ref={inputRef}
              className="input-box" 
              contentEditable="true"
              onInput={handleInput}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onClick={handleInputClick}
              onFocus={handleInputClick}
              suppressContentEditableWarning={true}
            ></div>
          </div>

          {!hasText && (
            <svg 
              className="right-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 14 14"
            >
              <g fill="none" stroke="#666666" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.5 6.5a2.5 2.5 0 0 1-5 0V3a2.5 2.5 0 0 1 5 0Z"/>
                <path d="M12 7h0a4.49 4.49 0 0 1-4.5 4.5h-1A4.49 4.49 0 0 1 2 7h0m5 4.5v2"/>
              </g>
            </svg>
          )}

          {hasText && (
            <button 
              onClick={handleSend}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                width: '25px',
                height: '29px',
                marginLeft: '10px',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <svg viewBox="0 -0.5 21 21" width="29" height="29" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.61258 9L0.05132 1.31623C-0.22718 0.48074 0.63218 -0.28074 1.42809 0.09626L20.4281 9.0963C21.1906 9.4575 21.1906 10.5425 20.4281 10.9037L1.42809 19.9037C0.63218 20.2807 -0.22718 19.5193 0.05132 18.6838L2.61258 11H8.9873C9.5396 11 9.9873 10.5523 9.9873 10C9.9873 9.4477 9.5396 9 8.9873 9H2.61258z" fill="#3b82f6" fillRule="evenodd" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Make ChatView available globally
window.ChatView = ChatView;
