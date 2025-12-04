const { useState } = React;

function App() {
  const [showChat, setShowChat] = useState(false);

  const openChat = () => {
    setShowChat(true);
  };

  const closeChat = () => {
    setShowChat(false);
  };

  return (
    <div style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f5f5f5', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'fixed', width: '100%', top: 0, left: 0 }}>
      {/* Conversation List */}
      <div className={`conversation-list ${showChat ? '-translate-x-full' : ''}`}>
        {/* Header with Search */}
        <div style={{ background: '#fff', borderBottom: '1px solid #e5e5e5' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', gap: '12px' }}>
            <button style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: '#f5f5f5', borderRadius: '20px', padding: '10px 16px', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input 
                type="text" 
                placeholder="Search" 
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', color: '#333' }}
              />
            </div>
          </div>
        </div>

        {/* Conversation Item */}
        <div 
          onClick={openChat}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '12px 16px', 
            gap: '12px', 
            cursor: 'pointer',
            position: 'relative'
          }}
        >
          <div style={{ 
            width: '52px', 
            height: '52px', 
            borderRadius: '50%', 
            background: '#fb923c', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            flexShrink: 0 
          }}>
            <span style={{ color: 'white', fontSize: '20px', fontWeight: '600' }}>DS</span>
          </div>
          <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
              <h3 style={{ fontWeight: '600', color: '#111', fontSize: '16px', margin: 0 }}>Daddy Steve</h3>
              <span style={{ color: '#999', fontSize: '13px', flexShrink: 0 }}>Oct 27</span>
            </div>
            <p style={{ color: '#666', fontSize: '14px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Daddy Steve joined Telegram
            </p>
            <div style={{ 
              position: 'absolute', 
              bottom: '-12px', 
              left: 0, 
              right: '-16px', 
              height: '1px', 
              background: '#f0f0f0' 
            }}></div>
          </div>
        </div>
      </div>

      {/* Chat Component */}
      <ChatView showChat={showChat} closeChat={closeChat} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
