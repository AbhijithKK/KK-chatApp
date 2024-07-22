import Conversation from "../Conversation-box/Conversation";
import "./AllUsers.css";
import logOut from "../../assets/icons8-logout-50.png";
import logo from "../../assets/Generate A Logo Named KK .its For A Social Media .png";
import settings from "../../assets/icons8-settings-64.png";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Modal from "../Modal/Modal";
import {
  allUserApi,
  createChatApi,
  fetchChatUserApi,
  logoutApi,
  updateUserApi,
} from "../Utils/api";
import { allusers, selectData, singleUserInterface } from "../Utils/Interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Utils/Redux/Store";
import "../Utils/Common.css";
import demoimg from "../../assets/icons8-test-account-48.png";
import toast, { Toaster } from "react-hot-toast";
import { updateAuth } from "../Utils/Redux/AuthReducer";
import { updateOnline } from "../Utils/Redux/OnlineReducer";
interface AllUsersProps {
  chats: allusers[];
  refresh: Dispatch<SetStateAction<boolean>>;
  refreshV: boolean;
  chatSelector: (data: singleUserInterface, i: number) => void;
  chatIndex: number | null;
  mobileView: boolean;
}

const AllUsers: React.FC<AllUsersProps> = ({
  chats,
  refresh,
  refreshV,
  chatSelector,
  chatIndex,
  mobileView,
}) => {
  const [state, setState] = useState<[]>([]);
  const [isOpen, setIsclose] = useState<boolean>(false);
  const [logout, setLogout] = useState<boolean>(false);
  const [settingsOpen, setSettings] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [searchUsers, setSerchUsers] = useState<[]>([]);

  // modal close fnc
  const closeFnc = (f: boolean) => {
    setIsclose(f);
    setSearch("");
  };

  // input search onchange fnc
  const searchHelper = async (e: any) => {
    setIsclose(true);
    setSearch(e?.target?.value);
    const data = await allUserApi(search);
    setSerchUsers(data.data);
    refresh(!refreshV);
  };

  // search to create user
  const selectUser = async (userdata: selectData) => {
    let data = await createChatApi(userdata?.userId);
    console.log(data);

    setIsclose(false);
    refresh(!refreshV);
    setSearch("");
  };

  const [onlineIds, setOnlineIds] = useState<[]>([]);
  const { socket } = useSelector((state: RootState) => state.socketData);
  const auth = useSelector((state: RootState) => state.authData.auth);
  const { image, name, userId } = useSelector(
    (state: RootState) => state.userData
  );
  const Dispatch = useDispatch();
  const [updateName, setUpdateName] = useState<string>("");
  const [updateImage, setUpdateImage] = useState<any | null>(null);
  const [previewImage, setPriviewImage] = useState<any>(null);
  useEffect(() => {
    if (socket) {
      const handleOnlineUsers = (msg: any) => {
        setOnlineIds(msg);
        Dispatch(updateOnline({ onlineUsers: msg }));
      };
      socket.on("onlineusers", handleOnlineUsers);
      return () => {
        socket.off("onlineusers", handleOnlineUsers);
      };
    }
  }, [socket, chatIndex, auth, refreshV]);
  //  fetch all user data
  const memoizedChats = useMemo(() => chats, [chats]);
  useEffect(() => {
    const userDataFetcher = async () => {
      const data = await fetchChatUserApi(memoizedChats);
      if (!data.error) {
        const updatedData = data.data.map((val: any) => {
          let status = false;
          for (const onlineId of onlineIds) {
            if (val._id == onlineId) {
              status = true;
            }
          }
          return { ...val, status: status };
        });
        setState(updatedData);
      }
    };
    userDataFetcher();
  }, [memoizedChats, refreshV, socket, auth, mobileView, onlineIds]);
  useEffect(() => {
    setUpdateName(name);
    setUpdateImage(image);
  }, [settingsOpen]);
  const handleUpdate = async () => {
    if (updateName.trim()) {
    }
    // update user
    const data = await updateUserApi({
      userId: userId,
      name: updateName,
      image: updateImage,
    });
    if (data.data) {
      setSettings(false);

      refresh(!refreshV);
      toast("Successfully Update");
    } else {
      setSettings(false);
      toast("Can't Update try again");
    }
  };
  // image on change
  const handleImageChange = (e: any) => {
    setUpdateImage(e.target.files[0]);
    const previewUrl = URL.createObjectURL(e.target.files[0]);
    setPriviewImage(previewUrl);
  };
  const handleLogout = () => {
    setLogout(true);
  };
  const handleModalLogout = async () => {
    const data = await logoutApi();
    if (data.data) {
      Dispatch(updateAuth(!auth));
    } else {
      toast("Can't logout right now try again");
    }
  };
  return (
    <div className="allusers-container">
      <Toaster position="top-center" />
      <div className="users-headding">
        <div className="app-logo" title="Settings">
          <img
            src={
              image ? import.meta.env.VITE_BASE_URL + "/images/" + image : logo
            }
            alt="applogo"
          />
        </div>
        <div className="app-name">
          <p>{name}</p>
          <img onClick={handleLogout} src={logOut} alt="logout" />
        </div>
      </div>
      <div className="usersblock-second-section">
        <div className="search-people">
          <input
            value={search}
            type="search"
            onChange={searchHelper}
            placeholder="search here..."
          />
        </div>
        <div className="settigs">
          <img
            onClick={() => setSettings(true)}
            src={settings}
            alt="settings"
          />
        </div>
      </div>
      <div className="conversation-box">
        {chats.length == 0 ? (
          <div style={{ textAlign: "center", color: "white" }}>
            {" "}
            Search and find your friends
          </div>
        ) : (
          state.map((val, i) => (
            <Conversation
              key={i}
              chatSelector={chatSelector}
              status={true}
              data={val}
              index={i}
              chatIndex={chatIndex}
            />
          ))
        )}
      </div>
      {isOpen &&
        createPortal(
          <Modal
            headding={"All users"}
            content={searchUsers.map((val, i) => (
              <div
                key={i}
                onClick={() => selectUser(val)}
                className="modal-conversation-box"
              >
                <Conversation
                  status={false}
                  data={val}
                  chatSelector={() => {}}
                  index={i}
                  chatIndex={null}
                />{" "}
              </div>
            ))}
            closeFnc={closeFnc}
          />,
          document.body
        )}
      {settingsOpen &&
        createPortal(
          <Modal
            headding={"Settings"}
            content={
              <div>
                <input
                  className="update-input"
                  type="text"
                  value={updateName}
                  onChange={(e) => setUpdateName(e.target.value)}
                />
                <div className="update-image">
                  <img
                    src={previewImage ? previewImage : demoimg}
                    alt="demo"
                    style={{ width: "20%" }}
                  />
                  <input type="file" onChange={handleImageChange} />
                </div>

                <button
                  className="update-btn"
                  type="button"
                  onClick={handleUpdate}
                >
                  update
                </button>
              </div>
            }
            closeFnc={setSettings}
          />,
          document.body
        )}
      {logout &&
        createPortal(
          <Modal
            closeFnc={setLogout}
            headding={"Are you sure?"}
            content={
              <>
                <button onClick={handleModalLogout} className="logout-btn">
                  Logout
                </button>
              </>
            }
          />,
          document.body
        )}
    </div>
  );
};

export default AllUsers;
