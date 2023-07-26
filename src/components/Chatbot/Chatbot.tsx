import React, { useEffect, useState } from 'react';
import styles from './Chatbot.module.scss';
import { useRef } from 'react';
import { Avatar, Message, MessageInput, MessageList } from '@chatscope/chat-ui-kit-react';

export interface ChatbotProps { }

const END_MARK = '[end]\n';

const currentUser = {
    "id": "user_1",
    "name": "me",
}

const elonMuskId = 'elon_musk';

const elon = {
    "id": "elon_musk",
    "name": "Elon",
    avatar: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok.jpg'
}

let socket: WebSocket;

let wsEndpoint = 'ai.parami.io';

const characters = [
    {
        name: 'Elon Musk',
        id: '6',
        avatar: 'https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok.jpg'
    },
    {
        name: 'Justin Sun',
        id: '1',
        avatar: 'https://pbs.twimg.com/profile_images/1490173066357342208/MZyfamFE.jpg'
    }
];

function Chatbot({ }: ChatbotProps) {
    const [audioQueue, setAudioQueue] = useState<any[]>([]);
    const [currentAudio, setCurrentAudio] = useState<any>();
    const audioPlayer = useRef<HTMLAudioElement>(null);
    const [selectedCharacter, setSelectedCharacter] = useState<any>();

    const [messages, setMessages] = useState<{ user: any, text: string }[]>([]);
    const [newMessage, setNewMessage] = useState<string>('');

    const handleMessageStream = (msg: string) => {
        setNewMessage(prevMessage => prevMessage + msg);
    }

    useEffect(() => {
        if (newMessage && newMessage.endsWith(END_MARK)) {
            setMessages([...messages, {
                user: selectedCharacter,
                text: newMessage.slice(0, -END_MARK.length)
            }])
            setNewMessage('');
        }
    }, [newMessage])

    const connectSocket = () => {
        // chatWindow.value = "";
        const clientId = Math.floor(Math.random() * 1010000);
        // var ws_scheme = window.location.protocol == "https:" ? "wss" : "ws";
        const ws_scheme = "wss";
        const ws_path = ws_scheme + '://' + `${wsEndpoint}` + `/ws/${clientId}`;
        socket = new WebSocket(ws_path);
        socket.binaryType = 'arraybuffer';

        socket.onopen = (event) => {
            console.log("successfully connected");
            socket.send("web"); // select web as the platform
        };

        socket.onmessage = (event) => {
            console.log('Message from server');
            if (typeof event.data === 'string') {
                const message = event.data;
                console.log('[message]', message);
                if (message.startsWith('Select')) {
                    // selectCharacter();
                } else if (message.startsWith('[+]')) {
                    // [+] indicates the transcription is done. stop playing audio
                    //   chatWindow.value += `\nYou> ${message}\n`;
                    //   stopAudioPlayback();
                } else if (message.startsWith('[=]')) {
                    //   // [=] indicates the response is done
                    //   chatWindow.value += "\n\n";
                    //   chatWindow.scrollTop = chatWindow.scrollHeight;
                } else {
                    // message response
                    handleMessageStream(message);
                }
            } else {  // binary data
                console.log('[binary data]', event.data);
                setAudioQueue([...audioQueue, event.data]);
            }
        };

        socket.onerror = (error) => {
            console.log(`WebSocket Error: `, error);
        };

        socket.onclose = (event) => {
            console.log("Socket closed");
        };
    }

    const onSelectCharacter = (character: any) => {
        setSelectedCharacter(character);
        socket.send(character.id);
    }

    useEffect(() => {
        connectSocket();
    }, [])

    useEffect(() => {
        if (audioQueue.length > 0 && !currentAudio) {
            setCurrentAudio(audioQueue[0]);
            setAudioQueue(audioQueue.slice(1));
        }
    }, [audioQueue, currentAudio]);

    useEffect(() => {
        if (currentAudio) {
            playAudio(currentAudio).then(res => {
                setCurrentAudio(undefined);
            })
        }
    }, [currentAudio])

    const playAudio = (data: any) => {
        let blob = new Blob([data], { type: 'audio/mp3' });
        let audioUrl = URL.createObjectURL(blob);
        const player = audioPlayer.current as HTMLAudioElement;
        return new Promise((resolve) => {
            player.src = audioUrl;
            player.muted = true;  // Start muted
            player.onended = resolve;
            player.play().then(() => {
                player.muted = false;  // Unmute after playback starts
            }).catch(error => alert(`Playback failed because: ${error}`));
        });
    }

    const handleSendMessage = async (text: string) => {
        setMessages(prev => [...prev, {
            user: currentUser,
            text: text
        }])
        socket.send(text);
    }

    return <>
        <div className={`${styles.chatbotContainer}`}>
            {!selectedCharacter && <>
                <div className={`${styles.characters}`}>
                    {characters.map(char => {
                        return <>
                            <div className={`${styles.characterCard}`} key={char.id} onClick={() => {
                                onSelectCharacter(char);
                            }}>
                                <img className={`${styles.avatar}`} src={char.avatar} referrerPolicy='no-referrer'></img>
                                <div className={`${styles.name}`}>{char.name}</div>
                            </div>
                        </>
                    })}
                </div>
            </>}

            {selectedCharacter && <>
                <div className={`${styles.chatbotContent}`}>
                    <div className={`${styles.messageContainer}`}>
                        <MessageList>
                            {messages.length > 0 && <>
                                {messages.map((message, index) => {
                                    const isChar = message.user?.id === selectedCharacter.id;
                                    return <>
                                        <Message
                                            model={{
                                                direction: isChar ? "incoming" : "outgoing",
                                                position: "single",
                                                message: message.text
                                            }}
                                            key={`msg-${index}`}
                                        >
                                            {isChar && <Avatar src={selectedCharacter.avatar}></Avatar>}
                                        </Message>
                                    </>
                                })}
                            </>}

                            {!!newMessage && <>
                                <Message
                                    model={{
                                        message: newMessage,
                                        direction: "incoming",
                                        position: "last"
                                    }}
                                >
                                    <Avatar src={selectedCharacter.avatar} name="Elon" />
                                </Message>
                            </>}
                        </MessageList>
                    </div>

                    <div className={`${styles.messageInput}`}>
                        <MessageInput onSend={text => {
                            handleSendMessage(text);
                        }} />
                    </div>

                    <div className={`${styles.audioContainer}`}>
                        <audio className="audio-player" ref={audioPlayer}>
                            <source src="" type="audio/mp3" />
                        </audio>
                    </div>
                </div>
            </>}
        </div>
    </>;
};

export default Chatbot;
