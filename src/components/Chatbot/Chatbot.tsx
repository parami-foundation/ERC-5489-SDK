import React, { useEffect, useState } from 'react';
import styles from './Chatbot.module.scss';
import { useRef } from 'react';
import { Character, characters } from '../../models/character';
import { SoundFilled } from '@ant-design/icons';

export interface ChatbotProps {
    character: Character;
}

const END_MARK = '[end]\n';

// todo: change this
const GREETING = 'Hi, my friend, what brings you here today?';

const currentUser = {
    "id": "user_1",
    "name": "me",
}

let socket: WebSocket;

let wsEndpoint = 'ai.parami.io';

function Chatbot({ character }: ChatbotProps) {
    const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
    const [audioQueue, setAudioQueue] = useState<any[]>([]);
    const [currentAudio, setCurrentAudio] = useState<any>();
    const audioPlayer = useRef<HTMLAudioElement>(null);
    const msgList = useRef<HTMLDivElement>(null);

    const [characterMessages, setCharacterMessages] = useState<string[]>([]);
    const [userMessage, setUserMessage] = useState<string>('');

    const [newMessage, setNewMessage] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    const handleMessageStream = (msg: string) => {
        setNewMessage(prevMessage => prevMessage + msg);
        if (msgList.current) {
            msgList.current.scrollTop = msgList.current.scrollHeight;
        }
    }

    useEffect(() => {
        if (newMessage && newMessage.endsWith(END_MARK)) {
            setCharacterMessages([
                ...characterMessages,
                newMessage.slice(0, -END_MARK.length)
            ])
            setNewMessage('');
        }
    }, [newMessage]);

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
                    selectCharacter();
                    setLoading(false);
                } else if (message.startsWith(GREETING)) {
                    // mock user first message
                    socket.send('Who are you?');
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

    const selectCharacter = () => {
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
        if (currentAudio && audioEnabled) {
            playAudio(currentAudio).then(res => {
                setCurrentAudio(undefined);
            })
        }
    }, [currentAudio, audioEnabled])

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
        setUserMessage(`Me: ${text}`);
        socket.send(text);
    }

    return <>
        <div className={`${styles.chatbotContainer}`}>
            {!loading && <>
                <div className={`${styles.chatbotContent}`}>
                    <div className={`${styles.characterContainer}`}>
                        <div className={`${styles.backgroundContainer}`}>
                            <img className={`${styles.background}`} src={character.background} referrerPolicy='no-referrer'></img>
                        </div>

                        <div className={`${styles.characterMessageContainer}`} ref={msgList}>
                            <div className={`${styles.characterMessageList}`}>
                                {characterMessages.length > 0 && <>
                                    {characterMessages.map((message, index) => {
                                        return <>
                                            <div className={`${styles.message}`} key={`msg-${index}`}>
                                                {message}
                                            </div>
                                        </>
                                    })}
                                </>}

                                {!!newMessage && <>
                                    <div className={`${styles.message}`}>
                                        {newMessage}
                                    </div>
                                </>}
                            </div>
                        </div>

                        <div className={`${styles.iconContainer}`} onClick={() => {
                            setAudioEnabled(true);
                        }}>
                            <SoundFilled />
                        </div>
                    </div>

                    <div className={`${styles.userMessageContainer}`}>
                        <div className={`${styles.userMessage}`}>
                            {userMessage}
                        </div>
                    </div>

                    <div className={`${styles.messageInput}`}>
                        <input className={`${styles.textInput}`} value={inputValue}
                            onChange={(event) => {
                                setInputValue(event.target.value);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault();
                                    const msg = event.target.value;
                                    setInputValue('');
                                    handleSendMessage(msg);
                                }
                            }}
                        ></input>
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
