import { router, usePage } from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import { PencilSquareIcon } from '@heroicons/react/24/solid';
import TextInput from '@/Components/TextInput';
import ConversationItem from '@/Components/App/ConversationItem';
import echo from '@/echo';
import { useEventBus } from '@/EventBus';
import GroupModal from '@/Components/App/GroupModal';


const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;
    const [localCoversations, setLocalCoversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState({});
    const [showGroupModal, setShowGroupModal] = useState(false);
    const { on } = useEventBus();
    const { emit } = useEventBus();

    const isUserOnline = (userId) => onlineUsers[userId];

    const onSearch = (ev) => {
        const search = ev.target.value.toLowerCase();
        setLocalCoversations(
            conversations.filter((conversation) => {
                return (
                    conversation.name.toLowerCase().includes(search)
                );
            })
        );
    };

    const messageCreated = (message) => {
        setLocalCoversations((oldUsers) => {
            return oldUsers.map((u) => {
                if (
                    message.receiver_id &&
                    !u.is_group &&
                    (u.id == message.sender_id || u.id == message.receiver_id)
                ) {
                    u.last_message = message.content;
                    u.last_message_date = message.created_at;
                    return u;
                }
                if (
                    message.group_id &&
                    u.is_group &&
                    u.id === message.group_id
                ) {
                    u.last_message = message.content;
                    u.last_message_date = message.created_at;
                    return u;
                }
                return u;
            });
        });
    };

    const messageDeleted = ({ prevMessage }) => {
        if (!prevMessage) {
            return;
        }

        messageCreated(prevMessage);
    };

    useEffect(() => {
        const offCreated = on("message.created", messageCreated);
        const offDeleted = on("message.deleted", messageDeleted);
        const offModalShow = on("GroupModal.show", (group) => {
            setShowGroupModal(true);
        });

        const offGroupDelete = on("group.deleted", ({ id, name}) => {
            setLocalCoversations((oldConversations) => {
                return oldConversations.filter((con) => con.id != id);
            });

            emit("toast.show", `Group "${name}" was deleted`);

            console.log(selectedConversation);

            if (
                !selectedConversation ||
                selectedConversation.is_group &&
                selectedConversation.id == id
            ) {
                router.visit(route("dashboard"));
            }
        });
        return () => {
            offCreated();
            offDeleted();
            offModalShow();
            offGroupDelete();
        };
    }, [on]);


    useEffect(() => {
        echo.join("online")
        setSortedConversations(
            localCoversations.sort((a, b) => {
                if(a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }
                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    );
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );
    }, [localCoversations]);

    useEffect(() => {
        setLocalCoversations(conversations);
    }, [conversations]);

    useEffect(() => {
        echo.join("online")
            .here((users) => {
                const onlineUserObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );

                setOnlineUsers((prevOnlineUsers) => {
                    return {
                        ...prevOnlineUsers,
                        ...onlineUserObj,
                    }
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            });
    })
    return (
        <>
            <div className='flex-1 w-full flex overflow-hidden'>
                <div
                    className={`transition-all md:w-[300px] w-full sm:w-[220px] bg-slate-800 flex flex-col overflow-hidden ${
                    selectedConversation ? "-ml-[100%] sm:ml-0" : ""
                    }`}
                >
                    <div className="flex items-center justify-between py-2 px-3 text-xl text-gray-200 font-medium">
                        My Chats
                        <div
                            className="tooltip tooltip-left"
                            data-tip="Add New Group"
                        >
                            <button
                                onClick={() => setShowGroupModal(true)}
                                className="text-gray-400 hover:text-gray-200">
                                <PencilSquareIcon className="w-5 h-5" />
                            </button>

                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Filter users and groups..."
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations &&
                            sortedConversations.map((conversation) => (
                                <ConversationItem
                                    key={`${
                                        conversation.is_group
                                            ? "group_"
                                            : "user_"
                                        }${conversation.id}`}
                                    conversation={conversation}
                                    online={!!isUserOnline(conversation.id)}
                                    selectedConversation={selectedConversation}
                                />
                            ))}
                    </div>
                </div>
                <div className="flex-1 flex flex-col overflow-hidden">
                    {children}
                </div>
            </div>
            <GroupModal show={showGroupModal} onClose={() => setShowGroupModal(false)}/>
        </>
    );
};

export default ChatLayout;
