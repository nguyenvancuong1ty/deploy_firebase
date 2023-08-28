import { FacebookProvider, CustomChat } from 'react-facebook';
function Message() {
    return (
        <FacebookProvider appId="1633076797217113" chatSupport>
            <CustomChat pageId="103569132776362" minimized={'false'} />
        </FacebookProvider>
    );
}

export default Message;
