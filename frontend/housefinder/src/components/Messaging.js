import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useSelector } from 'react-redux';

const socket = io('http://localhost:8080');

const Messaging = ({ houseId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const currentUserId = useSelector((state) => state.user.id);
    const currentUserRole = useSelector((state) => state.user.role);

    useEffect(() => {
        socket.emit('joinHouse', { houseId });
        const fetchMessages = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}messages/conversation/${houseId}`, {
                    withCredentials: true,
                });
                setMessages(data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();

        socket.on(`receiveMessage-${houseId}`, (messageData) => {
            setMessages((prevMessages) => [...prevMessages, messageData]);
        });

        socket.on('messageNotification', (notificationData) => {
            if (notificationData.houseId === houseId) {
                alert(notificationData.message);
            }
        });

        return () => {
            socket.off(`receiveMessage-${houseId}`);
            socket.off('messageNotification');
        };
    }, [houseId]);

    const sendMessage = async () => {

        const receiverId = messages.length > 0 ? (messages[0].senderId === currentUserId ? messages[0].receiverId : messages[0].senderId) : null;
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}messages/send`, {
                houseId,
                content: newMessage,
                receiverId,
            }, {
                withCredentials: true,
            });
            socket.emit('sendMessage', {
                houseId,
                content: newMessage,
                receiverId,
            });
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="flex flex-col h-full">
            <h1 className="text-2xl font-bold mb-4">Messages</h1>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg">
                {messages.map((message) => (
                    <div key={message.id} className={`mb-2 p-2 rounded-lg ${message.senderId === currentUserId ? 'bg-blue-500 text-white self-end' : 'bg-gray-300 text-black self-start'}`}>
                        <p>
                            {message.senderId === currentUserId ? 'You' : currentUserRole === 'landlord' ? 'Renter' : 'Landlord'}
                            : {message.content}
                        </p>
                    </div>
                ))}
            </div>
            <div className="flex items-center mt-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 p-2 border rounded-lg"
                    placeholder="Type your message..."
                />
                <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Messaging;